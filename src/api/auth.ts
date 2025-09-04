import { http } from "./http";

export const register = (email: string, password: string) => {
  return http.post("auth/register", { email, password });
};

export const verify = (email: string, code: string) => {
  return http.post("/auth/verify", { email, code });
};

export const login = (email: string, password: string) => {
  return http.post("auth/login", { email, password });
};
