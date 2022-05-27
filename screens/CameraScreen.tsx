import { useNavigation } from '@react-navigation/native';
import { Camera as CameraComponent, requestCameraPermissionsAsync, Constants } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import BackButton from '../components/Buttons/BackButton';
import GlassPanel from '../components/GlassPanel';
import Icon from '../components/Icon';
import StatusCircle from '../components/StatusCircle';
import { ICON_TITLES } from '../constants/Enums';
import { SCREEN_SIZE } from '../constants/Layout';
import { ROUTES } from '../navigation/routes';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import * as fp from 'fingerpose';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { ISign, Signs } from '../handimage';
import Handsigns from '../handsigns';
import Canvas from 'react-native-canvas';
import { useIsFocused, useNavigationState } from '@react-navigation/core';
import { COLORS } from '../constants/Colors';
import { CARD_TYPE, LEVEL, TIME_LIMIT } from '../constants/Cards';
import { IResultScreenProps } from './ResultScreen';
import SvgUri from 'react-native-svg-uri';
import N_hand from './../handimage/Nhand.svg';
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

  const fingerJoints = {
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
      Handsigns.aSign,
      Handsigns.bSign,
      Handsigns.cSign,
      Handsigns.dSign,
      Handsigns.eSign,
      Handsigns.fSign,
      Handsigns.gSign,
      Handsigns.hSign,
      Handsigns.iSign,
      Handsigns.jSign,
      Handsigns.kSign,
      Handsigns.lSign,
      Handsigns.mSign,
      Handsigns.nSign,
      Handsigns.oSign,
      Handsigns.pSign,
      Handsigns.qSign,
      Handsigns.rSign,
      Handsigns.sSign,
      Handsigns.tSign,
      Handsigns.uSign,
      Handsigns.vSign,
      Handsigns.wSign,
      Handsigns.xSign,
      Handsigns.ySign,
      Handsigns.zSign,
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
          const ctx = canvasRef.current.getContext('2d');
          drawHand(hand, ctx);
          if (estimatedGestures.gestures !== undefined && estimatedGestures.gestures.length > 0) {
            setPredictedSigns(estimatedGestures.gestures.map((el) => el.name));
          }
          tf.dispose(video);
        } catch (e) {
          console.log('ERRRROR', e);
          return;
        }
      }
    });
  };

  const drawHand = (prediction: any, ctx: any) => {
    if (prediction.length > 0 && !isCorrectSign) {
      //loop to the preditions
      prediction.forEach((prediction) => {
        //grab landmarks
        const landmarks = prediction.landmarks;
        let widthCoef = 3.4;
        let heightCoef = 4.6;
        //loop the finger joints
        for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
          let finger = Object.keys(fingerJoints)[j];
          for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
            const firstJointIndex = fingerJoints[finger][k];
            const secondJointIndex = fingerJoints[finger][k + 1];

            //draw joints

            ctx.beginPath();
            ctx.moveTo(
              landmarks[firstJointIndex][0] * widthCoef,
              landmarks[firstJointIndex][1] * heightCoef
            );
            ctx.lineTo(
              landmarks[secondJointIndex][0] * widthCoef,
              landmarks[secondJointIndex][1] * heightCoef
            );
            ctx.strokeStyle = 'gold';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }

        //loop to landmarks and draw them
        for (let i = 0; i < landmarks.length; i++) {
          //get x point
          const x = landmarks[i][0] * widthCoef;

          //get y point
          const y = landmarks[i][1] * heightCoef;

          //start drawing
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 3 * Math.PI);

          //set line color
          ctx.fillStyle = 'navy';
          ctx.fill();
        }
      });
    }
  };

  const handleCameraStream = async (images: any) => {
    await prepareTF();
    // Add loading state
    setTimerValue(exerciseOptions?.timeLimit * 2);
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
            <GlassPanel height={160} width={135} style={{}}>
              <Text>{toTimeString(timerValue)}</Text>
            </GlassPanel>
          )}
          <View style={styles.signContainer}>
            <GlassPanel height={160} width={135} style={{}} onPress={handleCameraTypeChange}>
              <View style={styles.glassPanelContent}>
                {/* Should be */}
                {/* {reachedFromPage === ROUTES.learning && currentSign?.signImage && <SignImage />} */}
                {/* Testing only */}
                {currentSign?.signImage && <SignImage />}
                <Text>{currentSign?.letter}</Text>
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
