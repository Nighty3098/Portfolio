import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import en from "../locales/en.json";
import ru from "../locales/ru.json";

type Locale = "en" | "ru";
type Translations = Record<string, unknown>;

const translations: Record<Locale, Translations> = { en, ru };

function getNestedValue(obj: Translations, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function interpolate(str: string, params?: Record<string, string | number>): string {
  if (!params) return str;
  return str.replace(/\{\{(.+?)\}\}/g, (_, key) => {
    const k = (key as string).trim();
    return params[k] !== undefined ? String(params[k]) : `{{${k}}}`;
  });
}

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  tt: (key: string) => unknown;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = "portfolio_locale";

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    return saved === "en" || saved === "ru" ? saved : "en";
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  }, []);

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const value = getNestedValue(translations[locale], key);
    if (typeof value === "string") {
      return interpolate(value, params);
    }
    return key;
  }, [locale]);

  const tt = useCallback((key: string): unknown => {
    return getNestedValue(translations[locale], key);
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tt }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useTranslate() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useTranslate must be used within I18nProvider");
  }
  return ctx;
}
