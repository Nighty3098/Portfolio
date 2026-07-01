import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { I18nProvider } from './context/I18nContext';
import { ThemeProvider } from './context/ThemeContext';
import LenisProvider from './components/lenisProvider';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <LenisProvider>
          <App />
        </LenisProvider>
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
