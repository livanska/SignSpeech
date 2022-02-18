import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/Colors';
import { ICON_TITLES } from '../constants/Enums';
import Icon from './Icon';
export interface IStatusCircleProps {
  isSuccess: boolean;
  height?: number;
  width?: number;
  style?: object;
}

const StatusCircle = ({ isSuccess, style, ...sizes }: IStatusCircleProps) => {
  return (
    <View
      style={[
        { backgroundColor: isSuccess ? COLORS.success : COLORS.fail },
        styles.circleBackground,
        style,
        sizes,
      ]}
    >
      <Icon
        size={isSuccess ? 15 : 25}
        color={COLORS.white}
        name={isSuccess ? ICON_TITLES.success : ICON_TITLES.fail}
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
