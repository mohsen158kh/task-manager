import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { store } from './store';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';
import ThemeProviderWrapper from './components/ThemeProviderWrapper';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <ThemeProviderWrapper>
          <CssBaseline />
          <App />
        </ThemeProviderWrapper>
      </CustomThemeProvider>
    </Provider>
  </React.StrictMode>
);

