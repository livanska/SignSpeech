import { ICON_TITLES } from '../constants/Enums';
import Icon from './Icon';

export interface ITabBarIconProps {
  name: ICON_TITLES;
  color: string;
}

export const TabBarIcon = (props: ITabBarIconProps) => {
  return <Icon size={24} style={{ marginBottom: -3 }} {...props} />;
};
