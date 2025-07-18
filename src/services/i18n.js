import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

import en from '../constants/en.json';
import ta from '../constants/ta.json';

i18n.translations = {
  en,
  ta,
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n; 