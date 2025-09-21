import { LinearGradient } from "expo-linear-gradient";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  onClose: () => void;
};

export function GradientHeader({ title, subtitle, onClose }: Props) {
  return (
    <LinearGradient
      colors={["#4266C2", "#286161"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle ? (
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        ) : null}
      </View>
      <View style={{ width: 40 }} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  closeText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Poppins-Regular",
  },
});
