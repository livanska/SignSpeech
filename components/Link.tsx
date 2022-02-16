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
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { COLORS } from '../constants/Colors';
import { textStyles } from '../constants/TextStyle';
export interface ILinkProps {
  linkText: string;
  onPress(): void;
  preLinkText?: string;
}
const Link = ({ linkText, preLinkText, onPress }: ILinkProps) => {
  return (
    <View style={styles.linkContainer}>
      {preLinkText && (
        <View style={styles.preLink}>
          <Text style={textStyles.default}>{preLinkText}</Text>
        </View>
      )}
      <TouchableWithoutFeedback style={{}} onPress={onPress}>
        <Text style={textStyles.link}>{linkText}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  preLink: {
    paddingRight: 5,
  },
});
export default Link;
