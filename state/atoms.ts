import { atom } from 'recoil';
import { screenDefault, userDefault, authorizationDefault } from './types';

export enum STATE_KEY {
  user = 'userState',
  screen = 'screenState',
  authorization = ' authorizationState',
}

export const userState = atom({
  key: STATE_KEY.user,
  default: userDefault,
});

export const screenState = atom({
  key: STATE_KEY.screen,
  default: screenDefault,
});

export const authorizationState = atom({
  key: STATE_KEY.authorization,
  default: authorizationDefault,
});
