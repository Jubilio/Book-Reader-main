import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";

const inter = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Reader App",
  description: "A premium book reading experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
