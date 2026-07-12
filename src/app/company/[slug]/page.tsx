"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Mail, Newspaper, Users } from "lucide-react";

interface CompanyData {
  title: string;
  tag: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  tagline: string;
  description: string;
  highlights: string[];
  ctaText: string;
  ctaHref: string;
}

const COMPANY_MAP: Record<string, CompanyData> = {
  "careers": {
    title: "Careers",
    tag: "Join Us",
    icon: Briefcase,
    tagline: "Help us shape the future of investment tools.",
    description: "We are a remote-first squad of software engineers, quantitative designers, and intelligence architects. We value autonomy, clean typography, and fast code. Review our open engineering and product roles.",
    highlights: [
      "Work remote-first from anywhere in the world.",
      "Receive competitive equity compensation plans.",
      "Access yearly learning stipends for finance and engineering."
    ],
    ctaText: "View Open Positions",
    ctaHref: "/about",
  },
  "press": {
    title: "Press Kit",
    tag: "Media",
    icon: Newspaper,
    tagline: "Corporate statements, design assets, and logos.",
    description: "Access official OnDecide corporate graphics, logo vectors, screenshots, and guidelines for editorial or media releases.",
    highlights: [
      "Download clean PNG/SVG brand logo packets.",
      "Access founder bios and executive summaries.",
      "Review platform launch press releases."
    ],
    ctaText: "Contact PR Team",
    ctaHref: "/about",
  },
  "team": {
    title: "Meet the Team",
    tag: "Core Team",
    icon: Users,
    tagline: "The builders behind the AI investment research workspace.",
    description: "Our leadership brings decades of collective experience from Citadel, Goldman Sachs, DeepMind, AQR, and Two Sigma to construct verified, scalable intelligence chains.",
    highlights: [
      "Sarah Jenkins (Co-Founder & CEO - AQR, Goldman)",
      "Dr. Alex Chen (Chief AI Architect - DeepMind, OpenAI)",
      "Marcus Vance (Head of Quant Strategy - Two Sigma, Citadel)"
    ],
    ctaText: "Read Our Story",
    ctaHref: "/about",
  },
  "contact": {
    title: "Contact Us",
    tag: "Support",
    icon: Mail,
    tagline: "Got questions? We have answers.",
    description: "Reach out to our sales team for enterprise quant feeds, or submit support tickets directly to our engineering desk.",
    highlights: [
      "General Inquiry: hello@ondecide.com",
      "Institutional Sales: sales@ondecide.com",
      "API Integrations Support: api@ondecide.com"
    ],
    ctaText: "Open Contact Form",
    ctaHref: "/about",
  },
};

export default function CompanyDetailPage({ params }: { params: { slug: string } }) {
  const comp = COMPANY_MAP[params.slug];

  if (!comp) {
    notFound();
  }

  const IconComponent = comp.icon;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Back Link */}
      <Link href="/about" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors mb-8 font-sans">
        <ArrowRight className="w-3 h-3 rotate-180" /> Back to About Us
      </Link>

      {/* Main Grid */}
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 items-start">
        {/* Left Informational Content */}
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="text-2xs text-zinc-500 font-sans tracking-wider uppercase block">{comp.tag}</span>
            <h1 className="text-4xl sm:text-5xl font-serif text-white">{comp.title}</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">{comp.tagline}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-serif text-white">Overview</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">{comp.description}</p>
          </div>
        </div>

        {/* Right Sidebar Details */}
        <div className="space-y-6">
          <div className="border border-zinc-800 bg-zinc-950 rounded-lg p-6 flex flex-col items-center text-center space-y-4 min-h-[220px]">
            <div className="w-12 h-12 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-white stroke-1" />
            </div>
            <h3 className="text-lg font-serif text-white">{comp.title}</h3>
            <p className="text-xs text-zinc-500 max-w-[200px]">
              Ready to take action? Link back to the company center.
            </p>
            <Link href={comp.ctaHref} className="w-full">
              <Button className="w-full bg-zinc-100 hover:bg-white text-black text-xs font-semibold py-2.5 rounded transition-colors">
                {comp.ctaText}
              </Button>
            </Link>
          </div>

          <div className="border border-zinc-850 p-6 rounded space-y-4">
            <h4 className="text-xs text-zinc-500 font-sans tracking-wider uppercase">Platform Details</h4>
            <ul className="space-y-2">
              {comp.highlights.map((h) => (
                <li key={h} className="text-xs text-zinc-300 font-sans flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
