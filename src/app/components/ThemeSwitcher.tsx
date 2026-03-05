"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
        <div className="w-[84px] h-[34px] rounded-full border border-transparent bg-transparent" />
    );
  }
  return (
    <button
      onClick={(e) => toggleTheme(e)}
      className="group flex items-center gap-2 border px-3 py-1.5 rounded-full transition-all cursor-pointer
        border-white/20 hover:border-white bg-white/5
        light:border-black/15 light:hover:border-violet-500 light:bg-violet-50"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        backgroundColor: 'var(--switcher-bg)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--switcher-border)',
      }}
    >
      <div className="relative w-5 h-5">
        <Sun
          size={18}
          className={`absolute inset-0 transition-all duration-500 
            ${theme === "light" 
              ? "opacity-100 rotate-0 text-amber-500" 
              : "opacity-0 rotate-90 text-gray-400"
            }`}
        />
        <Moon
          size={18}
          className={`absolute inset-0 transition-all duration-500 
            ${theme === "dark" 
              ? "opacity-100 rotate-0 text-gray-400 group-hover:text-white" 
              : "opacity-0 -rotate-90 text-violet-500"
            }`}
        />
      </div>
    </button>
  );
};