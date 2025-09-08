import { useEffect, useState, useCallback, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Chat, MessageType, defaultTheme } from "@flyerhq/react-native-chat-ui";

import { useAuth } from "../context/AuthProvider";
import {
  fetchMessages,
  sendMessageToAdmin,
  markConversationRead,
  type MessageRow,
} from "../api/chat";

const ADMIN_ID = 1;
const POLLING_INTERVAL = __DEV__ ? 2000 : 15 * 60 * 1000;

export default function ChatScreen() {
  const { user } = useAuth();
  if (!user) return null; // zabezpieczenie gdy brak usera

  // 👇 własny identyfikator dla usera (żeby odróżnić od admina)
  const me = useMemo(
    () => ({ id: `user-${user.userId}`, firstName: user.username }),
    [user]
  );

  const [messages, setMessages] = useState<MessageType.Any[]>([]);

  // Mapper MessageRow -> Chat UI message
  const mapRowsToChatUi = (rows: MessageRow[]): MessageType.Any[] => {
    return rows.map((m) => {
      if (m.sender_user_id) {
        // wiadomość od usera
        return {
          id: String(m.id),
          type: "text",
          text: m.content,
          author: { id: `user-${m.sender_user_id}`, firstName: user.username },
          createdAt:
            typeof m.sent_at === "number"
              ? m.sent_at
              : new Date(m.sent_at).getTime(),
        } as MessageType.Text;
      } else {
        // wiadomość od admina
        return {
          id: String(m.id),
          type: "text",
          text: m.content,
          author: { id: `admin-${m.sender_admin_id}`, firstName: "Admin" },
          createdAt:
            typeof m.sent_at === "number"
              ? m.sent_at
              : new Date(m.sent_at).getTime(),
        } as MessageType.Text;
      }
    });
  };

  const load = useCallback(async () => {
    try {
      const rows = await fetchMessages(ADMIN_ID, { limit: 30 });
      setMessages(mapRowsToChatUi(rows));
      await markConversationRead(ADMIN_ID).catch(() => {});
    } catch (e) {
      console.error("Load messages failed", e);
    }
  }, [user.userId, user.username]);

  useEffect(() => {
    load();
    const interval = setInterval(load, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [load]);

  const handleSend = useCallback(
    async ({ text }: { text: string }) => {
      if (!text?.trim()) return;

      // Optimistic UI
      const optimistic: MessageType.Text = {
        id: `tmp-${Date.now()}`,
        type: "text",
        text,
        author: { id: `user-${user.userId}`, firstName: user.username },
        createdAt: Date.now(),
        status: "sending",
      };
      setMessages((prev) => [optimistic, ...prev]);

      try {
        await sendMessageToAdmin(text, ADMIN_ID);
        await load(); // dociągamy prawdziwy stan z serwera
      } catch (e) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === optimistic.id ? { ...optimistic, status: "error" } : m
          )
        );
      }
    },
    [user.userId, user.username, load]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", android: undefined })}
        keyboardVerticalOffset={Platform.select({ ios: 64, android: 0 })}
      >
        <Chat
          messages={messages}
          onSendPress={handleSend}
          user={me}
          showUserNames
          enableAnimation
          theme={{
            ...defaultTheme,
            colors: { ...defaultTheme.colors, inputBackground: "#fff" },
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
