import { http } from "./http";

export interface AuthUser {
  userId: number;
  token: string;
  email: string;
  username: string;
}

export const register = async (
  email: string,
  password: string
): Promise<AuthUser> => {
  const res = await http.post<AuthUser>("auth/register", { email, password });
  return res.data;
};

export const verify = async (email: string, code: string) => {
  const res = await http.post("/auth/verify", { email, code });
  return res.data;
};

export const login = async (
  email: string,
  password: string
): Promise<AuthUser> => {
  const res = await http.post<AuthUser>("auth/login", { email, password });
  return res.data;
};
