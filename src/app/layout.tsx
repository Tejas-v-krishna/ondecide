import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { StockAsciiArt } from "@/components/ui/StockAsciiArt";
import { InkGardenArt } from "@/components/ui/InkGardenArt";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
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
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="bg-black text-zinc-300 antialiased min-h-screen flex flex-col selection:bg-zinc-800 selection:text-white">
        <StockAsciiArt opacity={0.15} />
        <InkGardenArt opacity={0.15} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );

  return clerkEnabled ? <ClerkProvider>{tree}</ClerkProvider> : tree;
}
