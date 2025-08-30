import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import enIndex from "./locales/en/screens/index.json";
import plIndex from "./locales/pl/screens/index.json";

export const resources = {
  en: { index: enIndex },
  pl: { index: plIndex },
} as const;

const fallbackLng = "en";

const deviceLanguage = (Localization.getLocales?.()[0]?.languageCode ??
  "en") as "en" | "pl";

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng,
  ns: ["index"],
  defaultNS: "index",
  compatibilityJSON: "v4",
  interpolation: { escapeValue: false },
});

export default i18n;
