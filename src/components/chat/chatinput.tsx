import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type ChatInputProps = {
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
};

export default function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  const { t } = useTranslation("chat");
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={t("chat.placeholder")}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChange}
          multiline
        />
      </View>

      <TouchableOpacity
        onPress={onSend}
        activeOpacity={0.8}
        style={styles.sendWrapper}
      >
        <LinearGradient
          colors={["#4266C2", "#286161"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.sendButton}
        >
          <Text style={styles.sendIcon}>✈️</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
    alignItems: "flex-end",
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    fontSize: 15,
    color: "#111827",
    fontFamily: "Poppins-Regular",
    maxHeight: 120,
  },
  sendWrapper: {
    borderRadius: 30,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  sendButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  sendIcon: {
    fontSize: 20,
    color: "#fff",
  },
});
