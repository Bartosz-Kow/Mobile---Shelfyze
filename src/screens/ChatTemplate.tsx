import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  fetchMessages,
  markConversationRead,
  sendMessageToAdmin,
  type MessageRow,
} from "../api/chat";
import ChatInput from "../components/chat/chatinput";
import ChatHeader from "../components/chat/header";
import MessageBubble from "../components/chat/MessagesBubble";
import { useAuth } from "../context/AuthProvider";
import { ChatMessage } from "../types/chat";

const ADMIN_ID = 1;
const POLLING_INTERVAL = 15 * 60 * 1000;

export default function ChatScreen() {
  const { user } = useAuth();
  const router = useRouter();
  if (!user) return null;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

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

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/(tabs)");
        return true;
      };
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [router])
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <SafeAreaView style={styles.container} edges={["bottom", "top"]}>
        <ChatHeader onBack={() => router.replace("/(tabs)")} />

        <FlatList
          data={messages.sort((a, b) => b.createdAt - a.createdAt)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          inverted
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 12 }}
        />
        <ChatInput value={input} onChange={setInput} onSend={handleSend} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
});
