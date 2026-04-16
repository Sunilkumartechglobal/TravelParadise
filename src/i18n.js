// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en";
import hi from "./locales/hi";
import ta from "./locales/ta";
import te from "./locales/te";
import es from "./locales/es";
import fr from "./locales/fr";
import de from "./locales/de";
import pt from "./locales/pt";
import it from "./locales/it";
import ja from "./locales/ja";
import ko from "./locales/ko";
import zh from "./locales/zh";
import ar from "./locales/ar";
import ru from "./locales/ru";
import ml from "./locales/ml";

const resources = {
  en: en,
  hi: hi,
  ta: ta,
  te: te,
  es: es,
  fr: fr,
  de: de,
  pt: pt,
  it: it,
  ja: ja,
  ko: ko,
  zh: zh,
  ar: ar,
  ru: ru,
  ml: ml,
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  // ns: [
  //   "translation",
  //   "footer",
  //   "featureList",
  //   "popularDestinations",
  //   "houseboatList",
  //   "testimonials",
  // ],
  defaultNS: "translation",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
