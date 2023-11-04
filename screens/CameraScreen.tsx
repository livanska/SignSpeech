import { useNavigation } from '@react-navigation/native';
import { Camera as CameraComponent, requestCameraPermissionsAsync } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
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
import { ISign, Signs, easySigns, mediumSigns } from '../handimage';
import HandGesture from '../handsigns';
import Canvas from 'react-native-canvas';
import { useIsFocused } from '@react-navigation/core';
import { COLORS } from '../constants/Colors';
import { LEVEL, TIME_LIMIT } from '../constants/Cards';
import { IResultScreenProps } from './ResultScreen';
import Spinner from 'react-native-loading-spinner-overlay';

import useLocale from '../hooks/useLocale';
import { APP_STRINGS, IAppStrings } from '../strings';
import { textStyles } from '../constants/TextStyle';

const levelSignsArray = {
  easy: easySigns,
  medium: mediumSigns,
  hard: Signs,
};

const defaultTimerValue = 30000;

enum LEVEL_TIMERS {
  easy = 45000,
  medium = defaultTimerValue,
  hard = 10000,
}

export interface ICameraScreenProps {
  reachedFromPage: ROUTES.home | ROUTES.learning | ROUTES.translate;
  exerciseOptions?: IExerciseOptions;
}
export interface IExerciseOptions {
  timeLimit?: TIME_LIMIT;
  level?: LEVEL;
  sentence?: string;
}

const CameraMode = CameraComponent.Constants.Type as CameraType;

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

const getSignsFromSentence = (sentence: string): ISign[] | null =>
  sentence
    ?.split('')
    .filter((letter: string) => letter && letter.match(/^[A-Za-z]+$/))
    .map((letter: string) => Signs.find((sign: ISign) => sign.letter === letter.toUpperCase()));

const TensorCamera = cameraWithTensors(CameraComponent);

const Camera = ({ route }) => {
  const { reachedFromPage, exerciseOptions }: ICameraScreenProps = route.params.cameraScreenOptions;
  let requestAnimationFrameId = 0;
  const navigation = useNavigation();
  const [timerValue, setTimerValue] = useState<number | null>(null);
  const [levelTimerValue, setLevelTimerValue] = useState<number | null>(null);
  const [sentenceTimerValue, setSentenceTimerValue] = useState<number | null>(null);
  const [levelSigns, setLevelSigns] = useState<ISign[] | null>(
    levelSignsArray[exerciseOptions?.level || ''] ?? null
  );
  const [sentenceSigns, setSentenceSigns] = useState<ISign[] | null>(
    getSignsFromSentence(exerciseOptions?.sentence || '') ?? null
  );
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>(CameraMode.front);
  const [currentSign, setCurrentSign] = useState<ISign | null>(null);
  const [predictedSigns, setPredictedSigns] = useState<string[] | null>(null);
  const [isCorrectSign, setIsCorrectSign] = useState<boolean | null>(null);
  const [shouldOverlay, setShouldOverlay] = useState<boolean | null>(false);
  const [isBack, setIsBack] = useState<boolean>(false);
  const [signHintVisible, setSignHintVisible] = useState<boolean>(false);
  const [isLastSign, setIsLastSign] = useState<boolean>(false);
  const [result, setResult] = useState<IResultScreenProps>({
    allAmount: 0,
    allCorrectAmount: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFocusedScreen: boolean = useIsFocused();
  let cameraRef = useRef(null);
  const canvasRef = useRef(null);
  let model: handpose.HandPose;
  let GE: any;

  const { locale } = useLocale();
  const { LOADING }: IAppStrings = APP_STRINGS[locale];

  useEffect(() => {
    (async () => {
      if (isFocusedScreen) {
        setCurrentSign(null);
        setIsLoading(true);
        if (!hasPermission) {
          const { status } = await requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        }
        setIsCameraActive(true);
        if (
          reachedFromPage === ROUTES.home &&
          (exerciseOptions?.timeLimit || exerciseOptions?.sentence || exerciseOptions?.level)
        ) {
          setIsBack(false);
          if (exerciseOptions?.timeLimit) {
            setTimerValue(null);
            setResult({ allAmount: (exerciseOptions?.timeLimit * 2) | 0, allCorrectAmount: 0 });
          }
          if (exerciseOptions?.level) {
            setLevelTimerValue(null);
            setLevelSigns(levelSignsArray[exerciseOptions?.level]);
            setResult({
              allAmount: levelSignsArray[exerciseOptions?.level].length | 0,
              allCorrectAmount: 0,
            });
          }
          if (exerciseOptions?.sentence) {
            setIsLastSign(false);
            setSentenceTimerValue(null);
            setSentenceSigns(getSignsFromSentence(exerciseOptions?.sentence));
            setResult({
              allAmount: getSignsFromSentence(exerciseOptions?.sentence).length | 0,
              allCorrectAmount: 0,
            });
          }
        }
        await tf.ready().then(() => {
          tf.ENV.set('WEBGL_CONV_IM2COL', false);
          canvasRef.current.width = SCREEN_SIZE.width;
          canvasRef.current.height = SCREEN_SIZE.height;
        });
        getNextRandomSign();
      } else {
        cameraRef.current = null;
        exerciseOptions?.timeLimit && setTimerValue(0);
        exerciseOptions?.level && setLevelTimerValue(0);
        exerciseOptions?.sentence && setSentenceTimerValue(0);
        setIsCorrectSign(null);
        setCurrentSign(null);
        setIsCameraActive(false);
        setSignHintVisible(false);
        exerciseOptions?.sentence && setSentenceSigns(null);
      }
    })();
  }, [isFocusedScreen]);

  const getNextRandomSign = () => {
    if (exerciseOptions?.level) setRandomSignForLevel();
    else if (exerciseOptions?.sentence) setSignOfSentence();
    else setRandomSign();
  };

  useEffect(() => {
    setHasPermission(isCameraActive);
  }, [isCameraActive]);

  const prepareTF = async (): Promise<boolean> => {
    try {
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
    } catch (error) {
      console.log('[ON LOAD MODEL][ERROR]:', error);
      return false;
    }
    return true;
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
          getNextRandomSign();
          setIsCorrectSign(null);
          setShouldOverlay(false);
          exerciseOptions?.level && setLevelTimerValue(LEVEL_TIMERS[exerciseOptions?.level]);
          exerciseOptions?.sentence && setSentenceTimerValue(defaultTimerValue);
        }, 2500);
      } else {
        !exerciseOptions?.level &&
          !exerciseOptions?.timeLimit &&
          !exerciseOptions?.sentence &&
          currentSign?.letter &&
          setIsCorrectSign(false);
      }
    }
  }, [predictedSigns, currentSign]);

  useEffect(() => {
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

  useEffect(() => {
    if (result.allAmount > 0 && (!levelSigns || levelSigns.length === 0) && !isBack) {
      navigation.navigate(ROUTES.result, result);
      setLevelTimerValue(null);
      setLevelSigns(null);
      return;
    }
    if (levelTimerValue > 0 && isCorrectSign && levelSigns && !isBack) setLevelTimerValue(0);

    if (levelTimerValue === 0 && !isCorrectSign && levelSigns && !isBack) {
      setIsCorrectSign(false);
      if (exerciseOptions?.level) {
        setShouldOverlay(true);
        setTimeout(() => {
          setRandomSignForLevel();
          setIsCorrectSign(null);
          setShouldOverlay(false);
          setLevelTimerValue(LEVEL_TIMERS[exerciseOptions?.level]);
        }, 2500);
      }
    }
    const timer = setInterval(() => {
      levelTimerValue > 0 && setLevelTimerValue(levelTimerValue - 1000);
    }, 1000);
    if (!levelTimerValue) {
      return;
    }

    return () => clearTimeout(timer);
  }, [levelTimerValue]);

  useEffect(() => {
    if (
      result.allAmount > 0 &&
      (!sentenceSigns || sentenceSigns.length === 0) &&
      isLastSign &&
      !isBack
    ) {
      navigation.navigate(ROUTES.result, result);
      setSentenceTimerValue(null);
      setSentenceSigns(null);
      setIsCorrectSign(null);
      return;
    }
    if (sentenceTimerValue > 0 && isCorrectSign && sentenceSigns && !isBack) {
      setSentenceTimerValue(0);
    }
    if (sentenceTimerValue === 0 && !isCorrectSign && sentenceSigns && !isBack) {
      setIsCorrectSign(false);
      if (exerciseOptions?.sentence) {
        setShouldOverlay(true);
        setTimeout(() => {
          getNextRandomSign();
          setIsCorrectSign(null);
          setShouldOverlay(false);
          setSentenceTimerValue(defaultTimerValue);
        }, 2500);
      }
    }
    const timer = setInterval(() => {
      sentenceTimerValue > 0 && setSentenceTimerValue(sentenceTimerValue - 1000);
    }, 1000);
    if (!sentenceTimerValue) {
      return;
    }

    return () => clearTimeout(timer);
  }, [sentenceTimerValue]);

  const setRandomSign = () => setCurrentSign(Signs[Math.floor(Math.random() * Signs.length)]);

  const setRandomSignForLevel = () => {
    let sign = levelSigns[Math.floor(Math.random() * (levelSigns?.length || 0))];
    setLevelSigns(levelSigns?.filter((s: ISign) => s !== sign) || null);
    setCurrentSign(sign);
  };

  const setSignOfSentence = () => {
    let [first, ...newSigns] = sentenceSigns;
    setSentenceSigns(newSigns);
    setIsLastSign(newSigns.length === 0 && !first);
    setCurrentSign(first || null);
  };

  const detect = async (nextImageTensor: tf.Tensor3D, model: handpose.HandPose) => {
    const shouldContinue = hasPermission || isCameraActive || Boolean(nextImageTensor.size);

    if (!shouldContinue) return;

    const video = nextImageTensor;

    canvasRef.current.width = SCREEN_SIZE.width;
    canvasRef.current.height = SCREEN_SIZE.height;

    model.estimateHands(video).then((hand: handpose.AnnotatedPrediction[]) => {
      if (hand[0]) {
        try {
          const estimatedGestures = GE.estimate(hand[0].landmarks, 7);
          const canvas = canvasRef.current.getContext('2d');
          draw(hand, canvas);
          if (estimatedGestures.gestures !== undefined && estimatedGestures.gestures.length > 0) {
            setPredictedSigns(estimatedGestures.gestures.map((gesture) => gesture.name));
          }
          tf.dispose([video]);
        } catch (error) {
          console.log('[ON ESTIMATE GESTURES][ERROR]:', error);
          return;
        }
      }
    });
  };

  const draw = (predictions: handpose.AnnotatedPrediction[], canvas: any) => {
    if (predictions.length > 0 && !isCorrectSign) {
      predictions.forEach((prediction) => {
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

  const handleCameraStream = async (images: IterableIterator<tf.Tensor3D>) => {
    await prepareTF();
    setIsLoading(() => false);
    exerciseOptions?.timeLimit && setTimerValue(exerciseOptions?.timeLimit * 60);
    exerciseOptions?.level && setLevelTimerValue(LEVEL_TIMERS[exerciseOptions?.level]);
    exerciseOptions?.sentence && setSentenceTimerValue(defaultTimerValue);
    (exerciseOptions?.sentence || exerciseOptions?.level) && !currentSign && getNextRandomSign();

    const loop = async () => {
      if (model) {
        const nextImageTensor = images.next().value as tf.Tensor3D;
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
      {signHintVisible && (
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 10,
            flex: 0,
          }}
        >
          <SignImage height={600} width={300} />
        </View>
      )}
      {isLoading && (
        <Spinner
          animation="fade"
          visible={true}
          textContent={LOADING.title}
          size={'large'}
          textStyle={{
            fontSize: 24,
            includeFontPadding: false,
            fontFamily: FONT_TYPES.light,
            color: COLORS.white,
          }}
          color={COLORS.white}
          overlayColor={'rgba(0, 0, 0, 0.5)'}
        />
      )}
      {reachedFromPage !== ROUTES.translate && (
        <View
          style={[
            styles.blinkOverlay,
            {
              backgroundColor: isCorrectSign ? COLORS.success : COLORS.fail,
              opacity: +shouldOverlay - 0.8,
            },
          ]}
        />
      )}
      <View style={styles.overlayInfoContainer}>
        <View style={styles.topRowContainer}>
          <BackButton
            onPress={() => {
              setIsBack(true);
              navigation.navigate(ROUTES.root, { screen: ROUTES.home });
            }}
          />
          {exerciseOptions?.timeLimit && timerValue !== null && (
            <GlassPanel height={40} width={100} style={{}}>
              {currentSign && <Text style={textStyles.heading}>{toTimeString(timerValue)}</Text>}
            </GlassPanel>
          )}
          {exerciseOptions?.level && (
            <View
              style={{
                flexDirection: 'column',
              }}
            >
              <GlassPanel height={80} width={100} style={{}}>
                <Text style={[textStyles.heading, { textAlign: 'center' }]}>
                  {exerciseOptions?.level.toUpperCase()}
                  {'\n'}
                  {currentSign && (
                    <Text style={textStyles.heading}>{`00:${
                      +levelTimerValue / 1000 > 9 ? '' : '0'
                    }${levelTimerValue / 1000}`}</Text>
                  )}
                </Text>
              </GlassPanel>
            </View>
          )}
          {exerciseOptions?.sentence && (
            <View
              style={{
                flexDirection: 'column',
              }}
            >
              <GlassPanel height={80} width={150} style={{}}>
                <Text style={[textStyles.heading, { textAlign: 'center' }]}>
                  {!isLoading && exerciseOptions.sentence}
                  {'\n'}
                  <Text style={textStyles.heading}>{`00:${
                    +sentenceTimerValue / 1000 > 9 ? '' : '0'
                  }${sentenceTimerValue / 1000}`}</Text>
                </Text>
              </GlassPanel>
            </View>
          )}
          <View style={styles.signContainer}>
            <GlassPanel
              height={160}
              width={135}
              style={{}}
              onPressIn={() => reachedFromPage === ROUTES.learning && setSignHintVisible(true)}
              onPressOut={() => reachedFromPage === ROUTES.learning && setSignHintVisible(false)}
            >
              <View style={styles.glassPanelContent}>
                <Text style={[textStyles.default, { fontSize: 52, textAlign: 'center' }]}>
                  {reachedFromPage === ROUTES.translate
                    ? predictedSigns && predictedSigns[0]
                    : !isLoading && currentSign?.letter}
                </Text>
                {reachedFromPage === ROUTES.learning && (
                  <Text style={[textStyles.default, { textAlign: 'center' }]}>
                    Press to see hint
                  </Text>
                )}
              </View>
            </GlassPanel>
            {reachedFromPage !== ROUTES.translate && predictedSigns && isCorrectSign !== null && (
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
