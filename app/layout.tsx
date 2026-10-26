import type { Metadata } from "next";
import { Inter, Bitter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
});

/**
 * Root layout — the app shell only.
 *
 * Project convention:
 * - No site chrome (Navbar/Footer) here; that belongs to app/(site)/layout.tsx
 * - The /admin area will get its own chrome in its own layout/route group
 * - Fonts are loaded once here via next/font (zero layout shift)
 */
export const metadata: Metadata = {
  title: {
    default: "Uttara Adhunik Medical College",
    template: "%s | Uttara Adhunik Medical College",
  },
  description:
    "Uttara Adhunik Medical College — official website. Content is finalized with the approved Figma design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bitter.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
