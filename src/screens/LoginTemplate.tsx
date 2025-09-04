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
import { login } from "../api/auth";
import { router } from "expo-router";
export default function LoginTemplate() {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert(t(""));
    }

    try {
      setLoading(true);
      const res = await login(email, password);
      Alert.alert(t("login.title"));
      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert(t("login.title"), err.message || t("login.alerts.error"));
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
            <Text style={styles.title}>{t("login.title")}</Text>

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
              secureTextEntry={true}
            />

            <AuthButton text={t("login.title")} onPress={onLogin} />
            <Text style={styles.subFooter}>{t("login.footer")}</Text>
            <GoogleBtn />

            <Footer
              text={t("login.action1")}
              actionText={t("login.pressable")}
              router="/register"
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
