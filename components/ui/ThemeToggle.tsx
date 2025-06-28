"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const [mode, setMode] = React.useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });

  React.useEffect(() => {
    setMounted(true);
    // On mount, set theme from localStorage
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setMode('dark');
    } else if (saved === "light") {
      document.documentElement.classList.remove("dark");
      setMode('light');
    }
  }, []);

  const handleChange = (val: string) => {
    if (val === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setMode('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setMode('light');
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2">
  {mode === "light" ? (
    <Sun className="w-5 h-5 text-primary transition-colors" aria-hidden="true" />
  ) : (
    <Moon className="w-5 h-5 text-primary transition-colors" aria-hidden="true" />
  )}
  <Switch
    checked={mode === "dark"}
    onCheckedChange={checked => handleChange(checked ? "dark" : "light")}
    aria-label="Toggle theme"
    className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
  />
</div>
  );
}
