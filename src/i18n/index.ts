import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import enIndex from "./locales/en/screens/index.json";
import plIndex from "./locales/pl/screens/index.json";
import enAuth from "./locales/en/screens/auth.json";
import plAuth from "./locales/pl/screens/auth.json";

export const resources = {
  en: {
    index: enIndex,
    auth: enAuth,
  },
  pl: {
    index: plIndex,
    auth: plAuth,
  },
} as const;

const fallbackLng = "en";

const deviceLanguage = (Localization.getLocales?.()[0]?.languageCode ??
  "en") as "en" | "pl";

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng,
  ns: ["index", "auth"],
  defaultNS: "index",
  compatibilityJSON: "v4",
  interpolation: { escapeValue: false },
});

export default i18n;
