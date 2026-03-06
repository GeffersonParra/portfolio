"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Menu, X } from "lucide-react";

export default function Header() {
  const t = useTranslations("Navigation");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "#about", label: t("about") },
    { href: "#projects", label: t("projects") },
    { href: "#brief", label: t("brief") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className="flex justify-between items-center w-full font-family-lack py-4 md:py-6 px-6 md:px-12 lg:px-24 xl:px-32 text-2xl fixed top-0 z-50 transition-colors duration-300 border-b border-white/5 md:border-none"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <div className="flex items-center z-[60]">
        <span className="text-2xl md:text-3xl">{"{"}</span>
        <span className="text-xl md:text-2xl font-bold">GeffDev</span>
        <span className="text-2xl md:text-3xl">{"}"}</span>
      </div>
      <div className="flex items-center gap-4 lg:hidden z-[60]">
        <ThemeSwitcher />
        <button onClick={toggleMenu} className="p-2" aria-label="Toggle Menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      <div className="hidden lg:flex items-center gap-8">
        <nav className="flex gap-8 xl:gap-10 text-lg xl:text-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-300 hover:opacity-100 opacity-80"
              style={{ color: 'var(--link-color)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--link-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 border-l border-white/20 pl-6">
          <ThemeSwitcher />
          <LocaleSwitcher />
        </div>
      </div>
      <div
        className={`fixed inset-0 h-screen w-full transition-all duration-500 ease-in-out lg:hidden flex flex-col items-center justify-center gap-8 z-[50] ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <nav className="flex flex-col items-center gap-8 text-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="hover:scale-110 transition-transform"
              style={{ color: 'var(--link-color)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-8 mt-4">
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}