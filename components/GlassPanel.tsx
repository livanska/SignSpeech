import { ReactElement } from 'react';
import { View, StyleSheet, Image, TouchableHighlight, StyleSheetProperties } from 'react-native';
import { COLORS } from '../constants/Colors';

export interface IGlassPanelProps {
  width: number;
  height: number;
  children?: ReactElement;
  style?: object;
  onPress?(): void;
}

const GlassPanel = ({ children, style, onPress, ...sizes }: IGlassPanelProps) => {
  return (
    <TouchableHighlight
      style={{ ...style, ...sizes, ...{ borderRadius: 7 } }}
      activeOpacity={0.5}
      underlayColor={COLORS.primaryDark}
      onPress={onPress}
    >
      <View style={{ ...sizes }}>
        <Image style={[styles.blur, sizes]} blurRadius={40} source={{}} />
        <View style={[styles.glassPanel, sizes]}>{children}</View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  blur: {
    borderRadius: 7,
    position: 'absolute',
  },
  glassPanel: {
    backgroundColor: COLORS.white,
    opacity: 0.9,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GlassPanel;
