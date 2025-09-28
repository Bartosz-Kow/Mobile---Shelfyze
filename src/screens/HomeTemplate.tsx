import { StyleSheet, Text, View } from "react-native";
import FloatingBtn from "../components/home/FloatingButton";
import { useAuth } from "../context/AuthProvider";

import BookTemplate from "./BookTemplate";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>
          {user ? `Witaj ${user.username}!` : "Nie jesteś zalogowany"}
        </Text>

        <BookTemplate />

        <FloatingBtn />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#d2e7f7ff",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
});
