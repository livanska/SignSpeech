import { StyleSheet } from 'react-native';
import { COLORS } from './Colors';
import { FONT_TYPES } from './Enums';
import { SCREEN_SIZE } from './Layout';
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
  button: {
    fontFamily: FONT_TYPES.regular,
    fontSize: 16,
    color: COLORS.white,
  },
  link: {
    fontFamily: FONT_TYPES.regular,
    fontSize: 16,
    color: COLORS.primaryLight,
  },
  aboveInputHeader: {
    fontFamily: FONT_TYPES.bold,
    fontSize: 16,
    color: COLORS.primaryLight,
  },
  headingLink: {
    fontFamily: FONT_TYPES.bold,
    fontSize: 18,
    color: COLORS.primaryLight,
  },
  input: {
    height: 48,
    paddingHorizontal: 20,
    marginHorizontal: 35,
    width: SCREEN_SIZE.width - 70,
    marginVertical: 7,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    borderRadius: 13,
    shadowRadius: 10,
    shadowOffset: { height: 4, width: 0 },
    fontFamily: FONT_TYPES.regular,
    fontSize: 16,
    color: COLORS.mainText,
  },
  error: {
    color: COLORS.fail,
    fontFamily: FONT_TYPES.regular,
    fontSize: 16,
  },
});
