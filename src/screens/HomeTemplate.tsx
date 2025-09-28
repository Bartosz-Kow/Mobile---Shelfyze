import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import FloatingBtn from "../components/home/FloatingButton";
import { useAuth } from "../context/AuthProvider";
import BookTemplate from "./BookTemplate";

export default function HomeScreen() {
  const { user } = useAuth();
  const { t } = useTranslation("home");

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>
          {t("welcome", { username: user?.username })}
        </Text>
        <Text style={styles.text}>{t("subtitle")}</Text>

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
    backgroundColor: "#e6f4ffff",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "left",
    paddingLeft: 16,
    color: "#3d3d3dff",
    fontFamily: "Poppins-Regular",
  },
});
