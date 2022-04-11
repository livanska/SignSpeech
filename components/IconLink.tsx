import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { COLORS } from '../constants/Colors';
import { ICON_TITLES } from '../constants/Enums';
import { textStyles } from '../constants/TextStyle';
import Icon from './Icon';

export interface IIconLinkProps {
  linkText: string;
  onPress(): void;
  icon?: ICON_TITLES;
  isHeading?: boolean;
  style?: object;
  gapSize?: number;
  iconSize?: number;
}

const IconLink = ({
  linkText,
  style,
  iconSize,
  gapSize,
  icon,
  isHeading,
  onPress,
}: IIconLinkProps) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={style}
      activeOpacity={1}
      underlayColor={COLORS.menuItemPressed}
    >
      <View style={styles.iconLink}>
        <Icon
          size={iconSize || 24}
          name={icon}
          style={{
            color: isHeading ? COLORS.headerText : COLORS.mainText,
            marginRight: gapSize || 15,
          }}
        ></Icon>
        <Text style={isHeading ? textStyles.heading : textStyles.default}>{linkText}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  iconLink: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
export default IconLink;
