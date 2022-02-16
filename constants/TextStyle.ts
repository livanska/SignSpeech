import { StyleSheet } from 'react-native';
import { COLORS } from './Colors';
import { FONT_TYPES } from './Enums';
export const textStyles = StyleSheet.create({
  heading: {
    fontFamily: FONT_TYPES.bold,
    fontSize: 18,
    color: COLORS.headerText,
  },
  rowHeading: {
    fontFamily: FONT_TYPES.bold,
    fontSize: 28,
    paddingBottom: 4,
    color: COLORS.headerText,
  },
  subtitle: {
    fontFamily: FONT_TYPES.light,
    fontSize: 16,
    color: COLORS.mainText,
  },
  default: {
    fontFamily: FONT_TYPES.regular,
    fontSize: 16,
    color: COLORS.mainText,
  },
});
