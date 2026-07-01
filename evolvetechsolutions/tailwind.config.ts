import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
        },
        background: "#F8FAFC",
        primary: "#0F172A",
        accent: "#0EA5E9",
        success: "#10B981",
        text: {
          primary: "#1E293B",
          secondary: "#64748B",
        },
        border: "#E2E8F0",
        ink: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": ["64px", { lineHeight: "1.1" }],
        "h1": ["48px", { lineHeight: "1.15" }],
        "h2": ["36px", { lineHeight: "1.2" }],
        "h3": ["28px", { lineHeight: "1.3" }],
        "body": ["18px", { lineHeight: "1.6" }],
        "small": ["16px", { lineHeight: "1.5" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
