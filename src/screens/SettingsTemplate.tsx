import { StyleSheet, Text, View } from "react-native";
import ActionElement from "../components/settings/actionEl";
import AvatarComponent from "../components/settings/avatar";
import { useAuth } from "../context/AuthProvider";

export default function SettingsScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AvatarComponent />
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email ?? "example@mail.com"}</Text>
      </View>

      <Text style={styles.sectionHeader}>Account</Text>
      <View style={styles.card}>
        <ActionElement
          icon="person"
          text="Change Name"
          onPress={() => console.log("Change Name pressed")}
        />
        <ActionElement
          icon="globe"
          text="Change Language"
          onPress={() => console.log("Change Language pressed")}
        />
      </View>

      <Text style={styles.sectionHeader}>Danger Zone</Text>
      <View style={styles.card}>
        <ActionElement
          icon="log-out"
          text="Logout"
          onPress={() => console.log("Logout pressed")}
        />
        <ActionElement
          icon="trash"
          text="Delete Account"
          onPress={() => console.log("Delete Account pressed")}
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
