import { useNavigation } from '@react-navigation/native';
import { Camera as CameraComponent, requestCameraPermissionsAsync, Constants } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
import { Signimage, Signpass } from '../handimage';
import Handsigns from '../handsigns';
import Canvas from 'react-native-canvas';
import { useIsFocused, useFocusEffect } from '@react-navigation/core';
let frame = 0;
const computeRecognitionEveryNFrames = 10;
export interface ICameraScreenProps {
  reachedFromPage: ROUTES.home | ROUTES.learning | ROUTES.translate;
  timeLimit?: number;
}

const TensorCamera = cameraWithTensors(CameraComponent);

const Camera = ({ reachedFromPage }: ICameraScreenProps) => {
  const navigation = useNavigation();
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>(Constants.Type.back);
  const [isCorrectSign, setIsCorrectSign] = useState<boolean | null>(null);
  const a = useIsFocused();
  let cameraRef = useRef(null);
  const canvasRef = useRef(null);
  let signList: any = [];
  let net: any;
  console.log('FOCUSED ', useIsFocused());
  const fingerJoints = {
    thumb: [0, 1, 2, 3, 4],
    index: [0, 5, 6, 7, 8],
    mid: [0, 9, 10, 11, 12],
    ring: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
  };

  useEffect(() => {
    (async () => {
      //cameraRef = null;
      if (a) {
        const { status } = await requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        setIsCameraActive(true);
        await tf.ready();

        // console.log(status);
        net = await handpose.load();
        _signList();
        canvasRef.current.width = SCREEN_SIZE.width;
        canvasRef.current.height = SCREEN_SIZE.height;
      } else {
        cameraRef = null;
        setIsCameraActive(false);
        // setHasPermission(false);
      }
      // setIsCameraActive(true);
    })();
  }, [a]);
  ////////////////////////////////
  useEffect(() => {
    setHasPermission(isCameraActive);
  }, [isCameraActive]);
  function _signList() {
    signList = generateSigns();
  }

  async function detect(nextImageTensor: any, net: any) {
    if (!hasPermission) return;
    const video = nextImageTensor;

    canvasRef.current.width = SCREEN_SIZE.width;
    canvasRef.current.height = SCREEN_SIZE.height;

    try {
      const hand = await net.estimateHands(video);

      if (hand.length > 0) {
        //loading the fingerpose model
        const GE = new fp.GestureEstimator([
          fp.Gestures.ThumbsUpGesture,
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

        const estimatedGestures = await GE.estimate(hand[0].landmarks, 6.5);

        if (estimatedGestures.gestures !== undefined && estimatedGestures.gestures.length > 0) {
          const confidence = estimatedGestures.gestures.map((p: any) => p.confidence);
          const maxConfidence = confidence.indexOf(Math.max.apply(undefined, confidence));
        }
        const ctx = canvasRef.current.getContext('2d');
        drawHand(hand, ctx);
      }
    } catch (e) {
      console.log(e);
      return;
      // console.log(e);
    }
  }

  const drawHand = (prediction: any, ctx: any) => {
    if (prediction.length > 0) {
      //loop to the preditions
      prediction.forEach((prediction) => {
        //grab landmarks
        const landmarks = prediction.landmarks;

        //loop the finger joints
        for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
          let finger = Object.keys(fingerJoints)[j];
          for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
            const firstJointIndex = fingerJoints[finger][k];
            const secondJointIndex = fingerJoints[finger][k + 1];

            //draw joints
            ctx.beginPath();
            ctx.moveTo(landmarks[firstJointIndex][0], landmarks[firstJointIndex][1]);
            ctx.lineTo(landmarks[secondJointIndex][0], landmarks[secondJointIndex][1]);
            ctx.strokeStyle = 'gold';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }

        //loop to landmarks and draw them
        for (let i = 0; i < landmarks.length; i++) {
          //get x point
          const x = landmarks[i][0];

          //get y point
          const y = landmarks[i][1];

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

  function shuffle(a: any) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function generateSigns() {
    const password = shuffle(Signpass);
    return password;
  }

  const handleCameraStream = async (images: any, updatePreview: any, gl: any) => {
    net = await handpose.load();
    const loop = async () => {
      if (net) {
        if (frame % computeRecognitionEveryNFrames === 0) {
          const nextImageTensor = images.next().value;
          if (nextImageTensor) {
            detect(nextImageTensor, net);
          }
        }
        frame += 1;
        frame = frame % computeRecognitionEveryNFrames;
      }
      requestAnimationFrame(loop);
    };
    isCameraActive && loop();
  };
  ///////////////////////////////////////////////

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const handleCameraTypeChange = (): void =>
    setCameraType(cameraType === Constants.Type.back ? Constants.Type.front : Constants.Type.back);

  return (
    <View style={styles.pageWrapper}>
      <TensorCamera
        resizeHeight={320}
        resizeWidth={320}
        resizeDepth={3}
        ref={cameraRef}
        style={styles.cameraComponentContainer}
        onReady={handleCameraStream}
        autorender={true}
        type={cameraType}
        useCustomShadersToResize={false}
        cameraTextureWidth={1080}
        cameraTextureHeight={1920}
      />
      <Canvas ref={canvasRef} style={styles.canvasComponent} />
      <View style={styles.overlayInfoContainer}>
        <View style={styles.topRowContainer}>
          <BackButton
            onPress={() => {
              // setIsCameraActive(false);
              navigation.navigate(ROUTES.root, { screen: ROUTES.home });
            }}
          />
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
