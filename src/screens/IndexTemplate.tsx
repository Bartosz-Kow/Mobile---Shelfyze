import React, { useEffect } from "react";
import { StyleSheet, Text, Pressable, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function IndexTemplate() {
  const { t } = useTranslation("index");

  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Robot-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
    "Robot-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "UnicaOne-Regular": require("../../assets/fonts/UnicaOne-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      <ActivityIndicator size="large" />;
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <LinearGradient colors={["#4266C2", "#286161"]} style={styles.background}>
      <Image
        source={require("../../assets/images/logo_1.png")}
        style={styles.logo}
        contentFit="contain"
      />
      <Text
        style={{ fontSize: 20, fontFamily: "Poppins-Regular", color: "white" }}
      >
        {t("hero.line1")}
      </Text>
      <Text
        style={{ fontSize: 20, fontFamily: "Poppins-Regular", color: "white" }}
      >
        {t("hero.line2")}
      </Text>

      <Pressable>
        <FontAwesome5 name="long-arrow-alt-right" size={80} color="white" />
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 40,
  },
});
