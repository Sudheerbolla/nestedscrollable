import I18n from 'react-native-i18n';
import { en, de, es, zh, fr, ja } from '../locales';

I18n.fallbacks = true;
I18n.translations = {
  en: en,
  de: de,
  es: es,
  zh: zh,
  fr: fr,
  ja: ja,
};

export default I18n;
