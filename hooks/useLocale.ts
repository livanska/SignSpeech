import * as Localization from 'expo-localization';
import { Localization as LocalizationType } from 'expo-localization';

const languages = {
  portuguese: 'pt-BR',
  english: 'en-US',
  default: 'en-US',
};

function useLocale() {
  const data: LocalizationType = Localization;
  const locale: string = data.locale;

  switch (locale) {
    case languages.portuguese:
      return { data, locale: languages.portuguese };
    case languages.english:
      return { data, locale: languages.english };
    default:
      return { data, locale: languages.default };
  }
}

export default useLocale;
