import { ImageInfo } from 'expo-image-picker';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
  updateProfile,
  updateEmail,
} from 'firebase/auth';
import { get, ref as databaseRef } from 'firebase/database';
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
  deleteObject,
  StorageReference,
  list,
} from 'firebase/storage';
import { database, FIREBASE_REF, storage } from '../config/firebase';
import { IUserRegisterInput } from '../screens/AutorizationScreen';
import { IUser, USER_PROPS } from '../state/types';

const DEFAULT_USER_IMAGE_URL = 'https://i.stack.imgur.com/l60Hf.png';
export interface IUserResponse {
  email: string;
  fullName: string;
  imageUrl: string;
  photoURL: string;
  displayName?: string;
  uId: string;
}

export const authorizeUser = async (
  isLogin: boolean,
  userInput: IUserRegisterInput
): Promise<Partial<IUser> | void> => {
  const authorize = isLogin ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
  const auth = getAuth();
  const { email, password, fullName } = userInput;
  try {
    const { user }: UserCredential = await authorize(auth, email, password);
    if (user) {
      let userImageUrl = DEFAULT_USER_IMAGE_URL;
      if (!isLogin) {
        await updateUser(USER_PROPS.fullName, fullName);
      }
      const { email, displayName, photoURL } = auth.currentUser;
      if (photoURL) userImageUrl = await getUserPhoto(photoURL);
      return {
        profileImage: userImageUrl,
        fullName: displayName,
        email: email,
      };
    } else return;
  } catch (error) {
    return;
  }
};

export const updateUser = async (propsType: USER_PROPS, newValue: string): Promise<void> => {
  const auth = getAuth();
  try {
    switch (propsType) {
      case USER_PROPS.fullName:
        await updateProfile(auth.currentUser, {
          displayName: newValue,
        });
        return;
      case USER_PROPS.profileImage:
        await updateProfile(auth.currentUser, {
          photoURL: newValue,
        });
        return;
      case USER_PROPS.email:
        await updateEmail(auth.currentUser, newValue);
        return;
      default:
        return;
    }
  } catch (error) {
    return;
  }
};

const getUserData = async (userId: string): Promise<IUserResponse> =>
  await (await get(databaseRef(database, `${FIREBASE_REF.user}${userId}`))).val();

const getUserPhoto = async (imageUrl: string): Promise<string> =>
  (imageUrl && (await getDownloadURL(storageRef(storage, `${FIREBASE_REF.user}${imageUrl}`)))) ||
  '';

export const logOutUser = async (): Promise<void> => {
  const auth = getAuth();
  try {
    auth.signOut();
  } catch (error) {
    return;
  }
};

export const uploadUserPhoto = async (image: ImageInfo) => {
  const auth = getAuth();
  const userUId = auth.currentUser.uid;
  try {
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const allFiles = await list(storageRef(storage, `${FIREBASE_REF.user}`));
    if (allFiles.items.filter(({ name }: StorageReference) => name === userUId).length)
      deleteObject(storageRef(storage, `${FIREBASE_REF.user}${userUId}`));

    await uploadBytes(storageRef(storage, `${FIREBASE_REF.user}${userUId}`), blob);
    await updateUser(USER_PROPS.profileImage, userUId);
  } catch (error) {
    return;
  }
};
