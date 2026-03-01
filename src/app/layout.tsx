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
  description: "A developer building intelligent web products with React, Node.js, and MongoDB.",
  metadataBase: new URL("https://your-portfolio-domain.vercel.app"),
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  openGraph: {
    title: "Dhruv Jain | Aspiring Developer",
    description: "A developer building intelligent web products with React, Node.js, and MongoDB.",
    url: "https://your-portfolio-domain.vercel.app",
    siteName: "Dhruv Jain Portfolio",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Dhruv Jain Portfolio Preview"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Jain | Aspiring Developer",
    description: "A developer building intelligent web products with React, Node.js, and MongoDB.",
    images: ["/og-image.svg"]
  }
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
