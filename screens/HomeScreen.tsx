import { ScrollView, StyleSheet, View } from 'react-native';
import TitleRow from '../components/TitleRow';
import { EXERCISE_TYPE, LEVEL, TIME_LIMIT, TRANSLATION_TYPE } from '../constants/Cards';
import { COLORS } from '../constants/Colors';
import Link, { ILinkProps } from '../components/Link';
import { useNavigation } from '@react-navigation/core';
import { ROUTES } from '../navigation/routes';
export const items = [
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.SpeedTest,
    timeLimit: TIME_LIMIT.min3,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.SpeedTest,
    timeLimit: TIME_LIMIT.min5,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.SpeedTest,
    timeLimit: TIME_LIMIT.min7,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.SpeedTest,
    timeLimit: TIME_LIMIT.min10,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.SpeedTest,
    timeLimit: TIME_LIMIT.min15,
  },
];

export const itemsStep = [
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.StepByStep,
    level: LEVEL.easy,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.StepByStep,
    level: LEVEL.medium,
  },
  {
    title: 'Sign Learning',
    translation: TRANSLATION_TYPE.signsToText,
    exerciseType: EXERCISE_TYPE.StepByStep,
    level: LEVEL.hard,
  },
];
const rowMockSpeedTest = {
  title: 'Speed Test',
  subtitle: 'Try to translate as many letters as you can in limited time',
  items: items,
};
const rowMockDailyChallenge = {
  title: 'Daily challenge',
  items: items,
};

const rowMockStepByStep = {
  title: 'Step By Step',
  subtitle: 'Start training from the easiest letters to the hardest ones',
  items: itemsStep,
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
