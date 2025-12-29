"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

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
}

interface UserContextType {
  user: User;
  updateUser: (newUser: Partial<User>) => void;
}

const defaultUser: User = {
  name: "Jubílio Maússe",
  role: "Autor • Servo de Deus • Ceifeiro na Seara",
  bio: "Servo de Deus, dedicado a trazer a mensagem de arrependimento e volta ao primeiro amor.",
  image: "https://media.licdn.com/dms/image/D4E03AQEsTASkLeM94A/profile-displayphoto-shrink_800_800/0/1692468152327?e=1715817600&v=beta&t=Z8FQ1iTDydq0gVcfuiy59diryZ-lddJ67zq1POmnJp8",
  mission: "Desejo encorajar cada leitor a lembrar-se de onde caiu e a voltar à prática das primeiras obras (Apocalipse 2:5). Minha jornada é sobre restauração e o amor incondicional de Deus, que está sempre disponível para nos receber de volta. Busco viver em plenitude espiritual e inspirar outros a terem comunhão íntima com o Pai.",
  testimony: "Em 2015, iniciei meu processo de conversão, um marco eterno em minha vida. Tive uma visão gloriosa de Jesus, onde Ele me chamou de volta para cumprir o propósito que tem para mim desde o ventre da minha mãe. Desde aquele encontro, dedico meus dias à oração, ao estudo da Palavra e a servir como instrumento em Suas mãos.",
  stats: {
    booksWritten: 4,
    livesImpacted: "1.2k+",
    daysPraying: "3,285"
  }
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);
  const [isClient, setIsClient] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    setIsClient(true);
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user profile", e);
      }
    }
  }, []);

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => {
      const updated = { ...prev, ...userData };
      localStorage.setItem("userProfile", JSON.stringify(updated));
      return updated;
    });
  };

  // Avoid hydration mismatch by rendering default or nothing until client load
  // But for simple profile data, we can just render. 
  // Ideally we show a loading spinner if we really care about flickering, 
  // but for this app it's fine to show default then swap if custom exists.

  return (
    <UserContext.Provider value={{ user, updateUser }}>
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
