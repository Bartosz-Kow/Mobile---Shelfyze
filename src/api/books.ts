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

export const addBook = async (
  book: AddBookRequest
): Promise<AddBookResponse> => {
  const res = await http.post<AddBookResponse>("/books/books", book);
  return res.data;
};
