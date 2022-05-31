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
  isHeading?: boolean;
}
const Link = ({ linkText, preLinkText, isHeading, onPress }: ILinkProps) => {
  return (
    <View style={styles.linkContainer}>
      <TouchableHighlight underlayColor={COLORS.transparent} onPress={onPress}>
        <Text style={isHeading ? textStyles.headingLink : textStyles.link}>
          <Text
            style={isHeading ? textStyles.heading : textStyles.default}
          >{`${preLinkText} `}</Text>
          {linkText}
        </Text>
      </TouchableHighlight>
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
});
export default Link;
