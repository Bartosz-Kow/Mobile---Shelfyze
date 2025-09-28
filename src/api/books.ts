import { ColorValue } from "react-native";
import { http } from "./http";

export interface AddBookRequest {
  title: string;
  author: string;
  publisher: string;
  questions?: string[];
}

export interface AddBookResponse {
  bookId?: number;
  error?: string;
}

// ➜ POST /books
export const addBook = async (
  book: AddBookRequest
): Promise<AddBookResponse> => {
  const res = await http.post<AddBookResponse>("/books", book);
  return res.data;
};

export interface Book {
  color: ColorValue | undefined;
  progress: any;
  id: number;
  user_id: number;
  title: string;
  author: string;
  publisher: string;
  created_at: number;
}

// ➜ GET /books
export const getBooks = async (): Promise<Book[]> => {
  const res = await http.get<Book[]>("/books");
  return res.data;
};

export interface Question {
  id: number;
  book_id: number;
  question_text: string;
  answer: number | null;
}

// ➜ GET /books/:bookId/questions
export const getBookQuestions = async (bookId: number): Promise<Question[]> => {
  const res = await http.get<Question[]>(`/books/${bookId}/questions`);
  return res.data;
};

// ➜ POST /books/:bookId/questions/:questionId/answer
export const answerQuestion = async (
  bookId: number,
  questionId: number,
  answer: number
): Promise<{ ok: boolean }> => {
  const res = await http.post<{ ok: boolean }>(
    `/books/${bookId}/questions/${questionId}/answer`,
    { answer }
  );
  return res.data;
};

// ➜ DELETE /books/:bookId
export interface DeleteBookResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const deleteBook = async (
  bookId: number
): Promise<DeleteBookResponse> => {
  const res = await http.delete<DeleteBookResponse>(`/books/${bookId}`);
  return res.data;
};
