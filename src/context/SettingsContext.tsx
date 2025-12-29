"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'sepia';
export type FontFamily = 'serif' | 'sans';
export type LineHeight = 'normal' | 'comfortable' | 'wide';
export type TextAlign = 'left' | 'justify';
export type TextWidth = 'narrow' | 'medium' | 'wide';

interface ReadingSettings {
    theme: Theme;
    fontSize: number;
    fontFamily: FontFamily;
    lineHeight: LineHeight;
    textAlign: TextAlign;
    textWidth: TextWidth;
}

const defaultSettings: ReadingSettings = {
    theme: 'light',
    fontSize: 18,
    fontFamily: 'serif',
    lineHeight: 'comfortable',
    textAlign: 'left',
    textWidth: 'medium',
};

interface SettingsContextType {
    settings: ReadingSettings;
    updateSettings: (newSettings: Partial<ReadingSettings>) => void;
    resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<ReadingSettings>(defaultSettings);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('reading-settings');
        if (saved) {
            try {
                setSettings({ ...defaultSettings, ...JSON.parse(saved) });
            } catch (e) {
                console.error("Failed to parse settings", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever settings change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('reading-settings', JSON.stringify(settings));
            applyTheme(settings.theme);
        }
    }, [settings, isLoaded]);

    const applyTheme = (theme: Theme) => {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
    };

    const updateSettings = (newSettings: Partial<ReadingSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const resetSettings = () => {
        setSettings(defaultSettings);
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
