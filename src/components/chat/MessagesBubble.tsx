import { ChatMessage } from "@/src/types/chat";
import { StyleSheet, Text, View } from "react-native";

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isMe = message.author === "me";
  const label = isMe ? "Ja" : "Admin";

  return (
    <View
      style={[styles.wrapper, isMe ? styles.myWrapper : styles.adminWrapper]}
    >
      <Text style={[styles.label, isMe ? styles.myLabel : styles.adminLabel]}>
        {label}
      </Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 4,
    maxWidth: "80%",
  },
  myWrapper: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  adminWrapper: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  label: {
    fontSize: 12,
    marginBottom: 2,
    fontWeight: "600",
  },
  myLabel: {
    color: "#4266C2",
  },
  adminLabel: {
    color: "#6B7280",
  },
  messageContainer: {
    padding: 10,
    borderRadius: 12,
  },
  myMessage: {
    backgroundColor: "#4266C2",
  },
  adminMessage: {
    backgroundColor: "#e5e7eb",
  },
  messageText: { color: "#111", fontSize: 15 },
  errorLabel: { color: "red", fontSize: 12, marginTop: 2 },
});
