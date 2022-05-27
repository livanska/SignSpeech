export enum COLORS {
  headerText = '#4F4F4F',
  mainText = '#656565',
  lightText = '#C4C4C4',
  primaryLight = '#FF0080',
  primaryMedium = '#DE0C96',
  primaryDark = '#C31AB3',
  success = '#05DB81',
  fail = '#FC1055',
  white = '#fff',
  black = '#000',
  lightBlue = '#EEF3F5',
  menuItemPressed = '#F2F2F2',
  medium = '#F6C23A',
  transparent = 'transparent',
}
export const GRADIENTS = {
  PRIMARY: [COLORS.primaryLight, COLORS.primaryMedium, COLORS.primaryDark],
  DISABLED: [COLORS.lightText, COLORS.mainText, COLORS.headerText],
};

export const COLOR_THEMES = {
  light: {
    text: COLORS.mainText,
    background: COLORS.white,
    tint: COLORS.primaryLight,
    tabIconDefault: COLORS.headerText,
    tabIconSelected: COLORS.primaryLight,
  },
};
