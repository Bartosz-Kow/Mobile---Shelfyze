import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enAddBook from "./locales/en/screens/addbook.json"; // 🔹 nowy import
import enAuth from "./locales/en/screens/auth.json";
import enChat from "./locales/en/screens/chat.json";
import enIndex from "./locales/en/screens/index.json";
import enSettings from "./locales/en/screens/settings.json";

import plAddBook from "./locales/pl/screens/addbook.json";
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
    addbook: enAddBook,
  },
  pl: {
    index: plIndex,
    auth: plAuth,
    chat: plChat,
    settings: plSettings,
    addbook: plAddBook,
  },
} as const;

const fallbackLng = "en";

const deviceLanguage = (Localization.getLocales?.()[0]?.languageCode ??
  "en") as "en" | "pl";

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng,
  ns: ["index", "auth", "chat", "settings", "addbook"],
  defaultNS: "index",
  compatibilityJSON: "v4",
  interpolation: { escapeValue: false },
});

export default i18n;
