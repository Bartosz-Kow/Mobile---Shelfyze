import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import i18n from "@/src/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SupportedLanguage = "en" | "pl";

type LanguageContextValue = {
  language: SupportedLanguage;
  setLanguage: (lng: SupportedLanguage) => Promise<void>;
  toggleLanguage: () => Promise<void>;
};

export const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: async () => {},
  toggleLanguage: async () => {},
});

const STORAGE_KEY = "app.language";

type Props = { children: React.ReactNode };

export const LanguageProvider: React.FC<Props> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(
    (i18n.language as SupportedLanguage) ?? "en"
  );

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === "en" || saved === "pl") {
          await i18n.changeLanguage(saved);
          setLanguageState(saved);
        }
      } catch {}
    })();
  }, []);

  const setLanguage = useCallback(async (lng: SupportedLanguage) => {
    await i18n.changeLanguage(lng);
    setLanguageState(lng);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, lng);
    } catch {}
  }, []);

  const toggleLanguage = useCallback(async () => {
    await setLanguage(language === "en" ? "pl" : "en");
  }, [language, setLanguage]);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage }),
    [language, setLanguage, toggleLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
