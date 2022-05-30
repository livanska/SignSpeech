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
import { ReactElement, useEffect, useState } from 'react';
import { IScreen } from '../state/types';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { screenState } from '../state/atoms';
import { ICON_TITLES } from '../constants/Enums';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../constants/Colors';

const internationalSignText =
  'International Sign (IS) is a contact variety of sign language used in a variety of different contexts, particularly at international meetings such as the World Federation of the Deaf (WFD) congress, events such as the Deaflympics, in video clips produced by Deaf people and watched by other Deaf people from around the world, and informally when travelling and socialising. ';

export const items = [
  {
    title: 'Sign Translating',
    translation: TRANSLATION_TYPE.textToSign,
    exerciseType: EXERCISE_TYPE.SpeedTest,
    timeLimit: TIME_LIMIT.min3,
    type: CARD_TYPE.exercise,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.SpeedTest,
    timeLimit: TIME_LIMIT.min5,
    type: CARD_TYPE.exercise,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.SpeedTest,
    timeLimit: TIME_LIMIT.min7,
    type: CARD_TYPE.exercise,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.SpeedTest,
    timeLimit: TIME_LIMIT.min10,
    type: CARD_TYPE.exercise,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.SpeedTest,
    timeLimit: TIME_LIMIT.min15,
    type: CARD_TYPE.exercise,
  },
];

export const itemsStep = [
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.StepByStep,
    level: LEVEL.easy,
    type: CARD_TYPE.exercise,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.StepByStep,
    level: LEVEL.medium,
    type: CARD_TYPE.exercise,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.StepByStep,
    level: LEVEL.hard,
    type: CARD_TYPE.exercise,
  },
];

export const itemsDaily = [
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    // exerciseType: EXERCISE_TYPE.StepByStep,
    level: LEVEL.easy,
    type: CARD_TYPE.exercise,
  },
  {
    title: 'Sign Translating',
    translation: TRANSLATION_TYPE.textToSign,
    // exerciseType: EXERCISE_TYPE.,
    level: LEVEL.medium,
    type: CARD_TYPE.exercise,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.StepByStep,
    level: LEVEL.hard,
    type: CARD_TYPE.exercise,
  },
];

export const itemsVideo = [
  {
    videoId: 'tkMg8g8vVUo',
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
const rowMockSpeedTest = {
  title: 'Speed Test',
  subtitle: 'Try to translate as many letters as you can in limited time',
  items: items,
};
const rowMockDailyChallenge = {
  title: 'Daily challenge',
  items: itemsDaily,
};

const rowMockStepByStep = {
  title: 'Step By Step',
  subtitle: 'Start training from the easiest letters to the hardest ones',
  items: itemsStep,
};

const rowMockVideo = {
  title: 'Video Learning',
  subtitle: 'Improve your knowledge with the help of world-known teachers',
  items: itemsVideo,
};
// const linkData: Partial<ILinkProps> = {
//   isHeading: true,
//   preLinkText: 'Still don’t know how to show your speech to deaf audience?',
//   linkText: 'Learn now!',
// };

const Home = () => {
  const navigation = useNavigation();
  const [screen, setScreen] = useRecoilState(screenState);

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
            <Text style={textStyles.subtitle}>{internationalSignText}</Text>
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
            <GradientButton title="Got it!" onPress={async () => {}} />
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
          onPress={() => navigation.navigate(ROUTES.root, { screen: ROUTES.learning })}
          isHeading={true}
          preLinkText={'Still don’t know how to show your speech to deaf audience?'}
          linkText={'Learn now!'}
        />
        <TitleRow {...rowMockSpeedTest} />
        <TitleRow {...rowMockStepByStep} />
        <TitleRow {...rowMockVideo} />
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
});
export default Home;
