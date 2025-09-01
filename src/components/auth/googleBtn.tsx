import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface GoogleBtnProps {
  onPress?: () => void;
}

export default function GoogleBtn({ onPress }: GoogleBtnProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AntDesign name="google" size={35} color="#f1766bff" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 40,
    borderColor: "#ccccccff",
    paddingVertical: 15,
    paddingHorizontal: 45,
    alignSelf: "center",
    marginTop: 15,
  },
});
