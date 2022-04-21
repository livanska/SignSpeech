export enum USER_PROPS {
  email = 'email',
  password = 'password',
  fullName = 'fullName',
  profileImage = 'profileImage',
  confirmPassword = 'confirmPassword',
}
export interface IUser {
  email: string;
  password: string;
  fullName: string;
  profileImage: string;
}

export const userDefault: IUser = {
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

export interface IAuthorization {
  isAuthorized: boolean;
}

export const authorizationDefault: IAuthorization = {
  isAuthorized: false,
};
