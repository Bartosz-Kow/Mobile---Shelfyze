import axios from "axios";

export const http = axios.create({
  baseURL: "https://backend-shelfyze.onrender.com",
});
