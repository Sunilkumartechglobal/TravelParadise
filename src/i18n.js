// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import hi from './locales/hi';
import ta from './locales/ta';
import te from './locales/te';
import es from './locales/es';
import fr from './locales/fr';
import de from './locales/de';
import pt from './locales/pt';
import it from './locales/it';
import ja from './locales/ja';
import ko from './locales/ko';
import zh from './locales/zh';
import ar from './locales/ar';
import ru from './locales/ru';
import ml from './locales/ml';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  ta: { translation: ta },
  te: { translation: te },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  pt: { translation: pt },
  it: { translation: it },
  ja: { translation: ja },
  ko: { translation: ko },
  zh: { translation: zh },
  ar: { translation: ar },
  ru: { translation: ru },
  ml: { translation: ml },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
