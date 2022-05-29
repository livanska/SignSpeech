import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import TitleRow from '../components/TitleRow';
import { CARD_TYPE, EXERCISE_TYPE, LEVEL, TIME_LIMIT, TRANSLATION_TYPE } from '../constants/Cards';
import Link from '../components/Link';
import { useNavigation } from '@react-navigation/core';
import { ROUTES } from '../navigation/routes';

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
  return (
    <ScrollView>
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
});
export default Home;
