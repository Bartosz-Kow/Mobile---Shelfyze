import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import ActionElement from "../components/settings/actionEl";
import AvatarComponent from "../components/settings/avatar";
import { useAuth } from "../context/AuthProvider";
import { useSettingsActions } from "../hooks/useSettingsActions";

export default function SettingsScreen() {
  const { user } = useAuth();
  const { confirmLogout, confirmDeleteAccount } = useSettingsActions();
  const { t } = useTranslation("settings");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AvatarComponent />
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email ?? "example@mail.com"}</Text>
      </View>

      <Text style={styles.sectionHeader}>{t("settings.account")}</Text>
      <View style={styles.card}>
        <ActionElement
          icon="person"
          text={t("settings.changeName")}
          onPress={() => console.log("Change Name pressed")}
        />
        <ActionElement
          icon="globe"
          text={t("settings.changeLanguage")}
          onPress={() => console.log("Change Language pressed")}
        />
      </View>

      <Text style={styles.sectionHeader}>{t("settings.dangerZone")}</Text>
      <View style={styles.card}>
        <ActionElement
          icon="log-out"
          text={t("settings.logout")}
          onPress={confirmLogout}
        />
        <ActionElement
          icon="trash"
          text={t("settings.deleteAccount")}
          onPress={confirmDeleteAccount}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  username: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
  },
  email: {
    marginTop: 4,
    fontSize: 14,
    color: "#777",
  },
  sectionHeader: {
    marginHorizontal: 20,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "600",
    color: "#888",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
});
