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
        paper: "#FAFAF7",
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F6F6F2",
          muted: "#EFEEE8",
        },
        ink: {
          DEFAULT: "#0E1524",
          950: "#080D18",
          900: "#0E1524",
          800: "#1B2536",
          700: "#334155",
          600: "#475569",
          500: "#64748B",
          400: "#94A3B8",
          300: "#C3CBD6",
          200: "#DCE1E8",
        },
        line: {
          DEFAULT: "#E6E4DD",
          soft: "#EFEDE6",
          strong: "#D5D2C9",
        },
        // ── Brand accent (emerald, refined) ─────────────
        brand: {
          50: "#ECFDF4",
          100: "#D2F9E4",
          200: "#A8F0CB",
          300: "#6FE2AC",
          400: "#34CE8B",
          500: "#12B176",
          600: "#0B8F60",
          700: "#0A724F",
          800: "#0A5B41",
          900: "#0A4A37",
        },
        // ── Semantic finance ────────────────────────────
        invest: "#0B8F60",
        hold: "#B45309",
        avoid: "#D92D20",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
        "display-sm": ["clamp(2rem, 1.2rem + 3.2vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display": ["clamp(2.5rem, 1.2rem + 5vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(3rem, 1rem + 7vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(14,21,36,0.05)",
        sm: "0 1px 3px rgba(14,21,36,0.06), 0 1px 2px rgba(14,21,36,0.04)",
        md: "0 4px 14px rgba(14,21,36,0.07), 0 2px 4px rgba(14,21,36,0.04)",
        lg: "0 14px 36px rgba(14,21,36,0.09), 0 4px 10px rgba(14,21,36,0.04)",
        xl: "0 28px 70px rgba(14,21,36,0.12), 0 8px 20px rgba(14,21,36,0.05)",
        ring: "0 0 0 1px rgba(14,21,36,0.06)",
        "ring-brand": "0 0 0 1px rgba(11,143,96,0.35)",
      },
      backgroundImage: {
        "grid-line":
          "linear-gradient(to right, rgba(14,21,36,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,21,36,0.045) 1px, transparent 1px)",
        "paper-fade":
          "radial-gradient(120% 90% at 50% 0%, rgba(11,143,96,0.06), transparent 60%)",
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
        marquee: "marquee 40s linear infinite",
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
