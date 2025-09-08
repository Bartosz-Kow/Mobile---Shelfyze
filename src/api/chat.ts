import { http } from "./http";

export interface MessageRow {
  id: number;
  sender_user_id: number | null;
  receiver_admin_id: number | null;
  sender_admin_id: number | null;
  receiver_user_id: number | null;
  content: string;
  sent_at: number;
  is_read: 0 | 1;
  read_at: number | null;
}

export interface ConversationRow {
  partnerId: number;
  partnerName: string;
  lastMessageAt: number | null;
  unread: number;
}

export interface SendMessageResponse {
  id: number;
  sent_at: number;
}

export interface UnreadCount {
  total: number;
}

export type Role = "user" | "admin";

export async function fetchMessages(
  partnerId: number,
  opts: { limit?: number; before?: number | null } = {}
): Promise<MessageRow[]> {
  const { limit = 50, before = null } = opts;
  const params = new URLSearchParams();
  if (limit) params.set("limit", String(limit));
  if (before != null) params.set("before", String(before));
  const { data } = await http.get<MessageRow[]>(
    `/messenger/conversations/${partnerId}/messages?` + params.toString()
  );
  return data;
}

export async function sendMessageToAdmin(
  content: string,
  adminId = 1
): Promise<SendMessageResponse> {
  const { data } = await http.post<SendMessageResponse>(`/messenger/messages`, {
    content,
    toAdminId: adminId,
  });
  return data;
}

export async function sendMessageToUser(
  content: string,
  userId: number
): Promise<SendMessageResponse> {
  const { data } = await http.post<SendMessageResponse>(`/messenger/messages`, {
    content,
    toUserId: userId,
  });
  return data;
}

export async function markMessageRead(
  messageId: number
): Promise<{ ok: true }> {
  const { data } = await http.patch<{ ok: true }>(
    `/messenger/messages/${messageId}/read`
  );
  return data;
}

export async function markConversationRead(
  partnerId: number,
  until?: number
): Promise<{ changed: number }> {
  const { data } = await http.post<{ changed: number }>(
    `/messenger/conversations/${partnerId}/read`,
    { until }
  );
  return data;
}

export async function getUnreadCount(): Promise<UnreadCount> {
  const { data } = await http.get<UnreadCount>(`/messenger/unread-count`);
  return data;
}

export async function listConversations(): Promise<ConversationRow[]> {
  const { data } = await http.get<ConversationRow[]>(
    `/messenger/conversations`
  );
  return data;
}

export async function health(): Promise<{ ok: true }> {
  const { data } = await http.get<{ ok: true }>(`/messenger/_health`);
  return data;
}

/* -------------------------
   Helper do GiftedChat (opcjonalnie)
-------------------------- */
export interface GiftedUser {
  _id: number;
  name?: string;
}

export interface GiftedMessage {
  _id: number;
  text: string;
  createdAt: Date;
  user: GiftedUser;
}

export function mapToGifted(
  rows: MessageRow[],
  me: { id: number; role: Role; name?: string },
  adminName = "Admin",
  userName = "User"
): GiftedMessage[] {
  return rows.map((m) => {
    const isFromUser = m.sender_user_id != null;
    const authorId = isFromUser
      ? (m.sender_user_id as number)
      : (m.sender_admin_id as number);
    const authorName = isFromUser ? userName : adminName;

    return {
      _id: m.id,
      text: m.content,
      createdAt: new Date(m.sent_at),
      user: {
        _id: authorId,
        name: authorName,
      },
    };
  });
}
``;
