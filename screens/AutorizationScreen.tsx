import { StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native';
import { COLORS } from '../constants/Colors';
import { FONT_TYPES } from '../constants/Enums';
import { textStyles } from '../constants/TextStyle';
import GradientButton from '../components/Buttons/GradientButton';
import Link from '../components/Link';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authorizationState, userState } from '../state/atoms';
import { IAuthorization, IUser, USER_PROPS } from '../state/types';
import { authorizeUser } from '../firebase/user';
import useLocale from '../hooks/useLocale';
import { APP_STRINGS, IAppStrings } from '../strings';

interface IAUTH_ERROR {
  passwordMatch: string;
  emptyFields: string;
  invalidEmail: string;
  incorrectData: string;
  serverError: string;
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
export interface IUserInput {
  email: string;
  password: string;
}
export interface IUserRegisterInput extends IUserInput {
  confirmPassword: string;
  fullName: string;
}

const userDefaultInputsValues: IUserRegisterInput = {
  email: '',
  password: '',
  confirmPassword: '',
  fullName: '',
};

const Authorization = () => {
  const [pageType, setPageType] = useState<AUTH_PAGE_TYPE>(AUTH_PAGE_TYPE.login);
  const [inputValues, setInputValues] = useState<IUserRegisterInput>(userDefaultInputsValues);
  const setUser = useSetRecoilState(userState);
  const setAuthorization = useSetRecoilState(authorizationState);
  const [error, setError] = useState<IAUTH_ERROR | null>(null);

  const { locale } = useLocale();
  const { AUTH: AUTH_STRINGS }: IAppStrings = APP_STRINGS[locale];
  const [pageTypeProps, setPageTypeProps] = useState<IPageProps>(AUTH_STRINGS.login);

  const pageProps = {
    register: AUTH_STRINGS.register,
    login: AUTH_STRINGS.login,
  };

  useEffect(() => {
    setPageTypeProps(pageProps[pageType]);
    setInputValues(userDefaultInputsValues);
    setError(null);
  }, [pageType]);

  const isLogin = (): boolean => pageType === AUTH_PAGE_TYPE.login;

  const togglePageType = (): void =>
    setPageType(isLogin() ? AUTH_PAGE_TYPE.register : AUTH_PAGE_TYPE.login);

  const handleInputChange = (input: string, valuePropName: string): void => {
    setInputValues((prevValues: IUserRegisterInput) => ({
      ...prevValues,
      [valuePropName as keyof typeof inputValues]: input,
    }));
    if (
      (valuePropName === AUTH_STRINGS.userProps.password &&
        inputValues.confirmPassword &&
        input !== inputValues.confirmPassword) ||
      (valuePropName === AUTH_STRINGS.userProps.confirmPassword &&
        inputValues.password &&
        input !== inputValues.password)
    ) {
      setError(AUTH_STRINGS.error.passwordMatch as unknown as IAUTH_ERROR);
    } else setError(null);
  };

  const handleAuth = async (): Promise<void> => {
    if (isLogin()) {
      delete inputValues.confirmPassword;
      delete inputValues.fullName;
    }

    if (Object.values(inputValues).includes('')) {
      setError(AUTH_STRINGS.error.emptyFields as unknown as IAUTH_ERROR);
      return;
    }

    try {
      const userProfile = await authorizeUser(isLogin(), inputValues);
      if (userProfile) {
        setUser((prev: IUser) => ({
          ...prev,
          ...userProfile,
        }));

        setAuthorization((prev: IAuthorization) => ({
          ...prev,
          isAuthorized: true,
        }));
      } else {
        setError(AUTH_STRINGS.error.incorrectData as unknown as IAUTH_ERROR);
      }
    } catch (error) {
      setError(AUTH_STRINGS.error.serverError as unknown as IAUTH_ERROR);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/images/logo.png')} />
        <Text style={styles.logoText}>SignSpeech</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={textStyles.subtitle}>{AUTH_STRINGS.slogam}</Text>
        <View style={styles.inputsContainer}>
          <TextInput
            style={textStyles.input}
            keyboardAppearance={'light'}
            textContentType={'emailAddress'}
            returnKeyType={'done'}
            placeholderTextColor={COLORS.lightText}
            placeholder={AUTH_STRINGS.userProps.email}
            onChangeText={(input) => handleInputChange(input, USER_PROPS.email)}
            value={inputValues.email}
          ></TextInput>
          {pageType === AUTH_PAGE_TYPE.register && (
            <TextInput
              style={textStyles.input}
              keyboardAppearance={'light'}
              placeholderTextColor={COLORS.lightText}
              secureTextEntry={false}
              placeholder={AUTH_STRINGS.userProps.fullName}
              value={inputValues.fullName}
              onChangeText={(input: string) => handleInputChange(input, USER_PROPS.fullName)}
            ></TextInput>
          )}
          <TextInput
            style={textStyles.input}
            keyboardAppearance={'light'}
            textContentType={'password'}
            returnKeyType={'done'}
            placeholderTextColor={COLORS.lightText}
            secureTextEntry={true}
            placeholder={AUTH_STRINGS.userProps.password}
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
              placeholder={AUTH_STRINGS.userProps.confirmPassword}
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
          disabled={
            Boolean(error) && error === (AUTH_STRINGS.error.passwordMatch as unknown as IAUTH_ERROR)
          }
          title={AUTH_STRINGS[pageType].buttonTitle}
          onPress={handleAuth}
        />
        <Link
          preLinkText={AUTH_STRINGS[pageType].preLinkText}
          linkText={AUTH_STRINGS[pageType].linkText}
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
    paddingBottom: 8,
  },
});
export default Authorization;
