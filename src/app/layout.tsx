import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Dhruv Jain | Aspiring Developer",
  description: "Editorial-style personal portfolio built with Next.js, Tailwind, and Framer Motion."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
