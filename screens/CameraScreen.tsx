import { useNavigation } from '@react-navigation/native';
import { Camera as CameraComponent, requestCameraPermissionsAsync, Constants } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import BackButton from '../components/Buttons/BackButton';
import GlassPanel from '../components/GlassPanel';
import Icon from '../components/Icon';
import StatusCircle from '../components/StatusCircle';
import { FONT_TYPES, ICON_TITLES } from '../constants/Enums';
import { SCREEN_SIZE } from '../constants/Layout';
import { ROUTES } from '../navigation/routes';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import * as fp from 'fingerpose';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { ISign, Signs } from '../handimage';
import HandGesture from '../handsigns';
import Canvas from 'react-native-canvas';
import { useIsFocused, useNavigationState } from '@react-navigation/core';
import { COLORS } from '../constants/Colors';
import { CARD_TYPE, LEVEL, TIME_LIMIT } from '../constants/Cards';
import { IResultScreenProps } from './ResultScreen';
import SvgUri from 'react-native-svg-uri';

import { textStyles } from '../constants/TextStyle';

export interface ICameraScreenProps {
  reachedFromPage: ROUTES.home | ROUTES.learning | ROUTES.translate;
  exerciseOptions?: IExerciseOptions;
}
export interface IExerciseOptions {
  timeLimit?: TIME_LIMIT;
  level?: LEVEL;
}

enum CameraMode {
  back = 1,
  front = 2,
}

const TensorCamera = cameraWithTensors(CameraComponent);

const Camera = ({ route }) => {
  const { reachedFromPage, exerciseOptions }: ICameraScreenProps = route.params;
  let requestAnimationFrameId = 0;
  const navigation = useNavigation();
  const [timerValue, setTimerValue] = useState<number | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<CameraMode>(CameraMode.front);
  const [currentSign, setCurrentSign] = useState<ISign>(null);
  const [predictedSigns, setPredictedSigns] = useState<string[]>(null);
  const [isCorrectSign, setIsCorrectSign] = useState<boolean | null>(null);
  const [shouldOverlay, setShouldOverlay] = useState<boolean | null>(false);
  const [isBack, setIsBack] = useState<boolean>(false);
  const [result, setResult] = useState<IResultScreenProps>({
    allAmount: (exerciseOptions?.timeLimit * 2) | 0,
    allCorrectAmount: 0,
  });
  const isFocusedScreen: boolean = useIsFocused();

  let cameraRef = useRef(null);
  const canvasRef = useRef(null);
  let model: any;
  let GE: any;

  const textureDims =
    Platform.OS === 'ios' ? { width: 1080, height: 1920 } : { width: 1600, height: 1200 };
  const tensorDims = { width: 152, height: 200 };

  const joints = {
    thumb: [0, 1, 2, 3, 4],
    index: [0, 5, 6, 7, 8],
    mid: [0, 9, 10, 11, 12],
    ring: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
  };

  useEffect(() => {
    (async () => {
      if (isFocusedScreen) {
        if (!hasPermission) {
          const { status } = await requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        }
        setIsCameraActive(true);

        if (exerciseOptions?.timeLimit) {
          setTimerValue(null);
          setIsBack(false);
          setResult({ allAmount: (exerciseOptions?.timeLimit * 2) | 0, allCorrectAmount: 0 });
        }

        await tf.ready().then(() => {
          tf.ENV.set('WEBGL_CONV_IM2COL', false);
          setRandomSign();
          canvasRef.current.width = SCREEN_SIZE.width;
          canvasRef.current.height = SCREEN_SIZE.height;
        });
      } else {
        cameraRef = null;
        setTimerValue(0);
        setIsCameraActive(false);
      }
    })();
  }, [isFocusedScreen]);

  useEffect(() => {
    setHasPermission(isCameraActive);
  }, [isCameraActive]);

  const prepareTF = async (): Promise<void> => {
    model = await handpose.load({ maxContinuousChecks: 10 });
    GE = new fp.GestureEstimator([
      HandGesture.aSign,
      HandGesture.bSign,
      HandGesture.cSign,
      HandGesture.dSign,
      HandGesture.eSign,
      HandGesture.fSign,
      HandGesture.gSign,
      HandGesture.hSign,
      HandGesture.iSign,
      HandGesture.jSign,
      HandGesture.kSign,
      HandGesture.lSign,
      HandGesture.mSign,
      HandGesture.nSign,
      HandGesture.oSign,
      HandGesture.pSign,
      HandGesture.qSign,
      HandGesture.rSign,
      HandGesture.sSign,
      HandGesture.tSign,
      HandGesture.uSign,
      HandGesture.vSign,
      HandGesture.wSign,
      HandGesture.xSign,
      HandGesture.ySign,
      HandGesture.zSign,
    ]);
  };

  useEffect(() => {
    if (shouldOverlay) return;
    else {
      if (predictedSigns?.includes(currentSign?.letter)) {
        setIsCorrectSign(true);
        setResult((prev: IResultScreenProps) => ({
          allCorrectAmount: prev.allCorrectAmount++,
          ...prev,
        }));
        setShouldOverlay(true);
        setTimeout(() => {
          setRandomSign();
          setIsCorrectSign(null);
          setShouldOverlay(false);
        }, 2500);
      } else setIsCorrectSign(false);
    }
  }, [predictedSigns, currentSign]);

  useEffect(() => {
    console.log(timerValue, result);
    if (timerValue === 0 && result.allAmount > 0 && !isBack) {
      navigation.navigate(ROUTES.result, result);
      setTimerValue(null);
      return;
    }
    if (!timerValue) {
      return;
    }

    const timer = setInterval(() => {
      setTimerValue(timerValue - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timerValue]);

  const setRandomSign = () => setCurrentSign(Signs[Math.floor(Math.random() * Signs.length)]);

  const detect = async (nextImageTensor: any, model: any) => {
    if (!hasPermission || !isCameraActive || !nextImageTensor) return;

    const video = nextImageTensor;

    canvasRef.current.width = SCREEN_SIZE.width;
    canvasRef.current.height = SCREEN_SIZE.height;

    model.estimateHands(video).then((hand: { landmarks: any }[]) => {
      if (hand[0]) {
        try {
          const estimatedGestures = GE.estimate(hand[0].landmarks, 7);
          const canvas = canvasRef.current.getContext('2d');
          draw(hand, canvas);
          if (estimatedGestures.gestures !== undefined && estimatedGestures.gestures.length > 0) {
            setPredictedSigns(estimatedGestures.gestures.map((el) => el.name));
          }
          tf.dispose(video);
        } catch {
          return;
        }
      }
    });
  };

  const draw = (prediction: any, canvas: any) => {
    if (prediction.length > 0 && !isCorrectSign) {
      prediction.forEach((prediction) => {
        const markers = prediction.landmarks;
        let widthCoef = 3.4;
        let heightCoef = 4.6;
        for (let i = 0; i < Object.keys(joints).length; i++) {
          let finger = Object.keys(joints)[i];
          for (let j = 0; j < joints[finger].length - 1; j++) {
            const jointIdx1 = joints[finger][j];
            const jointIdx2 = joints[finger][j + 1];
            canvas.beginPath();
            canvas.moveTo(markers[jointIdx1][0] * widthCoef, markers[jointIdx1][1] * heightCoef);
            canvas.lineTo(markers[jointIdx2][0] * widthCoef, markers[jointIdx2][1] * heightCoef);
            canvas.lineWidth = 2;
            canvas.strokeStyle = 'white';
            canvas.stroke();
          }
        }
        markers.forEach((marker: number[]) => {
          const x = marker[0] * widthCoef;
          const y = marker[1] * heightCoef;
          canvas.beginPath();
          canvas.arc(x, y, 5, 0, 3 * Math.PI);
          canvas.fillStyle = '#DE0C96';
          canvas.fill();
        });
      });
    }
  };

  const handleCameraStream = async (images: any) => {
    await prepareTF();
    // Add loading state
    setTimerValue(exerciseOptions?.timeLimit * 60);
    const loop = async () => {
      if (model) {
        const nextImageTensor = images.next().value;
        if (nextImageTensor) await detect(nextImageTensor, model);
      }
      requestAnimationFrameId = requestAnimationFrame(() => {
        !isCorrectSign && loop();
      });
    };
    isCameraActive && model && GE && loop();
  };

  useEffect(() => {
    return () => cancelAnimationFrame(requestAnimationFrameId);
  }, [requestAnimationFrameId]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleCameraTypeChange = (): void =>
    setCameraType(cameraType === CameraMode.back ? CameraMode.front : CameraMode.back);

  const toTimeString = (seconds: number): string =>
    (seconds - (seconds %= 60)) / 60 + (9 < seconds ? ':' : ':0') + seconds;

  const SignImage = currentSign?.signImage;
  return (
    <View style={styles.pageWrapper}>
      <TensorCamera
        useCustomShadersToResize={false}
        resizeDepth={3}
        ref={cameraRef}
        style={styles.cameraComponentContainer}
        onReady={handleCameraStream}
        autorender={true}
        type={cameraType}
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeHeight={tensorDims.height}
        resizeWidth={tensorDims.width}
      />
      <Canvas ref={canvasRef} style={styles.canvasComponent} />
      <View style={[styles.blinkOverlay, { opacity: +shouldOverlay - 0.8 }]} />
      <View style={styles.overlayInfoContainer}>
        <View style={styles.topRowContainer}>
          <BackButton
            onPress={() => {
              setIsBack(true);
              navigation.navigate(ROUTES.root, { screen: ROUTES.home });
            }}
          />
          {timerValue !== null && (
            <GlassPanel height={40} width={100} style={{}}>
              <Text style={textStyles.heading}>{toTimeString(timerValue)}</Text>
            </GlassPanel>
          )}
          <View style={styles.signContainer}>
            <GlassPanel height={160} width={135} style={{}} onPress={handleCameraTypeChange}>
              <View style={styles.glassPanelContent}>
                {/* Should be */}
                {/* {reachedFromPage === ROUTES.learning && currentSign?.signImage && <SignImage />} */}
                {/* Testing only */}
                {/* {currentSign?.signImage && <SignImage />} */}
                <Text style={[textStyles.default, { fontSize: 52 }]}>{currentSign?.letter}</Text>
              </View>
            </GlassPanel>
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
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cameraComponentContainer: {
    flex: 1,
    height: SCREEN_SIZE.height,
    width: SCREEN_SIZE.width,
    aspectRatio: 9 / 16,
  },
  pageWrapper: {
    position: 'relative',
    flex: 1,
  },
  canvasComponent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  overlayInfoContainer: {
    zIndex: 10,
    flex: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  blinkOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
    backgroundColor: COLORS.success,
    flex: 0,
    // opacity: 0.2,
  },
  topRowContainer: {
    flex: 0,
    paddingTop: 105,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  signContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  glassPanelContent: {
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  changeCameraIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  statusCircle: {
    top: -25,
  },
});
export default Camera;
