import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../../public/locales/en/translation.json";
import fr from "../../../public/locales/fr/translation.json";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: en,
    },

    fr: {
      translation: fr,
    },
  },
});
