export interface IUser {
  isAuthorized: boolean;
  email: string;
  password: string;
  fullName: string;
  profileImage: string;
}

export enum USER_PROPS {
  isAuthorized = 'isAuthorized',
  email = 'email',
  password = 'password',
  fullName = 'fullName',
  profileImage = 'profileImage',
  confirmPassword = 'confirmPassword',
}

export const userDefault: IUser = {
  isAuthorized: false,
  email: '',
  password: '',
  fullName: '',
  profileImage: 'https://i.stack.imgur.com/l60Hf.png',
};

export interface IScreen {
  isLoading: boolean;
  isOverlay: boolean;
}

export const screenDefault: IScreen = {
  isLoading: false,
  isOverlay: false,
};