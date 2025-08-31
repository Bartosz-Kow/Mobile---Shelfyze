import { useState } from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import i18n from "../../i18n";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<"pl" | "en">("pl");

  const changeLanguage = () => {
    const newLang = language === "pl" ? "en" : "pl";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <Pressable onPress={changeLanguage} style={styles.button}>
      <Text style={styles.text}>{language === "pl" ? "🇵🇱" : "🇬🇧"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 8,
    zIndex: 100,
  },
  text: {
    fontSize: 24,
  },
});
