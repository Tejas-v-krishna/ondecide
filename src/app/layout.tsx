import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OnDecide — AI Investment Research",
  description:
    "Research-grade investment analysis in plain English. AI-powered reports covering financials, news, qualitative factors, and actionable insights.",
  keywords: "investment research, stock analysis, AI finance, portfolio management",
  openGraph: {
    title: "OnDecide — AI Investment Research",
    description: "Research-grade investment analysis in plain English.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Gate Clerk: only wrap when a real publishable key exists. With placeholder
  // demo keys Clerk's client session-refresh loops on every load and stalls hydration.
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const clerkEnabled = !!clerkKey && !clerkKey.includes("placeholder");

  const tree = (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="bg-paper text-ink-700 antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );

  return clerkEnabled ? <ClerkProvider>{tree}</ClerkProvider> : tree;
}
