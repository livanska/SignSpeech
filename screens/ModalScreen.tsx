import { ReactElement, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  KeyboardAvoidingView,
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

const ModalScreen = ({ visible, children, height = 400, close }: IModalProps) => {
  const [screen, setScreen] = useRecoilState(screenState);
  const closeAnim = useRef(new Animated.Value(-height)).current;

  useEffect(() => {
    Number.parseInt(JSON.stringify(closeAnim)) === 0 &&
      !screen.isOverlay &&
      setTimeout(() => close(), 500);
    !screen.isOverlay
      ? Animated.timing(closeAnim, {
          toValue: -height,
          useNativeDriver: false,
          duration: 400,
        }).start()
      : closeAnim.setValue(0);
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
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        keyboardVerticalOffset={0}
        behavior={'position'}
      >
        <Animated.View style={[styles.modalView, { height: height, bottom: closeAnim }]}>
          {children}
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    position: 'absolute',
    bottom: 0,
  },
  backgroundFillContainer: {
    zIndex: 0,
  },
  backgroundFill: {
    position: 'absolute',
    height: SCREEN_SIZE.height,
    zIndex: 0,
    width: SCREEN_SIZE.width,
    backgroundColor: COLORS.transparent,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_SIZE.width,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,
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
});

export default ModalScreen;
