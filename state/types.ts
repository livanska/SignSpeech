export interface IUser {
  isAuthorized: boolean;
  email: string;
  password: string;
  fullName: string;
  profileImage: string;
}

export const userDefault: IUser = {
  isAuthorized: false,
  email: '',
  password: '',
  fullName: '',
  profileImage: 'https://i.stack.imgur.com/l60Hf.png',
};
