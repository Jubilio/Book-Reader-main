"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

interface UserStats {
  booksWritten: number;
  livesImpacted: string;
  daysPraying: string;
}

export interface User {
  name: string;
  role: string;
  bio: string;
  image: string;
  mission: string;
  testimony: string;
  stats: UserStats;
  isAdmin?: boolean;
}

interface UserContextType {
  user: User;
  updateUser: (newUser: Partial<User>, password?: string) => Promise<{ success: boolean; error?: string }>;
  setAdmin: (isAdmin: boolean) => void;
  refreshUser: () => Promise<void>;
}

const defaultUser: User = {
  name: "Jubílio Maússe",
  role: "Autor • Servo de Deus • Mentor Espiritual",
  bio: "Servo de Deus, dedicado a guiar almas no caminho da restauração e do primeiro amor.",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=400&h=400",
  mission: "Encorajar leitores à restauração espiritual e ao aprofundamento da comunhão com o Criador através da Palavra.",
  testimony: "Minha jornada começou em 2015, após um encontro transformador com a Graça.",
  stats: {
    booksWritten: 5,
    livesImpacted: "5.0k+",
    daysPraying: "3,450"
  },
  isAdmin: false
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);
  const [isAdmin, setIsAdmin] = useState(false);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        setUser(prev => ({ ...prev, ...data, isAdmin }));
      }
    } catch (e) {
      console.error("Failed to fetch profile from backend", e);
    }
  }, [isAdmin]);

  useEffect(() => {
    refreshUser();
    // Also check local storage for admin session persistence (simulated)
    const adminSession = localStorage.getItem("isAdmin") === "true";
    if (adminSession) {
      setIsAdmin(true);
      setUser(prev => ({ ...prev, isAdmin: true }));
    }
  }, [isAdmin, refreshUser]);

  const updateUser = async (userData: Partial<User>, password?: string) => {
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, profile: { ...user, ...userData } })
      });
      
      const result = await res.json();
      if (res.ok) {
        setUser(prev => ({ ...prev, ...result, isAdmin }));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (e) {
      return { success: false, error: "Conexão com o servidor falhou." };
    }
  };

  const setAdmin = (val: boolean) => {
    setIsAdmin(val);
    localStorage.setItem("isAdmin", val ? "true" : "false");
    setUser(prev => ({ ...prev, isAdmin: val }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, setAdmin, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
