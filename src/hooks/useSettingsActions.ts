import { useAuth } from "@/src/context/AuthProvider";
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

  return {
    confirmLogout,
    confirmDeleteAccount,
  };
}
