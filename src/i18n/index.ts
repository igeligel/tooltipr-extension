import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";
import TranslationsEnglish from "../locales/en/translation.json";
import TranslationsGerman from "../locales/de/translation.json";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    preload: ["en"],
    fallbackLng: "en",
    lng: "en",
    debug: true,
    ns: ["translation"],
    defaultNS: "translation",

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      bindI18n: "languageChanged",
      bindI18nStore: "",
      transEmptyNodeValue: "",
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i"],
      useSuspense: true,
    },
    resources: {
      en: { translation: TranslationsEnglish },
      de: { translation: TranslationsGerman },
    },
  });

export default i18n;
