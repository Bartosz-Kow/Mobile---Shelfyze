import React from "react";
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
  return (
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        placeholder="Napisz wiadomość..."
        value={value}
        onChangeText={onChange}
      />
      <TouchableOpacity
        onPress={onSend}
        style={styles.sendButton}
        activeOpacity={0.7}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>Wyślij</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#4266C2",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
