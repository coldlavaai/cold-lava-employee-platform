"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
  company: {
    id: string;
    name: string;
    subdomain: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

interface SignupData {
  companyName: string;
  subdomain: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo
const DEMO_USER: User = {
  id: "1",
  email: "harry@lcb.co.uk",
  name: "Harry Bennett",
  company: {
    id: "1",
    name: "LCB",
    subdomain: "lcb",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("cl_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Replace with real Supabase auth
    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // For demo, accept any login and use demo user
    const loggedInUser = { ...DEMO_USER, email };
    setUser(loggedInUser);
    localStorage.setItem("cl_user", JSON.stringify(loggedInUser));
    
    setLoading(false);
  };

  const signup = async (data: SignupData) => {
    // TODO: Replace with real Supabase auth
    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Create new user
    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      company: {
        id: crypto.randomUUID(),
        name: data.companyName,
        subdomain: data.subdomain,
      },
    };
    
    setUser(newUser);
    localStorage.setItem("cl_user", JSON.stringify(newUser));
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cl_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
