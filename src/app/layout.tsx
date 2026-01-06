import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SearchProvider } from "@/context/SearchContext";

import { Providers } from "@/components/Providers";

const inter = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leitor de Livros",
  description: "Uma experiência premium de leitura de livros",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

