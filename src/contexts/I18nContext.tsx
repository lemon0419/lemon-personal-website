import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Locale } from '@/lib/i18n';

interface I18nContextType {
  locale: Locale;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem('locale');
    return (saved === 'en' ? 'en' : 'zh') as Locale;
  });

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === 'zh' ? 'en' : 'zh';
      localStorage.setItem('locale', next);
      return next;
    });
  }, []);

  return (
    <I18nContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}