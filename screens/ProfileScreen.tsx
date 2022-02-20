import { View, Image, Text, StyleSheet } from 'react-native';
import GlassPanel from '../components/GlassPanel';
import Icon from '../components/Icon';
import Menu from '../components/Menu';
import { COLORS } from '../constants/Colors';
import { ICON_TITLES } from '../constants/Enums';
import { textStyles } from '../constants/TextStyle';
import { ImagePickerResult, launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import React, { useState } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { screenState, userState } from '../state/atoms';
import { IScreen, IUser, userDefault } from '../state/types';
import ModalScreen from './ModalScreen';

// const mockUser = {
//   image: 'https://i.stack.imgur.com/l60Hf.png',
//   fullName: 'Danna Paola',
//   email: 'dannapaola@gmail.com',
// };

const Profile = () => {
  const removeUser = useResetRecoilState(userState);
  const [user, setUser] = useRecoilState(userState);
  const setScreen = useSetRecoilState(screenState);
  const [modalVisible, setModalVisible] = useState(false);
  const changeImage = async () => {
    let result: ImagePickerResult = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    !result.cancelled &&
      setUser((prev: IUser) => ({
        ...prev,
        profileImage: !result.cancelled ? result.uri : userDefault.profileImage,
      }));
  };

  const openModal = (): void => {
    setScreen((prev: IScreen) => ({
      ...prev,
      isOverlay: true,
    }));
    setModalVisible(true);
  };

  const profileOptions = {
    items: [
      {
        title: 'Clean my progress',
        onPress: () => {},
      },
      {
        title: 'Edit profile',
        onPress: openModal,
      },
      {
        title: 'Log out',
        onPress: removeUser,
      },
    ],
  };

  return (
    <View style={styles.profileContainer}>
      {modalVisible && <ModalScreen visible={modalVisible} close={() => setModalVisible(false)} />}
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
      <Menu {...profileOptions} />
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
});

export default Profile;
