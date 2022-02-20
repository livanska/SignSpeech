import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Pressable } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { COLORS } from '../constants/Colors';
import { SCREEN_SIZE } from '../constants/Layout';
import { screenState } from '../state/atoms';
import { IScreen } from '../state/types';

const Overlay = () => {
  const screen = useRecoilValue(screenState);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    screen.isOverlay
      ? Animated.timing(fadeAnim, {
          toValue: 0.5,
          useNativeDriver: true,
          duration: 400,
        }).start()
      : fadeAnim.setValue(0);
  }, [screen.isOverlay, fadeAnim]);

  return (
    <>{screen.isOverlay && <Animated.View style={[styles.darkOverlay, { opacity: fadeAnim }]} />}</>
  );
};

const styles = StyleSheet.create({
  darkOverlay: {
    backgroundColor: COLORS.black,
    position: 'absolute',
    height: SCREEN_SIZE.height,
    width: SCREEN_SIZE.width,
    zIndex: 1,
  },
});
export default Overlay;
