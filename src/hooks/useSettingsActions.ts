import { deleteAccount, updateUsername } from "@/src/api/users";
import { useAuth } from "@/src/context/AuthProvider";
import i18n from "@/src/i18n";
import { deleteUserImage } from "@/src/utills/saveImage";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export function useSettingsActions() {
  const { logout, setUser, user } = useAuth();
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
          onPress: async () => {
            try {
              logout();
              router.replace("/login");
            } catch (e) {
              console.error("❌ Error during logout:", e);
              logout();
              router.replace("/login");
            }
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
          onPress: async () => {
            try {
              if (user) {
                await deleteUserImage(user.userId);
              }
              await deleteAccount();
              logout();
              router.replace("/register");
            } catch (e) {
              console.error("❌ Error deleting account:", e);
              Alert.alert("Error", "Could not delete account");
            }
          },
        },
      ]
    );
  };

  const confirmChangeLanguage = () => {
    const newLang = i18n.language === "pl" ? "en" : "pl";
    Alert.alert(
      t("settings.alerts.changeLanguageTitle"),
      t("settings.alerts.changeLanguageMessage"),
      [
        { text: t("settings.alerts.cancel"), style: "cancel" },
        {
          text: t("settings.alerts.confirmChange"),
          onPress: () => {
            i18n.changeLanguage(newLang);
          },
        },
      ]
    );
  };

  const changeUsername = () => {
    Alert.prompt(
      t("settings.changeName"),
      t("settings.alerts.enterNewName", "Please enter your new username"),
      [
        { text: t("settings.alerts.cancel"), style: "cancel" },
        {
          text: t("settings.alerts.confirmChange"),
          onPress: async (newName) => {
            if (!newName) return;
            try {
              const res = await updateUsername(newName);
              if (res.success) {
                setUser({ username: res.username! });
              } else {
                Alert.alert("Error", res.error || "Could not update username");
              }
            } catch (e) {
              console.error("❌ Error updating username:", e);
              Alert.alert("Error", "Could not update username");
            }
          },
        },
      ],
      "plain-text"
    );
  };

  return {
    confirmLogout,
    confirmDeleteAccount,
    confirmChangeLanguage,
    changeUsername,
  };
}
