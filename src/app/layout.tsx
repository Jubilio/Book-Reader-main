import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { SettingsProvider } from "@/context/SettingsContext";

const inter = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Reader App",
  description: "A premium book reading experience",
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
    <html lang="en">
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
