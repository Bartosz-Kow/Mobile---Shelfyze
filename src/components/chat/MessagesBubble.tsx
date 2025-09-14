import { ChatMessage } from "@/src/types/chat";
import { StyleSheet, Text, View } from "react-native";

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isMe = message.author === "me";
  return (
    <View
      style={[
        styles.messageContainer,
        isMe ? styles.myMessage : styles.adminMessage,
      ]}
    >
      <Text style={[styles.messageText, isMe && { color: "#fff" }]}>
        {message.text}
      </Text>
      {message.status === "error" && (
        <Text style={styles.errorLabel}>Nie wysłano</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 4,
    padding: 10,
    borderRadius: 12,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#4266C2",
  },
  adminMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e7eb",
  },
  messageText: { color: "#111", fontSize: 15 },
  errorLabel: { color: "red", fontSize: 12, marginTop: 2 },
});
