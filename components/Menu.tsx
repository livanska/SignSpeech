import { Button, Text, View, StyleSheet, Pressable, TouchableHighlight, Alert } from 'react-native';
import { COLORS } from '../constants/Colors';
import { FONT_TYPES } from '../constants/Enums';
import { SCREEN_SIZE } from '../constants/Layout';
import { textStyles } from '../constants/TextStyle';
export interface IMenuProps {
  items: IMenuItemProps[];
}
export interface IMenuItemProps {
  title: string;
  onPress: () => void;
}
const Menu = ({ items }: IMenuProps) => {
  return (
    <View>
      {items.map((item: IMenuItemProps, index: number) => (
        <TouchableHighlight
          onPress={item.onPress}
          key={index}
          style={styles.menuTab}
          activeOpacity={1}
          underlayColor={COLORS.menuItemPressed}
        >
          <Text style={textStyles.default}>{item.title}</Text>
        </TouchableHighlight>
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
    padding: 13,
    backgroundColor: COLORS.white,
  },
});
export default Menu;
