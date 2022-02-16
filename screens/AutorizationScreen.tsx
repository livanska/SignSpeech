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
import { COLORS } from '../constants/Colors';
import { FONT_TYPES } from '../constants/Enums';
import { textStyles } from '../constants/TextStyle';
import GradientButton from '../components/GradientButton';
import Link from '../components/Link';
const Authorization = () => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/images/logo.png')} />
        <Text style={styles.logoText}>SignSpeech</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={textStyles.subtitle}>We all love in the same language.</Text>
        <View style={styles.inputsContainer}>
          <TextInput
            style={textStyles.input}
            placeholderTextColor={COLORS.lightText}
            placeholder="Email"
          ></TextInput>
          <TextInput
            style={textStyles.input}
            placeholderTextColor={COLORS.lightText}
            placeholder="Password"
          ></TextInput>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <GradientButton title="Register" onPress={() => {}} />
        <Link preLinkText="Already have an account?" linkText="Sign in!" onPress={() => {}} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 2,
    justifyContent: 'space-between',
  },
  logoContainer: {
    marginTop: 50,
    height: 320,
    overflow: 'hidden',
  },
  logo: {
    resizeMode: 'cover',
    height: 320,
    width: 320,
  },
  logoText: {
    position: 'absolute',
    bottom: 120,
    right: 50,
    fontFamily: FONT_TYPES.bold,
    fontSize: 48,
    color: COLORS.black,
  },
  formContainer: {
    alignItems: 'center',
  },
  inputsContainer: {
    marginBottom: 55,
  },
  actionContainer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 140,
  },
});
export default Authorization;
