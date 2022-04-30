import { View, Image, Text, StyleSheet, TextInput } from 'react-native';
import GlassPanel from '../components/GlassPanel';
import Icon from '../components/Icon';
import Menu, { IMenuItemProps } from '../components/Menu';
import { COLORS } from '../constants/Colors';
import { ICON_TITLES } from '../constants/Enums';
import { textStyles } from '../constants/TextStyle';
import { ImagePickerResult, launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import React, { ReactElement, useState } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { authorizationState, screenState, userState } from '../state/atoms';
import { IAuthorization, IScreen, IUser, userDefault, USER_PROPS } from '../state/types';
import ModalScreen from './ModalScreen';
import IconLink from '../components/IconLink';
import GradientButton from '../components/Buttons/GradientButton';

const mockUser = {
  image: 'https://i.stack.imgur.com/l60Hf.png',
  fullName: 'Lilia Ivanska',
  email: 'liliaivanska@gmail.com',
};

const Profile = () => {
  const removeUser = useResetRecoilState(userState);
  const [user, setUser] = useRecoilState(userState);
  const setScreen = useSetRecoilState(screenState);
  const setAuthorization = useSetRecoilState(authorizationState);
  const [modalVisible, setModalVisible] = useState(false);

  let inputValues = userDefault;

  const changeImage = async () => {
    let result: ImagePickerResult = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    !result.cancelled && handleUserChange(result.uri, USER_PROPS.profileImage);
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

  const saveUser = (): void => {
    setUser((prev: IUser) => ({
      ...prev,
      ...inputValues,
    }));
    //saving logic here
    setModalVisible(false);
    closeModal();
  };

  const handleInputChange = (input: string, valuePropName: string): void => {
    inputValues = {
      ...inputValues,
      [valuePropName as keyof typeof inputValues]: input,
    };
  };

  const handleLogOut = (): void => {
    setAuthorization((prev: IAuthorization) => ({
      ...prev,
      isAuthorized: false,
    }));
    removeUser();
  };

  const profileOptions: IMenuItemProps[] = [
    {
      title: 'Clean my progress',
      icon: ICON_TITLES.trash,
      onPress: () => {},
    },
    {
      title: 'Edit profile',
      icon: ICON_TITLES.edit,
      onPress: openModal,
    },
    {
      title: 'Log out',
      icon: ICON_TITLES.logOut,
      onPress: handleLogOut,
    },
  ];

  const EditModal = (): ReactElement => {
    return (
      <ModalScreen height={380} visible={modalVisible} close={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTextContainer}>
            <Text style={textStyles.heading}>Edit personal information</Text>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.modalTextContainer}>
              <Text style={textStyles.aboveInputHeader}>Full Name</Text>
            </View>
            <TextInput
              style={textStyles.input}
              keyboardAppearance={'light'}
              textContentType={'name'}
              returnKeyType={'done'}
              placeholderTextColor={COLORS.lightText}
              placeholder="Full Name"
              onChangeText={(input) => handleInputChange(input, USER_PROPS.fullName)}
              defaultValue={user.fullName}
            ></TextInput>
            <View style={styles.separator} />
            <View style={styles.modalTextContainer}>
              <Text style={textStyles.aboveInputHeader}>Password</Text>
            </View>
            <TextInput
              style={textStyles.input}
              keyboardAppearance={'light'}
              textContentType={'password'}
              returnKeyType={'done'}
              placeholderTextColor={COLORS.lightText}
              secureTextEntry={true}
              placeholder="Password"
              defaultValue={user.password}
              onChangeText={(input: string) => handleInputChange(input, USER_PROPS.password)}
            ></TextInput>
          </View>
          <View style={styles.buttonsRow}>
            <IconLink
              linkText="Back"
              onPress={closeModal}
              icon={ICON_TITLES.chevronLeft}
              gapSize={2}
              iconSize={28}
            />
            <GradientButton title="Save" onPress={saveUser} />
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
});

export default Profile;
