import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/Colors';
import { ICON_TITLES } from '../constants/Enums';
import { SCREEN_SIZE } from '../constants/Layout';
import IconLink from './IconLink';
export interface IMenuProps {
  items: IMenuItemProps[];
}
export interface IMenuItemProps {
  title: string;
  icon: ICON_TITLES;
  onPress: () => void;
}

const Menu = ({ items }: IMenuProps) => {
  return (
    <View>
      {items.map((item: IMenuItemProps, index: number) => (
        <IconLink
          style={styles.menuTab}
          linkText={item.title}
          icon={item.icon}
          iconSize={18}
          onPress={item.onPress}
          key={index}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  menuTab: {
    width: SCREEN_SIZE.width,
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderColor: COLORS.lightBlue,
    paddingVertical: 13,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
});
export default Menu;
