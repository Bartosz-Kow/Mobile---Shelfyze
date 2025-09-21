import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

export default function FloatingBtn() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.fabWrapper}
        onPress={() => router.push("/add-book")}
      >
        <LinearGradient
          colors={["#4266C2", "#286161"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fab}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fabWrapper: {
    position: "absolute",
    bottom: 100,
    right: 20,
    borderRadius: 35,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  fab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
