import { View, Image, Text, StyleSheet, TextInput } from 'react-native';
import GlassPanel from '../components/GlassPanel';
import Icon from '../components/Icon';
import Menu, { IMenuItemProps } from '../components/Menu';
import { COLORS } from '../constants/Colors';
import { ICON_TITLES } from '../constants/Enums';
import { textStyles } from '../constants/TextStyle';
import {
  ImageInfo,
  ImagePickerResult,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from 'expo-image-picker';
import React, { ReactElement, useState } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { authorizationState, screenState, userState } from '../state/atoms';
import { IAuthorization, IScreen, IUser, USER_PROPS } from '../state/types';
import ModalScreen from './ModalScreen';
import IconLink from '../components/IconLink';
import GradientButton from '../components/Buttons/GradientButton';
import { logOutUser, updateUser, uploadUserPhoto } from '../firebase/user';
import { SCREEN_SIZE } from '../constants/Layout';

import { APP_STRINGS, IAppStrings } from '../strings';
import useLocale from '../hooks/useLocale';

const Profile = () => {
  const removeUser = useResetRecoilState(userState);
  const [user, setUser] = useRecoilState(userState);
  const setScreen = useSetRecoilState(screenState);
  const setAuthorization = useSetRecoilState(authorizationState);
  const [modalVisible, setModalVisible] = useState(false);

  const { locale } = useLocale();
  const { PROFILE }: IAppStrings = APP_STRINGS[locale];

  let inputValues: IUser;

  const changeImage = async () => {
    let result: ImagePickerResult = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result && !result.cancelled) {
      const image = result as ImageInfo;
      handleUserChange(image.uri, USER_PROPS.profileImage);
      await uploadUserPhoto(image);
    }
  };

  const handleUserChange = (input: string, valuePropName: string): void => {
    setUser((prevValues: IUser) => ({
      ...prevValues,
      [valuePropName as keyof typeof user]: input,
    }));
  };

  const openModal = (): void => {
    setScreen((prev: IScreen) => ({
      ...prev,
      isOverlay: true,
    }));
    setModalVisible(true);
  };

  const closeModal = (): void => {
    setScreen((prev: IScreen) => ({
      ...prev,
      isOverlay: false,
    }));
  };

  const saveUser = async (): Promise<void> => {
    for (let propName in inputValues) {
      if (!inputValues[propName]) delete inputValues[propName];
      else {
        if (user[propName] !== inputValues[propName])
          await updateUser(USER_PROPS[propName], inputValues[propName]);
      }
    }
    setUser((prev: IUser) => ({
      ...prev,
      ...inputValues,
    }));
    setModalVisible(false);
    closeModal();
  };

  const handleInputChange = (input: string, valuePropName: string): void => {
    inputValues = {
      ...inputValues,
      [valuePropName as keyof typeof inputValues]: input,
    };
  };

  const handleLogOut = async (): Promise<void> => {
    setAuthorization((prev: IAuthorization) => ({
      ...prev,
      isAuthorized: false,
    }));
    removeUser();
    await logOutUser();
  };

  const profileOptions: IMenuItemProps[] = [
    {
      title: PROFILE.options.edit,
      icon: ICON_TITLES.edit,
      onPress: openModal,
    },
    {
      title: PROFILE.options.logout,
      icon: ICON_TITLES.logOut,
      onPress: handleLogOut,
    },
  ];

  const EditModal = (): ReactElement => {
    return (
      <ModalScreen height={380} visible={modalVisible} close={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTextContainer}>
            <Text style={textStyles.heading}>{PROFILE.modal.title}</Text>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.modalTextContainer}>
              <Text style={textStyles.aboveInputHeader}>{PROFILE.modal.inputName}</Text>
            </View>
            <TextInput
              style={textStyles.input}
              keyboardAppearance={'light'}
              textContentType={'name'}
              returnKeyType={'done'}
              placeholderTextColor={COLORS.lightText}
              placeholder={PROFILE.modal.inputName}
              onChangeText={(input) => handleInputChange(input, USER_PROPS.fullName)}
              defaultValue={user.fullName}
            ></TextInput>
            <View style={styles.separator} />
            <View style={styles.modalTextContainer}>
              <Text style={textStyles.aboveInputHeader}>{PROFILE.modal.inputEmail}</Text>
            </View>
            <TextInput
              style={textStyles.input}
              keyboardAppearance={'light'}
              textContentType={'emailAddress'}
              returnKeyType={'done'}
              placeholderTextColor={COLORS.lightText}
              placeholder={'email@example.com'}
              defaultValue={user.email}
              onChangeText={(input: string) => handleInputChange(input, USER_PROPS.email)}
            ></TextInput>
          </View>
          <View style={styles.buttonsRow}>
            <IconLink
              linkText={PROFILE.modal.linkText}
              onPress={closeModal}
              icon={ICON_TITLES.chevronLeft}
              gapSize={2}
              iconSize={28}
            />
            <GradientButton
              title={PROFILE.modal.saveButton}
              onPress={async () => await saveUser()}
            />
          </View>
        </View>
      </ModalScreen>
    );
  };

  return (
    <View style={styles.profileContainer}>
      {modalVisible && <EditModal />}
      <View style={styles.infoContainer}>
        <View style={styles.profileImageCircle}>
          <Image style={styles.profileImage} source={{ uri: user.profileImage }} />
          <GlassPanel
            {...{ height: 25, width: 30 }}
            style={styles.changeImageIcon}
            onPress={changeImage}
          >
            <Icon size={25} name={ICON_TITLES.camera} />
          </GlassPanel>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.fullNameContainer}>
            <Text style={textStyles.heading}>{user.fullName}</Text>
          </View>
          <Text style={textStyles.subtitle}>{user.email}</Text>
        </View>
      </View>
      <Menu items={profileOptions} />
      <View style={styles.versionContainer}>
        <Text style={[textStyles.subtitle, { textAlign: 'center' }]}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    paddingTop: 90,
  },
  infoContainer: {
    padding: 40,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 15,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  fullNameContainer: {
    paddingBottom: 2,
  },
  profileImage: {
    height: 95,
    width: 95,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  profileImageCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 104,
    width: 104,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primaryMedium,
  },
  changeImageIcon: {
    position: 'absolute',
    bottom: -10,
    right: 0,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.lightBlue,
    marginVertical: 15,
    marginHorizontal: 20,
  },
  modalContainer: {
    marginVertical: 50,
    marginHorizontal: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTextContainer: {
    display: 'flex',
    width: '100%',
    marginHorizontal: 45,
  },
  inputsContainer: {
    marginTop: 20,
  },
  buttonsRow: {
    width: '100%',
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
  },
  versionContainer: {
    position: 'absolute',
    top: SCREEN_SIZE.height - 100,
    display: 'flex',
    justifyContent: 'center',
    width: SCREEN_SIZE.width,
  },
});

export default Profile;
