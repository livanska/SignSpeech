import { View, Image, Text, StyleSheet } from 'react-native';
import GlassPanel from '../components/GlassPanel';
import Icon from '../components/Icon';
import Menu from '../components/Menu';
import { COLORS } from '../constants/Colors';
import { ICON_TITLES } from '../constants/Enums';
import { textStyles } from '../constants/TextStyle';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { useState } from 'react';
const mockMenu = {
  items: [
    {
      title: 'Clean my progress',
      onPress: () => {},
    },
    {
      title: 'Edit profile',
      onPress: () => {},
    },
    {
      title: 'Log out',
      onPress: () => {},
    },
  ],
};
const mockUser = {
  image: 'https://i.stack.imgur.com/l60Hf.png',
  fullName: 'Danna Paola',
  email: 'dannapaola@gmail.com',
};

const Profile = () => {
  const [image, setImage] = useState(mockUser.image);
  const changeImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View>
      <View style={styles.infoContainer}>
        <View style={styles.profileImageCircle}>
          <Image style={styles.profileImage} source={{ uri: image }} />
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
            <Text style={textStyles.heading}>{mockUser.fullName}</Text>
          </View>
          <Text style={textStyles.subtitle}>{mockUser.email}</Text>
        </View>
      </View>
      <Menu {...mockMenu} />
    </View>
  );
};

const styles = StyleSheet.create({
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
