import { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  userId: number;
  token: string;
  email: string;
  username: string;
}

type Ctx = {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
  setUser: (patch: Partial<User>) => void;
};

const AuthContext = createContext<Ctx | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  const login = (u: User) => setUserState(u);
  const logout = () => setUserState(null);
  const setUser = (patch: Partial<User>) =>
    setUserState((prev) => (prev ? { ...prev, ...patch } : prev));

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
