import { ScrollView } from 'react-native';
import TitleRow from '../components/TitleRow';
import { CARD_TYPE } from '../components/Card';
export const items = [
  {
    title: 'Led Zeppelin',
    image: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
    type: CARD_TYPE.signsToText,
  },
  {
    title: 'Led Zeppelin',
    image: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
    type: CARD_TYPE.signsToText,
  },
  {
    title: 'Led Zeppelin',
    image: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
    type: CARD_TYPE.signsToText,
  },
];
const rowMockData = {
  title: 'Daily challenge',
  subtitle: 'Try to translate as many letters as you can in limited time',
  items: items,
};

const Home = () => {
  return (
    <ScrollView>
      <TitleRow {...rowMockData} />
      <TitleRow {...rowMockData} />
      <TitleRow {...rowMockData} />
      <TitleRow {...rowMockData} />
    </ScrollView>
  );
};
export default Home;
