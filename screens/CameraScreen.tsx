import { Camera as CameraComponent, requestCameraPermissionsAsync, Constants } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import BackButton from '../components/BackButton';
import GlassPanel from '../components/GlassPanel';
import GradientButton from '../components/GradientButton';
import Icon from '../components/Icon';
import StatusCircle from '../components/StatusCircle';
import { COLORS } from '../constants/Colors';
import { ICON_TITLES } from '../constants/Enums';
import { SCREEN_SIZE } from '../constants/Layout';
import { ROUTES } from '../navigation/routes';
import { RootTabScreenProps } from '../navigation/types';

export interface ICameraScreenProps extends RootTabScreenProps<`${ROUTES.learning}`> {
  reachedFromPage: ROUTES.home | ROUTES.learning | ROUTES.translate;
  timeLimit?: number;
}

const Camera = ({ navigation, reachedFromPage }: ICameraScreenProps) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>(Constants.Type.back);
  const [isCorrectSign, setIsCorrectSign] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    navigation.replace(ROUTES.root);
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const handleCameraTypeChange = (): void =>
    setCameraType(cameraType === Constants.Type.back ? Constants.Type.front : Constants.Type.back);

  return (
    <View>
      <CameraComponent style={styles.cameraComponentContainer} type={cameraType}>
        <View style={styles.topRowContainer}>
          <BackButton onPress={() => navigation.replace(ROUTES.root)} />
          <View style={styles.signContainer}>
            <GlassPanel
              height={160}
              width={135}
              style={{}}
              onPress={handleCameraTypeChange}
            ></GlassPanel>
            {isCorrectSign !== null && (
              <StatusCircle style={styles.statusCircle} isSuccess={isCorrectSign} />
            )}
          </View>
        </View>
        <GlassPanel
          height={48}
          width={62}
          style={styles.changeCameraIcon}
          onPress={handleCameraTypeChange}
        >
          <Icon size={39} name={ICON_TITLES.changeCamera} />
        </GlassPanel>
      </CameraComponent>
    </View>
  );
};
const styles = StyleSheet.create({
  cameraComponentContainer: {
    paddingTop: 90,
    height: SCREEN_SIZE.height,
    width: SCREEN_SIZE.width,
  },
  topRowContainer: {
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  changeCameraIcon: {
    position: 'absolute',
    bottom: 25,
    right: 20,
  },
  statusCircle: {
    top: -25,
  },
});
export default Camera;
