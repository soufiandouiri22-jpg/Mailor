import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "../../public/fonts/Inter-variable.ttf",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMono-variable.ttf",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "100 900",
});

// Favicons: `src/app/icon.png` + `src/app/apple-icon.png` (Next file convention).
// Generated from `public/images/mailor-logo.png` with square letterboxing (`npm run favicon`).
export const metadata: Metadata = {
  title: "Mailor | Your agent for personalized email",
  description:
    "Powering personalized outreach at scale. From emails written specifically for each recipient to automated sending, follow-ups, and performance optimization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
