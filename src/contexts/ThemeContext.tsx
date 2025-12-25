import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'task-manager-theme-mode';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
    return savedMode === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = () => {
    setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

