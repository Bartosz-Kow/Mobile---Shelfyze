import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  onBack: () => void;
};

export default function ChatHeader({ onBack }: HeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => router.replace("/(tabs)")}
        style={styles.backButton}
      >
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Czat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  backText: {
    fontSize: 22,
    color: "#4266C2",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
});
