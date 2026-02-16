"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name: string;
  joined: string;
  kycStatus: "pending" | "submitted" | "verified";
  kycDocuments?: {
    idDocument?: string;
    proofOfAddress?: string;
    selfie?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateKycStatus: (status: User["kycStatus"], documents?: User["kycDocuments"]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("gb_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("gb_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Test mode: accept any email/password with basic validation
    if (!email || !password || password.length < 4) return false;

    const stored = localStorage.getItem("gb_users");
    let users: Record<string, { name: string; password: string }> = {};
    try {
      users = stored ? JSON.parse(stored) : {};
    } catch {}

    const existing = users[email];
    if (existing && existing.password !== password) return false;

    const userData: User = {
      email,
      name: existing?.name || email.split("@")[0],
      joined: new Date().toISOString(),
      kycStatus: "pending",
    };

    localStorage.setItem("gb_user", JSON.stringify(userData));
    setUser(userData);
    setShowAuthModal(false);
    return true;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    if (!name || !email || !password || password.length < 4) return false;

    const stored = localStorage.getItem("gb_users");
    let users: Record<string, { name: string; password: string }> = {};
    try {
      users = stored ? JSON.parse(stored) : {};
    } catch {}

    users[email] = { name, password };
    localStorage.setItem("gb_users", JSON.stringify(users));

    const userData: User = {
      email,
      name,
      joined: new Date().toISOString(),
      kycStatus: "pending",
    };

    localStorage.setItem("gb_user", JSON.stringify(userData));
    setUser(userData);
    setShowAuthModal(false);
    return true;
  };

  const updateKycStatus = (status: User["kycStatus"], documents?: User["kycDocuments"]) => {
    if (!user) return;
    const updatedUser = { ...user, kycStatus: status, kycDocuments: documents || user.kycDocuments };
    localStorage.setItem("gb_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem("gb_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, showAuthModal, setShowAuthModal, login, signup, logout, updateKycStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
