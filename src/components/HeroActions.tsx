"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function HeroActions() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dark = mounted && theme === "dark";

  const primaryClass = dark
    ? "bg-[#E5E5E5] text-[#121212] hover:bg-[#121212] hover:text-[#E5E5E5]"
    : "bg-[#121212] text-white hover:bg-white hover:text-[#121212]";

  const secondaryClass = dark
    ? "border border-[#3a3a3a] bg-[#0f0f0f] text-[#E5E5E5] hover:bg-white hover:text-[#121212]"
    : "border border-[#cfcfcf] bg-[#f8f5f0] text-[#121212] hover:bg-[#121212] hover:text-white";

  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
      <motion.a
        href="/resume"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.99 }}
        className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${primaryClass}`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M7 3h7l5 5v13H7z" />
          <path d="M14 3v6h6" />
        </svg>
        <span>Resume</span>
      </motion.a>

      <motion.a
        href="mailto:dhruvjain632@gmail.com"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.99 }}
        className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${secondaryClass}`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m22 2-7 20-4-9-9-4z" />
          <path d="M22 2 11 13" />
        </svg>
        <span>Get in touch</span>
      </motion.a>
    </div>
  );
}
