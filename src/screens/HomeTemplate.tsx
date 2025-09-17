import { StyleSheet, Text, View } from "react-native";
import FloatingBtn from "../components/home/FloatingButton";
import { useAuth } from "../context/AuthProvider";

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
