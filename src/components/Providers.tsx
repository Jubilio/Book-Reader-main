"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { UserProvider } from "@/context/UserContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { SearchProvider } from "@/context/SearchContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <SettingsProvider>
          <UserProvider>
            <SidebarProvider>
              <SearchProvider>
                {children}
              </SearchProvider>
            </SidebarProvider>
          </UserProvider>
        </SettingsProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
