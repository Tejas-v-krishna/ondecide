"use client";

import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { MenuIcon, XIcon, ArrowUpRight } from "lucide-react";
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
    title: "The OnDecide Design System",
    description: "Read more about our minimal, high-aesthetic design philosophy.",
  },
};

export function Navbar() {
  return (
    <header className="sticky top-0 z-[100] w-full border-b border-line bg-paper/80 backdrop-blur-xl">
      <nav className="shell flex h-16 items-center justify-between gap-6">
        {/* Left: Logo + Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex flex-shrink-0 items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-white transition-transform group-hover:scale-105">
              <span className="font-sans text-sm font-semibold">O</span>
            </div>
            <span className="font-sans text-[19px] font-medium tracking-tight text-ink">
              OnDecide
            </span>
          </Link>

          <DesktopMenu />
        </div>

        {/* Right: Auth / Buttons */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className="hidden px-3 py-1.5 text-sm text-ink-600 transition-colors hover:text-ink sm:block"
            >
              Log in
            </Link>
            <Link href="/sign-up" className="hidden sm:block">
              <Button variant="default" size="sm" className="h-9">
                Get started
              </Button>
            </Link>
          </SignedOut>

          <MobileNav />
        </div>
      </nav>
    </header>
  );
}

function DesktopMenu() {
  const menus = [PRODUCT_MENU, SOLUTIONS_MENU, RESOURCES_MENU, COMPANY_MENU];

  return (
    <NavigationMenu
      viewportClassName="border border-line rounded-2xl bg-surface"
      className="hidden lg:block"
    >
      <NavigationMenuList className="gap-1">
        {menus.map((menu) => (
          <NavigationMenuItem key={menu.trigger}>
            <NavigationMenuTrigger>{menu.trigger}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <MegaMenuContent menu={menu} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MegaMenuContent({ menu }: { menu: MegaMenuConfig }) {
  return (
    <div className="grid w-[760px] grid-cols-[1fr_1fr_1.05fr] gap-2 rounded-2xl border border-line bg-surface p-5 shadow-xl">
      {/* Left Columns */}
      {menu.sections.map((section, si) => (
        <div key={section.label} className="space-y-3">
          <span className="block text-2xs font-medium uppercase tracking-wider text-ink-400">
            {section.label}
          </span>
          <ul className="space-y-1">
            {section.items.map((item, ii) => (
              <li
                key={item.title}
                style={{ animationDelay: `${(si * 6 + ii) * 18}ms` }}
                className="animate-[popIn_.35s_cubic-bezier(.22,1,.36,1)_both]"
              >
                <Link href={item.href} passHref legacyBehavior>
                  <NavigationMenuLink className="w-full py-1.5 text-left text-sm text-ink-600 hover:text-ink">
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Right Visual Card */}
      <div className="relative flex min-h-[190px] flex-col justify-end overflow-hidden rounded-xl border border-line bg-gradient-to-br from-brand-50 to-surface-subtle p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,143,96,0.10),transparent_60%)] pointer-events-none" />
        <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-ink-400">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
        <div className="relative z-10 space-y-1">
          {menu.graphic.tag && (
            <span className="block text-2xs font-medium uppercase tracking-wider text-brand-700">
              {menu.graphic.tag}
            </span>
          )}
          <h4 className="text-sm font-medium leading-tight text-ink">
            {menu.graphic.title}
          </h4>
          <p className="line-clamp-2 text-xs leading-normal text-ink-500">
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
        <Button size="icon" variant="ghost" className="lg:hidden">
          <MenuIcon className="size-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-sm gap-0 bg-surface"
        showClose={false}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-white">
              <span className="font-sans text-sm font-semibold">O</span>
            </div>
            <span className="font-sans text-[19px] font-medium tracking-tight text-ink">
              OnDecide
            </span>
          </div>
          <SheetClose asChild>
            <Button size="icon" variant="ghost">
              <XIcon className="size-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          <Accordion type="single" collapsible className="w-full">
            {menus.map((menu) => (
              <AccordionItem key={menu.trigger} value={menu.trigger} className="border-line">
                <AccordionTrigger className="py-3 text-base text-ink hover:no-underline">
                  {menu.trigger}
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  {menu.sections.map((section) => (
                    <div key={section.label} className="space-y-2">
                      <span className="block text-2xs font-medium uppercase tracking-wider text-ink-400">
                        {section.label}
                      </span>
                      <ul className="grid gap-1">
                        {section.items.map((item) => (
                          <li key={item.title}>
                            <SheetClose asChild>
                              <Link
                                href={item.href}
                                className="block py-1.5 text-sm text-ink-600 transition-colors hover:text-ink"
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

          <div className="flex flex-col gap-3 border-t border-line pt-4">
            <SignedOut>
              <SheetClose asChild>
                <Link
                  href="/sign-in"
                  className="block py-2 text-sm text-ink-600 transition-colors hover:text-ink"
                >
                  Log in
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/sign-up"
                  className="inline-flex w-full justify-center rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-800"
                >
                  Get started
                </Link>
              </SheetClose>
            </SignedOut>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
