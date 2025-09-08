import axios from "axios";

export const http = axios.create({
  baseURL: "https://backend-shelfyze.onrender.com",
});

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

http.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
