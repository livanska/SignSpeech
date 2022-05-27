import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/Colors';
import { ICON_TITLES } from '../constants/Enums';
import Icon from './Icon';
export interface IStatusCircleProps {
  isSuccess: boolean;
  isUnknown?: boolean;
  height?: number;
  width?: number;
  style?: object;
  customLinesSize?: number;
}

const StatusCircle = ({
  isSuccess,
  isUnknown,
  customLinesSize,
  style,
  ...sizes
}: IStatusCircleProps) => {
  return (
    <View
      style={[
        { backgroundColor: isSuccess ? COLORS.success : isUnknown ? COLORS.medium : COLORS.fail },
        styles.circleBackground,
        style,
        sizes,
      ]}
    >
      <Icon
        size={
          isSuccess || isUnknown
            ? customLinesSize
              ? customLinesSize - 15
              : 15
            : customLinesSize
            ? customLinesSize
            : 25
        }
        color={COLORS.white}
        name={isSuccess || isUnknown ? ICON_TITLES.success : ICON_TITLES.fail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circleBackground: {
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default StatusCircle;
