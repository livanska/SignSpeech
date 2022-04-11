import { ScrollView, StyleSheet, View } from 'react-native';
import TitleRow from '../components/TitleRow';
import { CARD_TYPE } from '../components/Card';
import { COLORS } from '../constants/Colors';
import Link, { ILinkProps } from '../components/Link';
import { useNavigation } from '@react-navigation/core';
import { ROUTES } from '../navigation/routes';
export const items = [
  {
    title: 'Sign Learning',
    image: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
    type: CARD_TYPE.signsToText,
  },
  {
    title: 'Sign Learning',
    image: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
    type: CARD_TYPE.signsToText,
  },
  {
    title: 'Sign Learning',
    image: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
    type: CARD_TYPE.signsToText,
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
  items: items,
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
