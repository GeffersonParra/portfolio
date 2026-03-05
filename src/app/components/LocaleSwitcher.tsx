"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Languages } from 'lucide-react';

export const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';
    router.replace(pathname, { locale: nextLocale, scroll: false });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all cursor-pointer"
      style={{
        backgroundColor: 'var(--switcher-bg)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--switcher-border)',
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--switcher-border-hover)'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--switcher-border)'}
      title={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <Languages size={18} className="group-hover:rotate-12 transition-transform" style={{ color: 'var(--text-muted)' }} />
      <div className="flex font-lack text-sm font-medium tracking-wider transition-all duration-1000">
        <span style={{ color: locale === 'en' ? 'var(--text-primary)' : 'var(--text-muted)' }}>EN</span>
        <span className="mx-1" style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ color: locale === 'es' ? 'var(--text-primary)' : 'var(--text-muted)' }}>ES</span>
      </div>
    </button>
  );
};