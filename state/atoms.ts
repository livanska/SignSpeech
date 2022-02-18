import { atom } from 'recoil';
import { userDefault } from './types';

export enum STATE_KEY {
  user = 'userState',
}

export const userState = atom({
  key: STATE_KEY.user,
  default: userDefault,
});
