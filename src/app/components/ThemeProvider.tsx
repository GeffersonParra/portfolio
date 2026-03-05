"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    const initial = saved || preferred;
    setTheme(initial);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(initial);
    setMounted(true);
  }, []);

  const toggleTheme = useCallback((e?: React.MouseEvent) => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    const x = e ? e.clientX : window.innerWidth - 80;
    const y = e ? e.clientY : 30;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    if (document.startViewTransition) {
      document.documentElement.style.setProperty("--reveal-x", `${x}px`);
      document.documentElement.style.setProperty("--reveal-y", `${y}px`);
      document.documentElement.style.setProperty("--reveal-radius", `${maxRadius}px`);
      const transition = document.startViewTransition(() => {
        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(newTheme);
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
      });
      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(newTheme);
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  }, [theme]);
  if (!mounted) {
    return (
      <div style={{ visibility: "hidden" }}>
        {children}
      </div>
    );
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
