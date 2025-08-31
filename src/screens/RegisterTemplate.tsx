import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import Logo from "../components/Logo";
import AuthInput from "../components/AuthInputs";
import { useState } from "react";
import LanguageSwitcher from "../components/LanSwitch";
export default function RegisterTemplate() {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <LanguageSwitcher />
      <View style={styles.container}>
        <Logo size={45} />
        <Text style={styles.title}>{t("register.title")}</Text>
        <AuthInput
          label="Email"
          placeholder="example@email.com"
          value={email}
          onChangeText={setEmail}
        />
        <AuthInput
          label={t("labels.password")}
          placeholder="*******"
          value={password}
          onChangeText={setPassword}
        />
        <AuthInput
          label={t("labels.password-repeat")}
          placeholder="*******"
          value={password}
          onChangeText={setPassword}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "70%",
    margin: "auto",
  },
  title: {
    marginTop: 2,
    color: "#707585",
    fontSize: 25,
    fontFamily: "Poppins-Regular",
  },
});
