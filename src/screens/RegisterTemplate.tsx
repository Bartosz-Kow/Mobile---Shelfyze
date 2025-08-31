import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import Logo from "../components/Logo";

export default function RegisterTemplate() {
  const { t } = useTranslation("auth");

  return (
    <View style={styles.container}>
      <Logo size={45} />
      <Text style={styles.title}>{t("register.title")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "70%",
    margin: "auto",
  },
  title: {
    marginTop: 2,
    color: "#707585",
    fontSize: 25,
    fontFamily: "Poppins-Regular",
  },
});
