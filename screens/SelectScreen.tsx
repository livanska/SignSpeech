import { ScrollView, StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native';
import TitleRow from '../components/TitleRow';
import { CARD_TYPE, EXERCISE_TYPE, LEVEL, TIME_LIMIT, TRANSLATION_TYPE } from '../constants/Cards';
import Link from '../components/Link';
import { useNavigation } from '@react-navigation/core';
import { ROUTES } from '../navigation/routes';
import { COLORS } from '../constants/Colors';
import { SCREEN_SIZE } from '../constants/Layout';
import { textStyles } from '../constants/TextStyle';
import GradientButton from '../components/Buttons/GradientButton';
import StatusCircle from '../components/StatusCircle';
import { useEffect, useState } from 'react';
import { ICameraScreenProps } from './CameraScreen';
import IconLink from '../components/IconLink';
import { ICON_TITLES } from '../constants/Enums';

enum STATUS {
  success = 'success',
  medium = 'medium',
  failed = 'failed',
}

const Select = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.selectContainer}>
      <View style={styles.topRow}>
        <IconLink
          linkText={'Back'}
          icon={ICON_TITLES.chevronLeft}
          onPress={() => {
            navigation.navigate(ROUTES.root, { screen: ROUTES.home });
          }}
          isHeading={true}
          gapSize={1}
        />
      </View>
      <View style={styles.selectInfo}>
        <Image style={styles.image} source={require('../assets/images/select-image.png')} />
        <View style={{ marginTop: -50 }}>
          <Text style={[textStyles.rowHeading, { textAlign: 'center' }]}>
            What do you want to practice?
          </Text>
        </View>
        <View style={styles.selectButtons}>
          <GradientButton
            disabled={false}
            title={'Signs to text'}
            onPress={() =>
              navigation.navigate(ROUTES.task, {
                exerciseOptions: {},
              })
            }
          />
          <GradientButton
            disabled={false}
            title={'Text to signs'}
            onPress={() =>
              navigation.navigate(ROUTES.signTask, {
                cameraScreenOptions: {
                  reachedFromPage: ROUTES.learning,
                  exerciseOptions: {},
                },
              })
            }
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  selectContainer: {
    marginTop: 110,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: SCREEN_SIZE.width,
    resizeMode: 'contain',
    height: 300,
  },
  selectButtons: {
    flexDirection: 'row',

    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    width: SCREEN_SIZE.width - 120,
    justifyContent: 'space-between',
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SCREEN_SIZE.width - 50,
  },
  selectInfo: {
    width: SCREEN_SIZE.width - 60,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // textAlign: 'center',
    marginVertical: 120,
  },
});
export default Select;
