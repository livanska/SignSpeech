import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { get, ref as databaseRef } from 'firebase/database';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { database, FIREBASE_REF, storage } from '../config/firebase';
import { IUserInput } from '../screens/AutorizationScreen';
import { IUser } from '../state/types';

export interface IUserResponse {
  email: string;
  fullName: string;
  imageUrl: string;
  uId: string;
}

export const authorizeUser = async (
  isLogin: boolean,
  userInput: IUserInput
): Promise<Partial<IUser> | void> => {
  const authorize = isLogin ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
  const auth = getAuth();
  const { email, password } = userInput;
  try {
    const response: UserCredential = await authorize(auth, email, password);
    return await getUser(response?.user?.uid);
  } catch (error) {
    return error;
  }
};

export const getUser = async (userId: string): Promise<Partial<IUser>> => {
  const { email, fullName, imageUrl }: IUserResponse = await getUserData(userId);
  const image = await getUserPhoto(imageUrl);
  return { profileImage: image, email, fullName };
};

const getUserData = async (userId: string): Promise<IUserResponse> =>
  await (await get(databaseRef(database, `${FIREBASE_REF.user}${userId}`))).val();

const getUserPhoto = async (imageUrl: string): Promise<string> =>
  (await getDownloadURL(storageRef(storage, `${FIREBASE_REF.user}${imageUrl}`))) || '';
