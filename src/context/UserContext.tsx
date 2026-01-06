"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";

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
  loading: boolean;
}

const defaultUser: User = {
  name: "Jubílio Maússe",
  role: "Autor • Servo de Deus • Mentor Espiritual",
  bio: "Servo de Deus, dedicado a guiar almas no caminho da restauração e do primeiro amor.",
  image: "/profile.jpg",
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
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>(defaultUser);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    // Only fetch if session is authenticated
    if (status !== "authenticated") return;

    try {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        const userRole = (session?.user as any)?.role || 'USER';
        setUser(prev => ({ 
          ...prev, 
          ...data, 
          isAdmin: userRole === 'ADMIN' 
        }));
      }
    } catch (e) {
      console.error("Failed to fetch profile from backend", e);
    } finally {
      setLoading(false);
    }
  }, [status, session]);

  useEffect(() => {
    if (status === "authenticated") {
      refreshUser();
      setIsAdmin((session?.user as any)?.role === 'ADMIN');
    } else if (status === "unauthenticated") {
      setUser(defaultUser);
      setIsAdmin(false);
      setLoading(false);
    }
  }, [status, session, refreshUser]);

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
    <UserContext.Provider value={{ user, updateUser, setAdmin, refreshUser, loading }}>
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
