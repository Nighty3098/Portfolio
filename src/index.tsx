import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { I18nProvider } from './context/I18nContext';
import { ThemeProvider } from './context/ThemeContext';
import reportWebVitals from './reportWebVitals';

const RESIZE_OBSERVER_LOOP_ERRORS = [
  'ResizeObserver loop completed with undelivered notifications',
  'ResizeObserver loop limit exceeded',
];

window.addEventListener(
  'error',
  (event) => {
    if (RESIZE_OBSERVER_LOOP_ERRORS.some((m) => event.message.includes(m))) {
      event.stopImmediatePropagation();
    }
  },
  true,
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
