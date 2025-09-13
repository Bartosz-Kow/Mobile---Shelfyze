import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  fetchMessages,
  markConversationRead,
  sendMessageToAdmin,
  type MessageRow,
} from "../api/chat";
import { useAuth } from "../context/AuthProvider";

const ADMIN_ID = 1;
const POLLING_INTERVAL = 15 * 60 * 1000; // 15 minut

type ChatMessage = {
  id: string;
  text: string;
  author: "me" | "admin";
  createdAt: number;
  status?: "sending" | "error";
};

export default function ChatScreen() {
  const { user } = useAuth();
  const router = useRouter();
  if (!user) return null;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  // 🔹 mapowanie backend -> lokalne wiadomości
  const mapRowsToChat = (rows: MessageRow[]): ChatMessage[] =>
    rows.map((m) => ({
      id: String(m.id),
      text: m.content,
      author: m.sender_user_id ? "me" : "admin",
      createdAt:
        typeof m.sent_at === "number"
          ? m.sent_at
          : new Date(m.sent_at).getTime(),
    }));

  const load = useCallback(async () => {
    try {
      const rows = await fetchMessages(ADMIN_ID, { limit: 30 });
      setMessages(mapRowsToChat(rows));
      await markConversationRead(ADMIN_ID).catch(() => {});
    } catch (e) {
      console.error("Load messages failed", e);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [load]);

  // 🔹 wysyłanie wiadomości
  const handleSend = async () => {
    if (!input.trim()) return;
    const optimistic: ChatMessage = {
      id: `tmp-${Date.now()}`,
      text: input,
      author: "me",
      createdAt: Date.now(),
      status: "sending",
    };
    setMessages((prev) => [optimistic, ...prev]);
    setInput("");

    try {
      await sendMessageToAdmin(input, ADMIN_ID);
      await load();
    } catch (e) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === optimistic.id ? { ...optimistic, status: "error" } : m
        )
      );
    }
  };

  // 🔹 renderowanie pojedynczej wiadomości
  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isMe = item.author === "me";
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.myMessage : styles.adminMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        {item.status === "error" && (
          <Text style={styles.errorLabel}>Nie wysłano</Text>
        )}
      </View>
    );
  };

  // 🔹 Android back button → powrót do tabs
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/(tabs)");
        return true; // blokuje domyślne cofnięcie
      };
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [router])
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "top"]}>
      {/* 🔹 Nagłówek z przyciskiem cofania */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)")}
          style={styles.backButton}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Czat</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({ ios: "padding", android: undefined })}
        keyboardVerticalOffset={Platform.select({ ios: 64, android: 0 })}
      >
        {/* Lista wiadomości */}
        <FlatList
          data={messages.sort((a, b) => b.createdAt - a.createdAt)}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          inverted
          contentContainerStyle={{ padding: 12 }}
        />

        {/* Pole do wpisywania */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Napisz wiadomość..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            onPress={handleSend}
            style={styles.sendButton}
            activeOpacity={0.7}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Wyślij</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  backText: {
    fontSize: 22,
    color: "#4266C2",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
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
