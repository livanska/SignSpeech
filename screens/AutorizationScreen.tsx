import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { COLORS } from '../constants/Colors';
import { FONT_TYPES } from '../constants/Enums';
import { textStyles } from '../constants/TextStyle';
import GradientButton from '../components/Buttons/GradientButton';
import Link from '../components/Link';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../state/atoms';
import { IUser, USER_PROPS } from '../state/types';

enum AUTH_ERROR {
  passwordMatch = "Passwords don't match!",
  emptyFields = 'Fill in all the fields!',
  invalidEmail = 'Provide valid email address!',
  incorrectData = 'Incorrect email address or password, please try again.',
}

enum AUTH_PAGE_TYPE {
  login = 'login',
  register = 'register',
}
interface IPageProps {
  preLinkText: string;
  linkText: string;
  buttonTitle: string;
}
interface IUserInput {
  email: string;
  password: string;
}
interface IUserRegisterInput extends IUserInput {
  confirmPassword: string;
}

const userDefaultInputsValues: IUserRegisterInput = {
  email: '',
  password: '',
  confirmPassword: '',
};

const pageProps = {
  register: {
    preLinkText: 'Already have an account?',
    linkText: 'Sign in!',
    buttonTitle: 'Register',
  },
  login: {
    preLinkText: 'Don`t have an account?',
    linkText: 'Register!',
    buttonTitle: 'Sign in',
  },
};

const Authorization = () => {
  const [pageType, setPageType] = useState<AUTH_PAGE_TYPE>(AUTH_PAGE_TYPE.login);
  const [pageTypeProps, setPageTypeProps] = useState<IPageProps>(pageProps.login);
  const [inputValues, setInputValues] = useState<IUserRegisterInput>(userDefaultInputsValues);
  const setUser = useSetRecoilState(userState);
  const [error, setError] = useState<AUTH_ERROR | null>(null);

  useEffect(() => {
    setPageTypeProps(pageProps[pageType]);
    setInputValues(userDefaultInputsValues);
    setError(null);
  }, [pageType]);

  const togglePageType = (): void =>
    setPageType(isLogin() ? AUTH_PAGE_TYPE.register : AUTH_PAGE_TYPE.login);

  const isLogin = (): boolean => pageType === AUTH_PAGE_TYPE.login;

  const handleInputChange = (input: string, valuePropName: string): void => {
    setInputValues((prevValues: IUserRegisterInput) => ({
      ...prevValues,
      [valuePropName as keyof typeof inputValues]: input,
    }));
    if (
      (valuePropName === USER_PROPS.password &&
        inputValues.confirmPassword &&
        input !== inputValues.confirmPassword) ||
      (valuePropName === USER_PROPS.confirmPassword &&
        inputValues.password &&
        input !== inputValues.password)
    ) {
      setError(AUTH_ERROR.passwordMatch);
    } else setError(null);
  };

  const handleAuth = (): void => {
    Object.values(
      isLogin() ? (inputValues as IUserInput) : (inputValues as IUserRegisterInput)
    ).includes('') && setError(AUTH_ERROR.emptyFields);
    setUser((prev: IUser) => ({
      ...prev,
      isAuthorized: true,
      fullName: 'Danna Paola',
      email: 'dannapaola@gmail.com',
    }));
    //todo auth user logic
  };

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
            keyboardAppearance={'light'}
            textContentType={'emailAddress'}
            returnKeyType={'done'}
            placeholderTextColor={COLORS.lightText}
            placeholder="Email"
            onChangeText={(input) => handleInputChange(input, USER_PROPS.email)}
            value={inputValues.email}
          ></TextInput>
          <TextInput
            style={textStyles.input}
            keyboardAppearance={'light'}
            textContentType={'password'}
            returnKeyType={'done'}
            placeholderTextColor={COLORS.lightText}
            secureTextEntry={true}
            placeholder="Password"
            value={inputValues.password}
            onChangeText={(input: string) => handleInputChange(input, USER_PROPS.password)}
          ></TextInput>
          {pageType === AUTH_PAGE_TYPE.register && (
            <TextInput
              style={textStyles.input}
              keyboardAppearance={'light'}
              textContentType={'password'}
              placeholderTextColor={COLORS.lightText}
              secureTextEntry={true}
              placeholder="Confirm password"
              value={inputValues.confirmPassword}
              onChangeText={(input: string) => handleInputChange(input, USER_PROPS.confirmPassword)}
            ></TextInput>
          )}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={textStyles.error}>{error}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.actionContainer}>
        <GradientButton
          disabled={!!error && error === AUTH_ERROR.passwordMatch}
          title={pageTypeProps.buttonTitle}
          onPress={handleAuth}
        />
        <Link
          preLinkText={pageTypeProps.preLinkText}
          linkText={pageTypeProps.linkText}
          onPress={togglePageType}
        />
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
  errorContainer: {
    paddingTop: 3,
    alignItems: 'center',
  },
  actionContainer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 140,
  },
});
export default Authorization;
