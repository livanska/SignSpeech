import { StatusBar } from 'expo-status-bar';
import { Children, ReactElement, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { useRecoilState } from 'recoil';
import { COLORS } from '../constants/Colors';
import { SCREEN_SIZE } from '../constants/Layout';
import { screenState } from '../state/atoms';
import { IScreen } from '../state/types';

export interface IModalProps {
  visible: boolean;
  close(): void;
  height?: number;
  children?: ReactElement;
}

export default function ModalScreen({ visible, children, height = 400, close }: IModalProps) {
  const [screen, setScreen] = useRecoilState(screenState);
  const closeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Number.parseInt(JSON.stringify(closeAnim)) === height &&
      !screen.isOverlay &&
      setTimeout(() => close(), 190);
    !screen.isOverlay
      ? Animated.timing(closeAnim, {
          toValue: 0,
          useNativeDriver: false,
          duration: 200,
        }).start()
      : closeAnim.setValue(height);
  }, [screen.isOverlay, closeAnim]);

  const closeModal = (): void => {
    setScreen((prev: IScreen) => ({
      ...prev,
      isOverlay: false,
    }));
  };

  return (
    <Modal
      statusBarTranslucent={true}
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.backgroundFill} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.modalView, { height: closeAnim }]}>{children}</Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backgroundFill: {
    position: 'absolute',
    height: SCREEN_SIZE.height,
    width: SCREEN_SIZE.width,
    backgroundColor: COLORS.transparent,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_SIZE.width,
    backgroundColor: COLORS.white,
    borderRadius: 13,
    padding: 35,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
