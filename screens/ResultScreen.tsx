import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
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

export interface IResultScreenProps {
  allAmount: number;
  allCorrectAmount: number;
}

enum STATUS {
  success = 'success',
  medium = 'medium',
  failed = 'failed',
}

const Result = ({ route }) => {
  const { allAmount, allCorrectAmount }: IResultScreenProps = route.params;
  const [status, setStatus] = useState<STATUS | null>(null);
  const navigation = useNavigation();
  const [percent] = useState<number>(+((allCorrectAmount * 100) / allAmount).toFixed(0));

  useEffect(() => {
    setStatus(percent >= 50 ? (percent >= 80 ? STATUS.success : STATUS.medium) : STATUS.failed);
  }, []);

  const getStatusText = (): string => {
    switch (status) {
      case STATUS.success:
        return `Congratulations! You guessed ${percent}% of signs!`;
      case STATUS.medium:
        return `Not bad! You guessed ${percent}% of signs!`;
      case STATUS.failed:
        return `Failed! You guessed ${percent}% of signs, try better!`;
      default:
        return '';
    }
  };

  return (
    <View style={styles.resultContainer}>
      <View style={styles.resultInfo}>
        <StatusCircle
          isSuccess={status === STATUS.success}
          isUnknown={status === STATUS.medium}
          height={100}
          width={100}
          style={styles.statusCircle}
          customLinesSize={40}
        />
        <Text style={[textStyles.rowHeading, { textAlign: 'center' }]}>{getStatusText()}</Text>
      </View>
      <GradientButton
        disabled={false}
        title={'Got it!'}
        onPress={() => navigation.navigate(ROUTES.root, { screen: ROUTES.home })}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  resultContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_SIZE.width,
    height: SCREEN_SIZE.height,
  },
  resultInfo: {
    width: SCREEN_SIZE.width - 60,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 120,
  },
  statusCircle: {
    marginBottom: 10,
  },
});
export default Result;
