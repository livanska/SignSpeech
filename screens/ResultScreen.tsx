import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { ROUTES } from '../navigation/routes';
import { SCREEN_SIZE } from '../constants/Layout';
import { textStyles } from '../constants/TextStyle';
import GradientButton from '../components/Buttons/GradientButton';
import StatusCircle from '../components/StatusCircle';
import { useEffect, useState } from 'react';

import useLocale from '../hooks/useLocale';
import { APP_STRINGS, IAppStrings } from '../strings';
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

  const { locale } = useLocale();
  const { RESULT }: IAppStrings = APP_STRINGS[locale];

  useEffect(() => {
    setStatus(percent >= 50 ? (percent >= 80 ? STATUS.success : STATUS.medium) : STATUS.failed);
  }, []);

  const getStatusText = (): string => {
    switch (status) {
      case STATUS.success:
        return `${RESULT.success.part1} ${percent}${RESULT.success.part2}`;
      case STATUS.medium:
        return `${RESULT.medium.part1} ${percent}${RESULT.medium.part2}`;
      case STATUS.failed:
        return `${RESULT.fail.part1} ${percent}${RESULT.fail.part2}`;
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
        title={RESULT.buttonText}
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
