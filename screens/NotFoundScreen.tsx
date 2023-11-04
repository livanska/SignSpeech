import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { RootStackScreenProps } from '../navigation/types';

import useLocale from '../hooks/useLocale';
import { APP_STRINGS, IAppStrings } from '../strings';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  const { locale } = useLocale();
  const { NOT_FOUND }: IAppStrings = APP_STRINGS[locale];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{NOT_FOUND.title}</Text>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>{NOT_FOUND.buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
