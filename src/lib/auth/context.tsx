"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { UserRole } from "@/types";

interface AuthUser {
  email: string;
  name: string;
  role: UserRole;
  ministry_id: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: () => {},
});

// Mock user database — in production this would be Supabase Auth
const MOCK_USERS: Record<string, { password: string; user: AuthUser }> = {
  "admin@moice.gov.sl": {
    password: "admin123",
    user: {
      email: "admin@moice.gov.sl",
      name: "Admin User",
      role: "admin",
      ministry_id: "m5",
    },
  },
  "contributor@mohs.gov.sl": {
    password: "contributor123",
    user: {
      email: "contributor@mohs.gov.sl",
      name: "Dr. Koroma",
      role: "contributor",
      ministry_id: "m1",
    },
  },
};

const AUTH_STORAGE_KEY = "moice_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
    setIsLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const entry = MOCK_USERS[email];
    if (!entry || entry.password !== password) {
      return { success: false, error: "Invalid credentials. Use the demo accounts shown below." };
    }
    setUser(entry.user);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(entry.user));
    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
