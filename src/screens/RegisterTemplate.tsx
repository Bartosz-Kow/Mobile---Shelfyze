import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterTemplate() {
  return (
    <View>
      <Text>SHELFYZE</Text>
      <Text>Zarejestruj się</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
