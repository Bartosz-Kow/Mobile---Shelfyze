import { createContext, ReactNode, useContext, useState } from "react";
import { setAuthToken } from "../api/http";
import { loadUserImage } from "../utills/saveImage";

export interface User {
  userId: number;
  token: string;
  email: string;
  username: string;
  avatar?: string | null;
}

type Ctx = {
  user: User | null;
  login: (u: User) => Promise<void>;
  logout: () => void;
  setUser: (patch: Partial<User>) => void;
};

const AuthContext = createContext<Ctx | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  const login = async (u: User) => {
    const avatar = await loadUserImage(u.userId);
    setUserState({ ...u, avatar });
    setAuthToken(u.token);
  };

  const logout = () => {
    setUserState(null);
    setAuthToken(null);
  };

  const setUser = (patch: Partial<User>) =>
    setUserState((prev) => {
      const updated = prev ? { ...prev, ...patch } : prev;
      if (updated?.token) setAuthToken(updated.token);
      return updated;
    });

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
