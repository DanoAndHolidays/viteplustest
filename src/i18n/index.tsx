import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { en } from "./en";
import type { TranslationKeys } from "./en";
import { zh } from "./zh";

export type Locale = "en" | "zh";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const translations: Record<Locale, any> = { en, zh };

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<TranslationKeys>;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getNestedValue(obj: unknown, path: string): string {
  const keys = path.split(".");
  let result: unknown = obj;
  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path; // Return key as fallback
    }
  }
  return typeof result === "string" ? result : path;
}

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function I18nProvider({ children, initialLocale = "en" }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const t = useCallback(
    (key: TranslationKey): string => {
      const translation = getNestedValue(translations[locale], key);
      // Check if there are interpolation params like {count}
      if (translation.includes("{") && translation.match(/\{(\w+)\}/)) {
        // For now, return as-is; params would be passed separately
        return translation;
      }
      return translation;
    },
    [locale],
  );

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

// Utility function for time formatting
export function formatTime(date: Date, t: (key: string) => string): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return t("time.justNow");
  if (diffMins < 60) return t("time.minutesAgo").replace("{count}", String(diffMins));
  if (diffHours < 24) return t("time.hoursAgo").replace("{count}", String(diffHours));
  if (diffHours < 48) return t("time.yesterday");

  return date.toLocaleDateString();
}
