"use client";

import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Bell, MenuIcon, XIcon, ArrowUpRight } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogoLockup } from "@/components/ui/LogoMark";
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

const RESEARCH_MENU: MegaMenuConfig = {
  trigger: "Research",
  sections: [
    {
      label: "By asset",
      items: [
        { title: "US Equities", href: "/explore" },
        { title: "International", href: "/explore" },
        { title: "Crypto", href: "/explore" },
        { title: "Watchlist", href: "/watchlist" },
      ],
    },
    {
      label: "Method",
      items: [
        { title: "Sample Report", href: "/research/AAPL" },
        { title: "Research Methodology", href: "/resources/methodology" },
        { title: "Financial Glossary", href: "/glossary" },
        { title: "Trust Center", href: "/legal" },
      ],
    },
  ],
  graphic: {
    tag: "AI Agents",
    title: "Seven agents, one report",
    description: "How OnDecide synthesizes research-grade analysis in under 60 seconds.",
  },
};

const TOOLS_MENU: MegaMenuConfig = {
  trigger: "Tools",
  sections: [
    {
      label: "Analyst skills",
      items: [
        { title: "Pull Financial Ratios", href: "/skills/financial-ratios" },
        { title: "Read News Sentiment", href: "/skills/news-sentiment" },
        { title: "Analyze Technical Signals", href: "/skills/technical-signals" },
        { title: "Historical Patterns", href: "/skills/historical-patterns" },
        { title: "Qualitative Synthesis", href: "/skills/qualitative-synthesis" },
        { title: "Form Thesis", href: "/skills/form-thesis" },
      ],
    },
    {
      label: "Workspace",
      items: [
        { title: "Agent Synthesizer", href: "/agents" },
        { title: "Portfolio Tracker", href: "/portfolio" },
        { title: "Screener", href: "/explore" },
        { title: "Saved Reports", href: "/watchlist" },
      ],
    },
  ],
  graphic: {
    tag: "Workspace",
    title: "Your research desk",
    description: "Watchlists, portfolios and saved reports in one place.",
  },
};

const RESOURCES_MENU: MegaMenuConfig = {
  trigger: "Resources",
  sections: [
    {
      label: "Learn",
      items: [
        { title: "Platform Guide", href: "/resources/platform-guide" },
        { title: "Methodology", href: "/resources/methodology" },
        { title: "FAQ", href: "/resources/faq" },
        { title: "Tutorials", href: "/resources/tutorials" },
      ],
    },
    {
      label: "Updates",
      items: [
        { title: "Changelog", href: "/resources/changelog" },
        { title: "API Partners", href: "/resources/partners" },
        { title: "Security", href: "/trust/privacy" },
        { title: "Contact", href: "/company/contact" },
      ],
    },
  ],
  graphic: {
    tag: "Knowledge Base",
    title: "Financial knowledge hub",
    description: "Demystifying quantitative metrics and institutional-grade indicators.",
  },
};

const LINK_ITEMS: MenuItem[] = [
  { title: "Watchlist", href: "/watchlist" },
  { title: "Market Data", href: "/explore" },
  { title: "Agents", href: "/agents" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-[100] w-full border-b border-line bg-white/90 backdrop-blur-xl">
      <nav className="shell flex h-16 items-center gap-8">
        <LogoLockup />

        <DesktopMenu />

        {/* Right: utility icons */}
        <div className="ml-auto flex flex-shrink-0 items-center gap-1.5">
          <Link
            href="/#pricing"
            className="hidden h-8 w-8 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-surface-subtle hover:text-ink sm:flex"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </Link>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              aria-label="Sign in"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-200 to-accent text-[11px] font-semibold text-brand-800 ring-1 ring-inset ring-brand-300 transition-transform hover:scale-105"
            >
              OD
            </Link>
          </SignedOut>

          <MobileNav />
        </div>
      </nav>
    </header>
  );
}

function DesktopMenu() {
  const menus = [RESEARCH_MENU, TOOLS_MENU, RESOURCES_MENU];

  return (
    <NavigationMenu
      viewportClassName="border border-line rounded-[4px] bg-white"
      className="hidden lg:flex"
    >
      <NavigationMenuList className="gap-0.5">
        {menus.map((menu) => (
          <NavigationMenuItem key={menu.trigger}>
            <NavigationMenuTrigger className="rounded-[3px] px-3 py-1.5 text-[13px] font-normal text-ink-700 hover:bg-transparent hover:text-brand-700 data-[state=open]:bg-transparent data-[state=open]:text-brand-700">
              {menu.trigger}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <MegaMenuContent menu={menu} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        {LINK_ITEMS.map((item) => (
          <NavigationMenuItem key={item.title}>
            <Link
              href={item.href}
              className="inline-flex items-center rounded-[3px] px-3 py-1.5 text-[13px] text-ink-700 transition-colors hover:text-brand-700"
            >
              {item.title}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MegaMenuContent({ menu }: { menu: MegaMenuConfig }) {
  return (
    <div className="grid w-[720px] grid-cols-[1fr_1fr_1.05fr] gap-2 rounded-[4px] border border-line bg-white p-4 shadow-xl">
      {menu.sections.map((section, si) => (
        <div key={section.label} className="space-y-3">
          <span className="block text-3xs font-semibold uppercase tracking-[0.14em] text-ink-400">
            {section.label}
          </span>
          <ul className="space-y-0.5">
            {section.items.map((item, ii) => (
              <li
                key={item.title}
                style={{ animationDelay: `${(si * 6 + ii) * 18}ms` }}
                className="animate-[popIn_.35s_cubic-bezier(.22,1,.36,1)_both]"
              >
                <Link href={item.href} passHref legacyBehavior>
                  <NavigationMenuLink className="w-full rounded-[3px] px-2 py-1.5 text-left text-[13px] text-ink-700 hover:bg-brand-50 hover:text-brand-700">
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="relative flex min-h-[180px] flex-col justify-end overflow-hidden rounded-[3px] bg-brand-50 p-4">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,71,171,0.14),transparent_62%)]" />
        <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-600">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
        <div className="relative z-10 space-y-1">
          {menu.graphic.tag && (
            <span className="block text-3xs font-semibold uppercase tracking-[0.14em] text-brand-600">
              {menu.graphic.tag}
            </span>
          )}
          <h4 className="text-[13px] font-medium leading-tight text-ink">{menu.graphic.title}</h4>
          <p className="line-clamp-2 text-[11.5px] leading-normal text-ink-500">
            {menu.graphic.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function MobileNav() {
  const menus = [RESEARCH_MENU, TOOLS_MENU, RESOURCES_MENU];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-[3px] lg:hidden">
          <MenuIcon className="size-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm gap-0 bg-white" showClose={false}>
        <div className="flex h-16 items-center justify-between border-b border-line px-6">
          <LogoLockup />
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
                <AccordionTrigger className="py-3 text-[15px] text-ink hover:no-underline">
                  {menu.trigger}
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  {menu.sections.map((section) => (
                    <div key={section.label} className="space-y-2">
                      <span className="block text-3xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                        {section.label}
                      </span>
                      <ul className="grid gap-1">
                        {section.items.map((item) => (
                          <li key={item.title}>
                            <SheetClose asChild>
                              <Link
                                href={item.href}
                                className="block py-1.5 text-[13.5px] text-ink-600 transition-colors hover:text-brand-700"
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

          <div className="space-y-1 border-t border-line pt-4">
            {LINK_ITEMS.map((item) => (
              <SheetClose asChild key={item.title}>
                <Link
                  href={item.href}
                  className="block py-2 text-[15px] text-ink-700 transition-colors hover:text-brand-700"
                >
                  {item.title}
                </Link>
              </SheetClose>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-line pt-4">
            <SignedOut>
              <SheetClose asChild>
                <Link
                  href="/sign-in"
                  className="block py-2 text-[13.5px] text-ink-600 transition-colors hover:text-ink"
                >
                  Log in
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up" className="btn-cobalt w-full">
                  Start Researching Free
                </Link>
              </SheetClose>
            </SignedOut>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
