import { Href, Link } from "expo-router";
import { Text, StyleSheet } from "react-native";

interface FooterProps {
  text: string;
  actionText: string;
  router: Href;
}

export default function Footer({ text, router, actionText }: FooterProps) {
  return (
    <Text style={styles.text}>
      {text}{" "}
      <Link href={router} style={styles.link}>
        {actionText}
      </Link>
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    alignSelf: "center",
    textAlign: "center",
    color: "#454B60",
    fontFamily: "Poppins-Regular",
  },
  link: {
    color: "#4266C2",
    fontWeight: "bold",
  },
});
