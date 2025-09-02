import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Logo from "../components/auth/Logo";
import AuthInput from "../components/auth/AuthInputs";
import LanguageSwitcher from "../components/auth/LanSwitch";
import AuthButton from "../components/auth/button";
import GoogleBtn from "../components/auth/googleBtn";
import Footer from "../components/auth/footer";
import { register } from "../api/auth";

export default function RegisterTemplate() {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert(t("register.title"), t("register.alerts.missingFields"));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t("register.title"), t("register.alerts.passwordMismatch"));
      return;
    }

    try {
      setLoading(true);
      const res = await register(email, password);
      Alert.alert(t("register.title"), t("register.alerts.success"));
    } catch (err: any) {
      Alert.alert(
        t("register.title"),
        err.message || t("register.alerts.error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LanguageSwitcher />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
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
              secureTextEntry
            />
            <AuthInput
              label={t("labels.password-repeat")}
              placeholder="*******"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <AuthButton
              text={loading ? "Rejestruję..." : t("register.title")}
              onPress={onRegister} // <-- kliknięcie obsługujemy tutaj
            />

            <Text style={styles.subFooter}>{t("register.footer")}</Text>
            <GoogleBtn />

            <Footer
              text={t("register.action1")}
              actionText={t("register.pressable")}
              router="/login"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: "15%",
    paddingTop: 40,
  },
  content: {
    alignItems: "flex-start",
    width: "100%",
  },
  title: {
    marginTop: 8,
    color: "#707585",
    fontSize: 25,
    fontFamily: "Poppins-Regular",
  },
  subFooter: {
    marginTop: 15,
    alignSelf: "center",
    textAlign: "center",
    color: "#454B60",
    fontFamily: "Poppins-Regular",
  },
});
