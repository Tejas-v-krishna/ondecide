import type { Config } from "tailwindcss";

/**
 * OnDecide — light "warm paper + ink" design system.
 * Neutral, editorial-modern SaaS surfaces with a single restrained
 * emerald brand accent and finance-semantic colours.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Neutral canvas ──────────────────────────────
        paper: "#F6F6F8",
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F1F2F6",
          muted: "#E8EAF1",
        },
        ink: {
          DEFAULT: "#0A0F1E",
          950: "#050912",
          900: "#0A0F1E",
          800: "#141B2E",
          700: "#2A3346",
          600: "#4A5468",
          500: "#6B7488",
          400: "#98A0B3",
          300: "#C4CAD8",
          200: "#DDE1EA",
        },
        line: {
          DEFAULT: "#E3E6EE",
          soft: "#EDEFF5",
          strong: "#D2D7E3",
        },
        // ── Brand accent (royal blue) ───────────────────
        brand: {
          50: "#EFF3FF",
          100: "#DEE6FE",
          200: "#C0CEFC",
          300: "#9BAEF9",
          400: "#7289F2",
          500: "#4A63DF",
          600: "#1F47AB",
          700: "#1A3B8E",
          800: "#163071",
          900: "#122757",
        },
        // ── Illustration tints ──────────────────────────
        accent: {
          DEFAULT: "#7C99FF",
          soft: "#CBD7FE",
          pale: "#E4EAFF",
          deep: "#1F47AB",
        },
        // ── Semantic finance ────────────────────────────
        invest: "#0E9A5B",
        hold: "#B45309",
        avoid: "#D92D20",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
        "3xs": ["0.625rem", { lineHeight: "0.9rem" }],
        "display-sm": ["clamp(2rem, 1.2rem + 2.8vw, 3.1rem)", { lineHeight: "1.06", letterSpacing: "-0.025em" }],
        "display": ["clamp(2.6rem, 1.4rem + 4.2vw, 4.6rem)", { lineHeight: "1.03", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(3rem, 1rem + 6.5vw, 5.6rem)", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(10,15,30,0.05)",
        sm: "0 1px 3px rgba(10,15,30,0.06), 0 1px 2px rgba(10,15,30,0.04)",
        md: "0 4px 14px rgba(10,15,30,0.07), 0 2px 4px rgba(10,15,30,0.04)",
        lg: "0 14px 36px rgba(10,15,30,0.09), 0 4px 10px rgba(10,15,30,0.04)",
        xl: "0 28px 70px rgba(10,15,30,0.12), 0 8px 20px rgba(10,15,30,0.05)",
        ring: "0 0 0 1px rgba(10,15,30,0.06)",
        "ring-brand": "0 0 0 1px rgba(31,71,171,0.35)",
        soft: "0 30px 80px -40px rgba(16,32,80,0.45)",
        glow: "0 0 0 1px rgba(31,71,171,0.08), 0 40px 120px -50px rgba(31,71,171,0.6)",
      },
      backgroundImage: {
        "grid-line":
          "linear-gradient(to right, rgba(31,71,171,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,71,171,0.055) 1px, transparent 1px)",
        "paper-fade":
          "radial-gradient(120% 90% at 50% 0%, rgba(31,71,171,0.07), transparent 60%)",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s cubic-bezier(0.22,1,0.36,1)",
        shimmer: "shimmer 1.6s infinite",
        marquee: "marquee 48s linear infinite",
        float: "float 6s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
