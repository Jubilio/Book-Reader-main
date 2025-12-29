import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { SettingsProvider } from "@/context/SettingsContext";

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
    <html lang="pt-BR">
      <body className={inter.className}>
        <SettingsProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
