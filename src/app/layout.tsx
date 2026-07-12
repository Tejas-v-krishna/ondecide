import type { Metadata } from "next";
import { Outfit, Hedvig_Letters_Serif } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});



const hedvigSerif = Hedvig_Letters_Serif({
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
  return (
    <ClerkProvider>
      <html lang="en" className={`${outfit.variable} ${hedvigSerif.variable}`}>
        <body className="bg-black text-zinc-300 antialiased min-h-screen flex flex-col selection:bg-zinc-800 selection:text-white">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
