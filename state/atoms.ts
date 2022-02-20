import { atom } from 'recoil';
import { screenDefault, userDefault } from './types';

export enum STATE_KEY {
  user = 'userState',
  screen = 'screenState',
}

export const userState = atom({
  key: STATE_KEY.user,
  default: userDefault,
});

export const screenState = atom({
  key: STATE_KEY.screen,
  default: screenDefault,
});
