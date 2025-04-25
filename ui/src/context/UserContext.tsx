"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLoginMutation, useMeQuery } from "@/generated/graphql";

export type User = {
  id: string;
  email: string;
  admin: boolean;
  balancePoints: number;
};

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loginMutation] = useLoginMutation();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { data } = useMeQuery({ skip: !token });

  useEffect(() => {
    if (token) {
      if (!data?.me) {
        return;
      }
      setUser({
        id: data.me.id,
        email: data.me.email,
        admin: data.me.role == "admin",
        balancePoints: data.me.balancePoints,
      });
    }
  }, [token, data]);

  // Accept either (email, password) for legacy or (user: User) for direct set
  const login = async (email: string, password: string) => {
    const { data } = await loginMutation({ variables: { email, password } });
    if (data?.login?.token && data?.login?.user) {
      // Store token (for example, in localStorage)
      localStorage.setItem("token", data.login.token);
      // Set user context (mapping GraphQL fields to UserContext type)
      setUser({
        id: data.login.user.id,
        email: data.login.user.email,
        admin: data.login.user.role == "admin",
        balancePoints: data.login.user.balancePoints,
      });
    } else {
      throw new Error("Invalid email or password");
    }
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
