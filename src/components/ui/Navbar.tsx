"use client";

import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SearchBar } from "./SearchBar";
import { MenuIcon, XIcon, Play } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MenuItem {
  title: string;
  href: string;
}

interface MenuSection {
  label: string;
  items: MenuItem[];
}

interface MegaMenuConfig {
  trigger: string;
  sections: MenuSection[];
  graphic: {
    title: string;
    description: string;
    tag?: string;
  };
}

const PRODUCT_MENU: MegaMenuConfig = {
  trigger: "Product",
  sections: [
    {
      label: "Platform",
      items: [
        { title: "Explore Assets", href: "/explore" },
        { title: "Portfolio Tracker", href: "/portfolio" },
        { title: "Watchlist Analyzer", href: "/watchlist" },
        { title: "Live Market Data", href: "/explore" },
        { title: "Glossary Hub", href: "/glossary" },
        { title: "Agent Synthesizer", href: "/agents" },
      ],
    },
    {
      label: "Skills",
      items: [
        { title: "Pull Financial Ratios", href: "/skills/financial-ratios" },
        { title: "Read News Sentiment", href: "/skills/news-sentiment" },
        { title: "Analyze Technical Signals", href: "/skills/technical-signals" },
        { title: "Qualitative Synthesis", href: "/skills/qualitative-synthesis" },
        { title: "Historical Pattern Search", href: "/skills/historical-patterns" },
        { title: "Form Thesis", href: "/skills/form-thesis" },
      ],
    },
  ],
  graphic: {
    tag: "AI Agents",
    title: "Introducing AI Investment Agents",
    description: "How OnDecide synthesizes research-grade reports in under 60 seconds.",
  },
};

const SOLUTIONS_MENU: MegaMenuConfig = {
  trigger: "Solutions",
  sections: [
    {
      label: "Audiences",
      items: [
        { title: "Retail Traders", href: "/solutions/retail-traders" },
        { title: "Family Offices", href: "/solutions/family-offices" },
        { title: "Wealth Advisors", href: "/solutions/wealth-advisors" },
        { title: "Hedge Funds", href: "/solutions/hedge-funds" },
        { title: "Quantitative Analysts", href: "/solutions/quant-analysts" },
      ],
    },
    {
      label: "Use Cases",
      items: [
        { title: "Equity Screening", href: "/explore" },
        { title: "Portfolio Modeling", href: "/portfolio" },
        { title: "Technical Analysis", href: "/explore" },
        { title: "Macro Indicators", href: "/explore" },
        { title: "Due Diligence", href: "/solutions/due-diligence" },
      ],
    },
  ],
  graphic: {
    tag: "Thesis",
    title: "Instant Thesis Generator",
    description: "Build conviction on any trade using real-time agent chains.",
  },
};

const RESOURCES_MENU: MegaMenuConfig = {
  trigger: "Resources",
  sections: [
    {
      label: "Learn",
      items: [
        { title: "Platform Guide", href: "/resources/platform-guide" },
        { title: "Financial Glossary", href: "/glossary" },
        { title: "Research Methodology", href: "/resources/methodology" },
        { title: "FAQ", href: "/resources/faq" },
        { title: "Video Tutorials", href: "/resources/tutorials" },
      ],
    },
    {
      label: "Updates & Security",
      items: [
        { title: "Changelog", href: "/resources/changelog" },
        { title: "API Partners", href: "/resources/partners" },
        { title: "Trust Center", href: "/legal" },
        { title: "Security Protocols", href: "/trust/privacy" },
        { title: "Contact Support", href: "/company/contact" },
      ],
    },
  ],
  graphic: {
    tag: "Knowledge Base",
    title: "Financial Knowledge Hub",
    description: "Demystifying quantitative metrics and institutional-grade indicators.",
  },
};

const COMPANY_MENU: MegaMenuConfig = {
  trigger: "Company",
  sections: [
    {
      label: "Company",
      items: [
        { title: "About Us", href: "/about" },
        { title: "Careers", href: "/company/careers" },
        { title: "Press Kit", href: "/company/press" },
        { title: "Meet the Team", href: "/company/team" },
        { title: "Contact", href: "/company/contact" },
      ],
    },
    {
      label: "Trust",
      items: [
        { title: "Privacy Policy", href: "/trust/privacy" },
        { title: "Terms of Service", href: "/trust/terms" },
        { title: "Security Disclaimers", href: "/trust/disclaimers" },
        { title: "Data Partners", href: "/trust/data-partners" },
      ],
    },
  ],
  graphic: {
    tag: "Design",
    title: "True-Black Design System",
    description: "Read more about our minimal, high-aesthetic design philosophy.",
  },
};

export function Navbar() {
  return (
    <nav className="sticky top-4 z-[100] mx-auto h-16 w-full max-w-5xl border border-zinc-800 bg-black/80 backdrop-blur-md px-6 rounded-lg flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 bg-white flex items-center justify-center">
            <span className="text-black text-xs font-bold font-sans">O</span>
          </div>
          <span className="text-white font-serif text-xl tracking-tight">
            OnDecide
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <DesktopMenu />
      </div>

      {/* Middle: Desktop Search */}
      <div className="hidden md:block flex-1 max-w-xs mx-4">
        <SearchBar />
      </div>

      {/* Right: Auth / Buttons */}
      <div className="flex items-center gap-3">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link
            href="/sign-in"
            className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5 font-sans"
          >
            Log in
          </Link>
          <Link href="/sign-up" className="hidden sm:block">
            <Button variant="default" className="bg-white hover:bg-zinc-200 text-black px-4 py-1.5 h-auto text-sm font-medium rounded">
              Get started
            </Button>
          </Link>
        </SignedOut>

        {/* Mobile Navigation Trigger */}
        <MobileNav />
      </div>
    </nav>
  );
}

function DesktopMenu() {
  const menus = [PRODUCT_MENU, SOLUTIONS_MENU, RESOURCES_MENU, COMPANY_MENU];

  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList className="gap-2">
        {menus.map((menu) => (
          <NavigationMenuItem key={menu.trigger}>
            <NavigationMenuTrigger className="px-3 py-1.5 text-sm hover:text-white transition-colors">
              {menu.trigger}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <GsapMegaMenuContent menu={menu} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function GsapMegaMenuContent({ menu }: { menu: MegaMenuConfig }) {
  const container = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray('.gsap-stagger-item', container.current);
      gsap.fromTo(
        items,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="grid w-[800px] grid-cols-[1.2fr_1.2fr_1fr] bg-black border border-zinc-800 rounded-lg p-6"
    >
      {/* Left Columns */}
      {menu.sections.map((section) => (
        <div key={section.label} className="space-y-4">
          <span className="gsap-stagger-item text-2xs text-zinc-500 font-sans tracking-wider uppercase block opacity-0">
            {section.label}
          </span>
          <ul className="space-y-2">
            {section.items.map((item) => (
              <li key={item.title} className="gsap-stagger-item opacity-0">
                <Link href={item.href} passHref legacyBehavior>
                  <NavigationMenuLink className="text-sm text-zinc-400 hover:text-white transition-colors py-1 block w-full text-left">
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Right Visual Card */}
      <div className="gsap-stagger-item opacity-0 relative group/card bg-zinc-950 border border-zinc-800 rounded-md p-4 overflow-hidden flex flex-col justify-end min-h-[180px]">
        {/* Subtle decorative mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

        {/* Play icon overlay */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover/card:bg-white group-hover/card:border-white transition-all">
          <Play className="w-3.5 h-3.5 text-zinc-400 fill-zinc-400 group-hover/card:text-black group-hover/card:fill-black transition-colors ml-0.5" />
        </div>

        <div className="space-y-1 relative z-10">
          {menu.graphic.tag && (
            <span className="text-2xs text-zinc-500 font-sans tracking-wider uppercase block">
              {menu.graphic.tag}
            </span>
          )}
          <h4 className="text-sm font-serif text-white leading-tight">
            {menu.graphic.title}
          </h4>
          <p className="text-xs text-zinc-400 leading-normal line-clamp-2">
            {menu.graphic.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function MobileNav() {
  const menus = [PRODUCT_MENU, SOLUTIONS_MENU, RESOURCES_MENU, COMPANY_MENU];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-full lg:hidden text-zinc-400 hover:text-white">
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="bg-black/95 border-l border-zinc-800 w-full max-w-sm gap-0 backdrop-blur-lg flex flex-col h-full"
        showClose={false}
      >
        <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-6">
          <span className="text-white font-serif text-xl tracking-tight">OnDecide</span>
          <SheetClose asChild>
            <Button size="icon" variant="ghost" className="rounded-full text-zinc-400 hover:text-white">
              <XIcon className="size-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Quick Search */}
          <div className="w-full">
            <SearchBar />
          </div>

          <Accordion type="single" collapsible className="w-full">
            {menus.map((menu) => (
              <AccordionItem key={menu.trigger} value={menu.trigger} className="border-zinc-800">
                <AccordionTrigger className="font-sans text-white text-base hover:no-underline py-3">
                  {menu.trigger}
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  {menu.sections.map((section) => (
                    <div key={section.label} className="space-y-2">
                      <span className="text-2xs text-zinc-500 font-sans tracking-wider uppercase block">
                        {section.label}
                      </span>
                      <ul className="grid gap-2">
                        {section.items.map((item) => (
                          <li key={item.title}>
                            <SheetClose asChild>
                              <Link
                                href={item.href}
                                className="text-sm text-zinc-400 hover:text-white transition-colors py-1.5 block"
                              >
                                {item.title}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Simple flat links */}
          <div className="flex flex-col gap-4 pt-4 border-t border-zinc-800">
            <SignedOut>
              <SheetClose asChild>
                <Link href="/sign-in" className="text-zinc-400 hover:text-white text-sm font-sans transition-colors py-2 block">
                  Log In
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up" className="inline-flex justify-center bg-white hover:bg-zinc-200 text-black px-4 py-2 text-sm font-medium rounded transition-colors w-full">
                  Get Started
                </Link>
              </SheetClose>
            </SignedOut>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
