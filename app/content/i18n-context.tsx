"use client";
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { translations, type LangKey, type TranslationDict } from "./translations";

interface I18nContextType {
  lang: LangKey;
  setLang: (l: LangKey) => void;
  t: (key: string) => string;
  ta: (key: string) => string[];
  dict: TranslationDict;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children, initialLang = "uz" }: { children: ReactNode; initialLang?: LangKey }) {
  const [lang, setLangState] = useState<LangKey>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const setLang = useCallback((l: LangKey) => {
    setLangState(l);
  }, []);

  const safeLang = translations[lang] ? lang : "uz";
  const dict = translations[safeLang] || translations.uz;

  const t = useCallback((key: string): string => {
    const v = dict ? dict[key] : undefined;
    return typeof v === "string" ? v : Array.isArray(v) ? v.join(" ") : key;
  }, [dict]);

  const ta = useCallback((key: string): string[] => {
    const v = dict ? dict[key] : undefined;
    return Array.isArray(v) ? v : [typeof v === "string" ? v : key];
  }, [dict]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, ta, dict }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useLang must be used within I18nProvider");
  return ctx;
}
