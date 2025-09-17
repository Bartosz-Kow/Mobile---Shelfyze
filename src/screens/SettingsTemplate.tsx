import { StyleSheet, View } from "react-native";
import AvatarComponent from "../components/settings/avatar";
import { useAuth } from "../context/AuthProvider";

export default function SettingsScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <AvatarComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
