import { useAuth } from "@/src/context/AuthProvider";
import i18n from "@/src/i18n";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export function useSettingsActions() {
  const { logout } = useAuth();
  const router = useRouter();
  const { t } = useTranslation("settings");

  const confirmLogout = () => {
    Alert.alert(
      t("settings.alerts.logoutTitle"),
      t("settings.alerts.logoutMessage"),
      [
        { text: t("settings.alerts.cancel"), style: "cancel" },
        {
          text: t("settings.alerts.confirmLogout"),
          style: "destructive",
          onPress: () => {
            logout();
            router.replace("/login");
          },
        },
      ]
    );
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      t("settings.alerts.deleteTitle"),
      t("settings.alerts.deleteMessage"),
      [
        { text: t("settings.alerts.cancel"), style: "cancel" },
        {
          text: t("settings.alerts.confirmDelete"),
          style: "destructive",
          onPress: () => {
            console.log("TODO: delete account");
            router.replace("/register");
          },
        },
      ]
    );
  };

  const confirmChangeLanguage = () => {
    const newLang = i18n.language === "pl" ? "en" : "pl";
    Alert.alert(
      t("settings.alerts.changeLanguageTitle", "Change language"),
      t("settings.alerts.changeLanguageMessage", {
        lng: newLang,
        defaultValue: "Do you want to switch language?",
      }),
      [
        { text: t("settings.alerts.cancel"), style: "cancel" },
        {
          text: t("settings.alerts.confirmChange", "Change"),
          onPress: () => {
            i18n.changeLanguage(newLang);
          },
        },
      ]
    );
  };

  return {
    confirmLogout,
    confirmDeleteAccount,
    confirmChangeLanguage,
  };
}
