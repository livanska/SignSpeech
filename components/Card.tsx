import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { COLORS } from '../constants/Colors';
import { FONT_TYPES } from '../constants/Enums';
export enum CARD_TYPE {
  signsToText = 'Signs learning',
  textToSign = 'Signs translating',
}

export interface ICardProps {
  title: string;
  image: string;
  type: CARD_TYPE;
  minutesLimit?: number;
}
const image = { uri: 'https://reactjs.org/logo-og.png' };

const Card = (props: ICardProps) => {
  return (
    <TouchableOpacity>
      <View style={styles.cardContainer}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          imageStyle={{ borderRadius: 13 }}
          style={styles.cardImage}
        >
          <Image
            style={styles.cardOverlay}
            source={require('../assets/images/card-bottom-gradient.png')}
          />
          <View style={styles.titlesContainer}>
            <View>
              <Text style={styles.title}>{props.title}</Text>
            </View>
            <View>
              <Text style={styles.title}>{'Start >'}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 325,
    height: 200,
    borderRadius: 13,
    backgroundColor: COLORS.fail,
  },
  cardImage: {
    width: 325,
    height: 200,
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
  },
  titlesContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 18,
  },
  title: {
    color: COLORS.white,
    fontFamily: FONT_TYPES.bold,
    fontSize: 18,
  },
});

export default Card;
