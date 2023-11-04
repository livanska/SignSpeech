import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import TitleRow from '../components/TitleRow';
import { CARD_TYPE, EXERCISE_TYPE, LEVEL, TIME_LIMIT, TRANSLATION_TYPE } from '../constants/Cards';
import Link from '../components/Link';
import { useNavigation } from '@react-navigation/core';
import { ROUTES } from '../navigation/routes';
import ModalScreen from './ModalScreen';
import IconLink from '../components/IconLink';
import GradientButton from '../components/Buttons/GradientButton';
import { textStyles } from '../constants/TextStyle';
import { ReactElement } from 'react';
import { IScreen } from '../state/types';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { screenState } from '../state/atoms';
import { ICON_TITLES } from '../constants/Enums';

import useLocale from '../hooks/useLocale';
import { APP_STRINGS, IAppStrings } from '../strings';

export const items = [
  {
    title: 'Sign Translating',
    translation: TRANSLATION_TYPE.textToSign,
    exerciseType: EXERCISE_TYPE.speedTest,
    timeLimit: TIME_LIMIT.min3,
    type: CARD_TYPE.exercise,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.speedTest,
    timeLimit: TIME_LIMIT.min5,
    type: CARD_TYPE.exercise,
  },
  {
    title: 'Sign Translating',
    translation: TRANSLATION_TYPE.textToSign,
    exerciseType: EXERCISE_TYPE.speedTest,
    timeLimit: TIME_LIMIT.min7,
    type: CARD_TYPE.exercise,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.speedTest,
    timeLimit: TIME_LIMIT.min10,
    type: CARD_TYPE.exercise,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.speedTest,
    timeLimit: TIME_LIMIT.min15,
    type: CARD_TYPE.exercise,
  },
];

export const itemsStep = [
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.stepByStep,
    level: LEVEL.easy,
    type: CARD_TYPE.exercise,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.stepByStep,
    level: LEVEL.medium,
    type: CARD_TYPE.exercise,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.stepByStep,
    level: LEVEL.hard,
    type: CARD_TYPE.exercise,
  },
];

export const itemsDaily = [
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    type: CARD_TYPE.exercise,
    sentence: 'Nice to meet you!',
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    type: CARD_TYPE.exercise,
    sentence: 'How are you?',
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    type: CARD_TYPE.exercise,
    sentence: 'Have a nice day!',
  },
];

export const itemsVideo = [
  {
    videoId: 'tkMg8g8vVUo', //j9nSMjAywfg
    type: CARD_TYPE.video,
  },
  {
    videoId: 'G6hVRVG74lc',
    type: CARD_TYPE.video,
  },
  {
    videoId: '91foGHKuwL0',
    type: CARD_TYPE.video,
  },
];

const Home = () => {
  const navigation = useNavigation();
  const [screen, setScreen] = useRecoilState(screenState);

  const { locale } = useLocale();
  const { HOME }: IAppStrings = APP_STRINGS[locale];

  const rowMockspeedTest = {
    ...HOME.rowMockspeedTest,
    items: items,
  };

  const rowMockDailyChallenge = {
    ...HOME.rowMockDailyChallenge,
    items: itemsDaily,
  };

  const rowMockStepByStep = {
    ...HOME.rowMockStepByStep,
    items: itemsStep,
  };

  const closeModal = (): void => {
    setScreen((prev: IScreen) => ({
      ...prev,
      isOverlay: false,
    }));
  };

  const InfoModal = (): ReactElement => {
    return (
      <ModalScreen height={500} visible={screen.isOverlay} close={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTextContainer}>
            <Text style={textStyles.heading}>Help</Text>
            <Text style={textStyles.subtitle}>{HOME.internationalSignText}</Text>
          </View>
          <Image style={styles.modalImage} source={require('../assets/images/signs.jpg')} />
          <View style={styles.buttonsRow}>
            <IconLink
              linkText="Back"
              onPress={closeModal}
              icon={ICON_TITLES.chevronLeft}
              gapSize={2}
              iconSize={28}
            />
            <GradientButton title="Got it!" onPress={closeModal} />
          </View>
        </View>
      </ModalScreen>
    );
  };
  return (
    <ScrollView>
      {screen.isOverlay && <InfoModal />}
      <View style={styles.homeContainer}>
        <TitleRow {...rowMockDailyChallenge} />
        <Link
          onPress={() => navigation.navigate(ROUTES.root, { screen: ROUTES.select })}
          isHeading={true}
          preLinkText={HOME.link.preLinkText}
          linkText={HOME.link.linkText}
        />
        <TitleRow {...rowMockspeedTest} />
        <TitleRow {...rowMockStepByStep} />
        <TitleRow {...HOME.rowMockVideo} />
        <View style={styles.actionContainer}>
          <Text style={[textStyles.heading, { textAlign: 'center' }]}>{HOME.preButtonText}</Text>
          <View style={styles.buttonContainer}>
            <GradientButton
              title={HOME.translateButtonText}
              onPress={() => navigation.navigate(ROUTES.root, { screen: ROUTES.translate })}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  homeContainer: {
    marginTop: 90,
  },
  modalContainer: {
    marginVertical: 50,
    marginHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTextContainer: {
    display: 'flex',
    width: '100%',
  },
  modalImage: {
    display: 'flex',
    width: '100%',
    resizeMode: 'contain',
    height: 190,
  },
  buttonsRow: {
    width: '100%',
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
  },
  actionContainer: {
    justifyContent: 'center',
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 14,
    width: '100%',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Home;
