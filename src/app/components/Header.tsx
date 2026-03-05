"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Header() {
  const t = useTranslations("Navigation");
  return (
    <header
      className="flex justify-between w-full font-family-lack py-6 pl-36 pr-32 text-2xl fixed z-50 transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <div className="flex items-center"><span className="text-3xl">{"{"}</span>{`GeffDev`}<span className="text-3xl">{"}"}</span></div>
      <div className="flex items-center gap-6">
        <nav className="flex gap-10 text-xl">
          <Link href="/" className="transition-colors duration-500 hover:opacity-100" style={{ color: 'var(--link-color)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--link-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
          >
            {t("home")}
          </Link>
          <Link href="#about" className="transition-colors duration-500" style={{ color: 'var(--link-color)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--link-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
          >
            {t("about")}
          </Link>
          <Link href="#projects" className="transition-colors duration-500" style={{ color: 'var(--link-color)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--link-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
          >
            {t("projects")}
          </Link>
          <Link href="#brief" className="transition-colors duration-500" style={{ color: 'var(--link-color)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--link-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
          >
            {t("brief")}
          </Link>
          <Link href="#contact" className="transition-colors duration-500" style={{ color: 'var(--link-color)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--link-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
          >
            {t("contact")}
          </Link>
        </nav>
        <ThemeSwitcher />
        <LocaleSwitcher />
      </div>
    </header>
  );
};
