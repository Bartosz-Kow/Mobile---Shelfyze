export type ChatMessage = {
  id: string;
  text: string;
  author: "me" | "admin";
  createdAt: number;
  status?: "sending" | "error";
};
