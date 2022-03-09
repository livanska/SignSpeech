import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { COLORS } from '../../constants/Colors';
import Icon from './../Icon';
import { ICON_TITLES } from '../../constants/Enums';

export interface IBackButtonProps {
  title?: string;
  onPress(): void;
  width?: number;
  height?: number;
  disabled?: boolean;
}

const BackButton = ({ title, onPress, disabled, ...sizes }: IBackButtonProps) => {
  return (
    <View style={!disabled && styles.shadowContainer}>
      <TouchableHighlight
        disabled={disabled}
        style={[styles.buttonContainer, sizes]}
        activeOpacity={1}
        underlayColor={COLORS.menuItemPressed}
        onPress={onPress}
      >
        <Icon size={25} name={ICON_TITLES.back} />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  shadowContainer: {
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    backgroundColor: COLORS.transparent,
    shadowRadius: 4,
    shadowOffset: { height: 0, width: 0 },
  },
});
export default BackButton;
