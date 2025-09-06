import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Logo from "../components/auth/Logo";
import LanguageSwitcher from "../components/auth/LanSwitch";
import AuthButton from "../components/auth/button";
import Footer from "../components/auth/footer";
import { useLocalSearchParams, router } from "expo-router";
import { verify } from "../api/auth";
import { useAuth } from "../context/AuthProvider";

export default function VerifyTemplate() {
  const { t } = useTranslation("auth");
  const [code, setCode] = useState("");
  const { userEmail } = useLocalSearchParams<{ userEmail: string }>();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const VerifyCode = async () => {
    if (!code) {
      alert(t("verify.alerts.missingCode"));
      return;
    }
    const email = userEmail;
    try {
      setLoading(true);
      const res = await verify(email, code);
      alert(t("verify.alerts.success"));
      login(res);
      router.replace("/(tabs)");
    } catch (err: any) {
      alert(t("verify.alerts.expired"));
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
            <Text style={styles.title}>{t("verify.title")}</Text>
            <Text style={styles.subtitle}>{t("verify.subtitle")}</Text>

            <TextInput
              style={styles.codeInput}
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              placeholder={t("verify.codeLabel")}
              maxLength={4}
            />

            <AuthButton text={t("verify.button")} onPress={VerifyCode} />

            <Footer
              text={t("verify.action1")}
              actionText={t("verify.pressable")}
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
  subtitle: {
    marginTop: 4,
    marginBottom: 24,
    color: "#454B60",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  codeInput: {
    width: "100%",
    height: 60,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    color: "#333",
    textAlign: "center",
    letterSpacing: 4,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});
