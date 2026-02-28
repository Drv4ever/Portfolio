"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const dark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border-light bg-paper-light text-xs uppercase tracking-editorial transition-colors duration-300 hover:bg-ink-light hover:text-paper-light dark:border-border-dark dark:bg-paper-dark dark:hover:bg-ink-dark dark:hover:text-paper-dark md:right-8 md:top-6"
      aria-label="Toggle theme"
    >
      <span aria-hidden="true">{dark ? "☀" : "☾"}</span>
    </motion.button>
  );
}
