import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { ROUTES } from '../navigation/routes';
import { COLORS } from '../constants/Colors';
import { SCREEN_SIZE } from '../constants/Layout';
import { textStyles } from '../constants/TextStyle';
import StatusCircle from '../components/StatusCircle';
import { useEffect, useState } from 'react';
import { IExerciseOptions } from './CameraScreen';
import { ISign, Signs } from '../handimage';
import { IResultScreenProps } from './ResultScreen';
import SignCard from '../components/SignCard';
import IconLink from '../components/IconLink';
import { ICON_TITLES } from '../constants/Enums';

const Task = ({ route }) => {
  const { timeLimit, level }: IExerciseOptions = route.params.exerciseOptions;
  const [currentSign, setCurrentSign] = useState<ISign>(null);
  const [selectedSign, setSelectedSign] = useState<ISign>(null);
  const [answerVariantSigns, setAnswerVariantSigns] = useState<ISign[]>([]);
  const [timerValue, setTimerValue] = useState<number | null>(null);
  const [overlayColor, setOverlayColor] = useState<COLORS>(COLORS.transparent);
  const [isBack, setIsBack] = useState<boolean>(false);
  const [result, setResult] = useState<IResultScreenProps>({
    allAmount: timeLimit * 6,
    allCorrectAmount: 0,
  });
  const isFocusedScreen: boolean = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (timerValue === 0 && result.allAmount && !isBack) {
      navigation.navigate(ROUTES.result, result);
      setTimerValue(null);
      return;
    }
    if (!timerValue) {
      return;
    }

    const timer = setInterval(() => {
      setTimerValue(timerValue - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timerValue]);

  useEffect(() => {
    setIsBack(false);
  }, []);
  useEffect(() => {
    (async () => {
      if (isFocusedScreen) {
        if (timeLimit) {
          setTimerValue(null);
          setSelectedSign(null);
          setIsBack(false);
          setRandomSignAndAnswers();
          setTimeout(() => setTimerValue(timeLimit * 2), 2000);
        }
      } else {
        setTimerValue(0);
      }
    })();
  }, [isFocusedScreen]);

  const shuffleArray = (signs: ISign[]): ISign[] => signs.sort((a, b) => 0.5 - Math.random());

  const setRandomSignAndAnswers = () => {
    const current = Signs[Math.floor(Math.random() * Signs.length)];
    setCurrentSign(current);
    setAnswerVariantSigns(
      shuffleArray([
        current,
        ...shuffleArray(Signs.filter((sign: ISign) => sign !== current)).slice(0, 5),
      ])
    );
  };

  const toTimeString = (seconds: number): string =>
    (seconds - (seconds %= 60)) / 60 + (9 < seconds ? ':' : ':0') + seconds;

  const onCardPress = (sign: ISign): void => {
    setSelectedSign(sign);
    setOverlayColor(sign === currentSign ? COLORS.success : COLORS.fail);
    setResult((prev: IResultScreenProps) => ({
      allCorrectAmount: sign === currentSign ? prev.allCorrectAmount + 1 : prev.allCorrectAmount,
      allAmount: prev.allAmount + 1,
    }));
    setTimeout(() => {
      setOverlayColor(COLORS.transparent);
      setRandomSignAndAnswers();
      setSelectedSign(null);
    }, 1000);
  };

  //   const SignImage = currentSign?.signImage;
  const SignImage = Signs[0]?.signImage;
  return (
    <View style={styles.taskContainer}>
      <View style={styles.topRow}>
        <IconLink
          linkText={'Back'}
          icon={ICON_TITLES.chevronLeft}
          onPress={() => {
            setIsBack(true);
            navigation.navigate(ROUTES.root, { screen: ROUTES.home });
          }}
          isHeading={true}
          gapSize={1}
        />
        <Text style={textStyles.heading}>{toTimeString(timerValue)}</Text>
      </View>
      <View style={styles.taskInfo}></View>
      <Text style={[textStyles.rowHeading, { marginBottom: 15 }]}>Which letter is it?</Text>
      <View style={styles.signImageCircle}>
        <View style={styles.signImage}>
          {currentSign?.signImage && <SignImage width={154} stroke={'#000000'} />}
          {overlayColor != COLORS.transparent && (
            <StatusCircle style={styles.statusCircle} isSuccess={overlayColor === COLORS.success} />
          )}
        </View>
      </View>
      <View style={styles.cardsGrid}>
        {answerVariantSigns &&
          answerVariantSigns.map((sign: ISign, idx: number) => (
            <SignCard
              key={idx}
              letter={sign?.letter}
              onPress={() => onCardPress(sign)}
              overlayColor={sign === selectedSign && overlayColor}
            />
          ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  taskContainer: {
    marginTop: -30,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_SIZE.width,
    height: SCREEN_SIZE.height,
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SCREEN_SIZE.width - 50,
  },
  signImageCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 154,
    width: 154,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.primaryMedium,
    display: 'flex',
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  signImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  taskInfo: {
    width: SCREEN_SIZE.width - 60,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 120,
  },
  statusCircle: {
    position: 'absolute',
    bottom: -50,
    right: 0,
  },
});
export default Task;
