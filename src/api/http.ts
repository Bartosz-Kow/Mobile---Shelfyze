import axios from "axios";
const LOCAL_URL = process.env.LOCAL_URL;

export const http = axios.create({
  //baseURL: "https://backend-shelfyze.onrender.com",
  baseURL: "http://192.168.100.54:3000",
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
