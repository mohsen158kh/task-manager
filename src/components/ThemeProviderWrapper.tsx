import { useMemo } from 'react';
import { ThemeProvider } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';
import { createAppTheme } from '../theme/createAppTheme';

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
  const { mode } = useTheme();
  
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;

