
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Theme, ThemeDefinition } from './types';
import { getThemeDefinition } from '../themes';

interface ThemeContextType {
    currentThemeDefinition: ThemeDefinition;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize with a default theme (e.g., Sonic as per current fallback)
    const [currentThemeDefinition, setCurrentThemeDefinition] = useState<ThemeDefinition>(
        getThemeDefinition(Theme.SONIC)
    );

    const setTheme = (themeName: Theme) => {
        const newDefinition = getThemeDefinition(themeName);
        setCurrentThemeDefinition(newDefinition);
    };

    return (
        <ThemeContext.Provider value={{ currentThemeDefinition, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
