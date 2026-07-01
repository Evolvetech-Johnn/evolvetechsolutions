import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        base: "#050816",
        surface: "#0B1220",
        "surface-2": "#111827",
        "text-primary": "#F9FAFB",
        "text-secondary": "#94A3B8",
        accent: "#6366F1",
        "accent-light": "#818CF8",
        border: "#1F2937",
        success: "#22C55E",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        display: ["5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["3rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        h2: ["2.25rem", { lineHeight: "1.2" }],
        h3: ["1.5rem", { lineHeight: "1.3" }],
        body: ["1.125rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        medium: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
