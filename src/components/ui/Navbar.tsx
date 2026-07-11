import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SearchBar } from "./SearchBar";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800 bg-navy-900/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">O</span>
          </div>
          <span className="text-slate-100 font-bold text-lg tracking-tight">
            On<span className="text-emerald-400">Decide</span>
          </span>
        </Link>

        {/* Search — hidden on mobile */}
        <div className="hidden md:block flex-1 max-w-xl ml-4">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/explore"
            className="hidden sm:inline-flex text-sm text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5"
          >
            Explore
          </Link>
          <SignedIn>
            <Link
              href="/watchlist"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Watchlist
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="text-sm bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-lg transition-colors font-medium"
            >
              Get started
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
