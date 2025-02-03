import en from "../../../public/locales/en/translation.json";
import fr from "../../../public/locales/fr/translation.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "en";
    resources: {
      en: typeof en;
      fr: typeof fr;
    };
  }
}
