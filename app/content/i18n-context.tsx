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

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangKey>("uz");

  useEffect(() => {
    const saved = localStorage.getItem("togo-lang") as LangKey | null;
    if (saved && translations[saved]) setLangState(saved);
  }, []);

  const setLang = useCallback((l: LangKey) => {
    setLangState(l);
    localStorage.setItem("togo-lang", l);
    document.documentElement.lang = l;
    document.title = (translations[l].title as string) || "";
  }, []);

  const dict = translations[lang];
  const t = useCallback((key: string): string => {
    const v = dict[key];
    return typeof v === "string" ? v : Array.isArray(v) ? v.join(" ") : key;
  }, [dict]);

  const ta = useCallback((key: string): string[] => {
    const v = dict[key];
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
