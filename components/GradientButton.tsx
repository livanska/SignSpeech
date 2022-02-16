import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableHighlight,
  Alert,
  TextInput,
  Button,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, PRIMARY_GRADIENT } from '../constants/Colors';
import { textStyles } from '../constants/TextStyle';

export interface IGradientButtonProps {
  title: string;
  onPress(): void;
  width?: number;
  height?: number;
}
const GradientButton = ({ title, onPress, ...sizes }: IGradientButtonProps) => {
  return (
    <View style={styles.shadowContainer}>
      <LinearGradient colors={PRIMARY_GRADIENT} style={styles.buttonContainer}>
        <TouchableHighlight
          style={[styles.buttonContainer, sizes]}
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
