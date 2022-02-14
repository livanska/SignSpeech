import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const SCREEN_SIZE = {
  width,
  height,
};
