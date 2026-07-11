import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/ui/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
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
      <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <body className="bg-navy-900 text-slate-100 antialiased min-h-screen">
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
