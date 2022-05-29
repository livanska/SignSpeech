import { StyleSheet, Text, View, Image, ImageBackground, TouchableHighlight } from 'react-native';
import { COLORS } from '../constants/Colors';
import { FONT_TYPES } from '../constants/Enums';
import { ROUTES } from '../navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { getCardImage, IExerciseCardProps, TRANSLATION_TYPE } from '../constants/Cards';
import { textStyles } from '../constants/TextStyle';

export interface ISignCardProps {
  letter: string;
  overlayColor: COLORS;
  onPress: () => void;
}

const SignCard = ({ letter, onPress, overlayColor }: ISignCardProps) => {
  return (
    <TouchableHighlight
      style={styles.cardContainer}
      activeOpacity={0.5}
      underlayColor={COLORS.menuItemPressed}
      onPress={onPress}
    >
      <View style={styles.cardContainer}>
        <View style={[styles.cardOverlay, { backgroundColor: overlayColor }]} />
        <Text style={styles.letter}>{letter}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    width: 93,
    height: 107,
    borderRadius: 7,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOpacity: 0.04,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
  },
  cardOverlay: {
    position: 'absolute',
    width: 93,
    height: 107,
    opacity: 0.2,
    borderRadius: 7,
  },

  letter: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: COLORS.mainText,
    fontFamily: FONT_TYPES.bold,
    fontSize: 36,
  },
});

export default SignCard;
