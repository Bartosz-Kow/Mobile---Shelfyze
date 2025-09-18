import { http } from "./http";

export interface User {
  userId: number;
  email: string;
  username: string;
}

export interface UpdateUsernameResponse {
  success: boolean;
  username?: string;
  error?: string;
}

export interface DeleteUserResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const updateUsername = async (
  username: string
): Promise<UpdateUsernameResponse> => {
  const res = await http.patch<UpdateUsernameResponse>("/users/username", {
    username,
  });
  return res.data;
};

export const deleteAccount = async (): Promise<DeleteUserResponse> => {
  const res = await http.delete<DeleteUserResponse>("/users");
  return res.data;
};
