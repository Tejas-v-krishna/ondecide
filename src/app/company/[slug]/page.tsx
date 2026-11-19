"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Briefcase, Mail, Newspaper, Users } from "lucide-react";

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
    <div className="shell max-w-5xl py-16 lg:py-20">
      {/* Back Link */}
      <Link
        href="/about"
        className="mb-8 inline-flex items-center gap-1.5 text-xs text-ink-500 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3 w-3" /> Back to About Us
      </Link>

      {/* Main Grid */}
      <div className="grid items-start gap-12 md:grid-cols-[1.5fr_1fr]">
        {/* Left Informational Content */}
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="block text-2xs uppercase tracking-wider text-brand-700">{comp.tag}</span>
            <h1 className="text-display-sm font-medium text-ink">{comp.title}</h1>
            <p className="text-lg leading-relaxed text-ink-500">{comp.tagline}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-ink">Overview</h2>
            <p className="text-sm leading-relaxed text-ink-500">{comp.description}</p>
          </div>
        </div>

        {/* Right Sidebar Details */}
        <div className="space-y-6">
          <div className="card-surface flex min-h-[220px] flex-col items-center space-y-4 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface-subtle">
              <IconComponent className="h-6 w-6 text-brand-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium text-ink">{comp.title}</h3>
            <p className="max-w-[200px] text-xs text-ink-500">
              Ready to take action? Link back to the company center.
            </p>
            <Link href={comp.ctaHref} className="w-full">
              <Button className="w-full py-2.5 text-xs font-medium">{comp.ctaText}</Button>
            </Link>
          </div>

          <div className="card-surface space-y-4 p-6">
            <h4 className="text-xs uppercase tracking-wider text-ink-400">Platform Details</h4>
            <ul className="space-y-2">
              {comp.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-xs text-ink-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
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
