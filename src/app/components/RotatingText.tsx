"use client";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

interface Props {
  items: string[];
}

export const RotatingText = ({ items }: Props) => {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const rotatingColors = [
    "#EA4335",
    "#4285F4",
    "#34A853",
    "#FBBC05",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <span
      key={index}
      className={`${theme == "dark" ? "font-family-lack-line" : "font-family-lack" } inline-block animate-word min-w-[120px] transition-colors duration-500`}
      style={{ 
        color: theme == "dark" ? "white" : rotatingColors[index % rotatingColors.length]
      }}
    >
      {items[index]}
    </span>
  );
};
