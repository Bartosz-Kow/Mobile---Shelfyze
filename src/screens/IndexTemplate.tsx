import React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";

export default function IndexTemplate() {
  const router = useRouter();
  const { t } = useTranslation("index");
  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "UnicaOne-Regular": require("../../assets/fonts/UnicaOne-Regular.ttf"),
  });
  if (!loaded && !error) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <LinearGradient colors={["#4266C2", "#286161"]} style={styles.background}>
      <Image
        source={require("../../assets/images/logo_1.png")}
        style={styles.logo}
        contentFit="contain"
      />
      <Text style={styles.text}>{t("hero.line1")}</Text>
      <Text style={styles.text}>{t("hero.line2")}</Text>
      <Pressable
        onPress={() => router.push("/register")}
        style={({ pressed }) => [styles.arrow, pressed && styles.arrowPressed]}
      >
        <FontAwesome5 name="long-arrow-alt-right" size={50} color="white" />
      </Pressable>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4266C2",
  },
  logo: { width: 200, height: 100, marginBottom: 40 },
  text: { fontSize: 20, fontFamily: "Poppins-Regular", color: "white" },
  arrow: { position: "absolute", bottom: 70, right: 100, alignItems: "center" },
  arrowPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.9 }],
  },
});
