import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthProvider";
import FloatingBtn from "../components/home/FloatingButton";
export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>
          {user ? `Witaj ${user.username}!` : "Nie jesteś zalogowany"}
        </Text>
      </View>
      <FloatingBtn />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
});
