import { Text, StyleSheet } from "react-native";

interface LogoProps {
  size: number;
}

export default function Logo({ size }: LogoProps) {
  return (
    <Text style={[styles.logo, { fontSize: size }]}>
      <Text style={[styles.logoUnderline, { fontSize: size }]}>SHELF</Text>
      <Text style={[styles.logoEnd, { fontSize: size }]}>YZE</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontFamily: "UnicaOne-Regular",
    color: "#4266C2",
  },
  logoEnd: {
    color: "#286161",
  },
  logoUnderline: {
    textDecorationLine: "underline",
  },
});
