import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS } from '../../constants/Colors';
import { textStyles } from '../../constants/TextStyle';

export interface IGradientButtonProps {
  title: string;
  onPress(): void;
  width?: number;
  height?: number;
  disabled?: boolean;
}
const GradientButton = ({ title, onPress, disabled, ...sizes }: IGradientButtonProps) => {
  return (
    <View style={!disabled && styles.shadowContainer}>
      <LinearGradient
        colors={disabled ? GRADIENTS.DISABLED : GRADIENTS.PRIMARY}
        style={{ ...styles.buttonContainer, ...sizes }}
      >
        <TouchableHighlight
          disabled={disabled}
          style={{ ...styles.buttonContainer, ...sizes }}
          activeOpacity={1}
          underlayColor={COLORS.primaryMedium}
          onPress={onPress}
        >
          <Text style={textStyles.button}>{title}</Text>
        </TouchableHighlight>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 140,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowContainer: {
    shadowColor: COLORS.primaryLight,
    shadowOpacity: 0.5,
    backgroundColor: COLORS.transparent,
    shadowRadius: 6,
    shadowOffset: { height: 0, width: 0 },
  },
});
export default GradientButton;
