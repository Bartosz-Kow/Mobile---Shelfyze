import { Ionicons } from "@expo/vector-icons"; // expo/vector-icons
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ActionElementProps = {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  onPress: () => void;
};

export default function ActionElement({
  icon,
  text,
  onPress,
}: ActionElementProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <Ionicons name={icon} size={22} color="#444" style={styles.icon} />
        <Text style={styles.text}>{text}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    color: "#222",
  },
});
