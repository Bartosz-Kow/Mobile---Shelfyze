import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enAuth from "./locales/en/screens/auth.json";
import enChat from "./locales/en/screens/chat.json";
import enIndex from "./locales/en/screens/index.json";
import enSettings from "./locales/en/screens/settings.json";
import plAuth from "./locales/pl/screens/auth.json";
import plChat from "./locales/pl/screens/chat.json";
import plIndex from "./locales/pl/screens/index.json";
import plSettings from "./locales/pl/screens/settings.json";

export const resources = {
  en: {
    index: enIndex,
    auth: enAuth,
    chat: enChat,
    settings: enSettings,
  },
  pl: {
    index: plIndex,
    auth: plAuth,
    chat: plChat,
    settings: plSettings,
  },
} as const;

const fallbackLng = "en";

const deviceLanguage = (Localization.getLocales?.()[0]?.languageCode ??
  "en") as "en" | "pl";

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng,
  ns: ["index", "auth", "chat", "settings"],
  defaultNS: "index",
  compatibilityJSON: "v4",
  interpolation: { escapeValue: false },
});

export default i18n;
