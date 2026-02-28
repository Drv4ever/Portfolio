import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          light: "#f8f5f0",
          dark: "#0f0f0f"
        },
        ink: {
          light: "#161616",
          dark: "#eaeaea"
        },
        border: {
          light: "#d7d2ca",
          dark: "#2e2e2e"
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"]
      },
      letterSpacing: {
        editorial: "0.08em"
      }
    }
  },
  plugins: []
};

export default config;
