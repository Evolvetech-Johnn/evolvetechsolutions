import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          base: "#020617", // Azul profundo — tecnologia/fundo
          surface: "#0B1220", // Superfície de cards
          "surface-alt": "#0F172A", // Seções alternadas
          accent: "#0EA5E9", // Ciano — inovação, links, ícones ativos
          "accent-light": "#38BDF8", // Ciano mais claro para estados hover
          action: "#10B981", // Verde-esmeralda — evolução, CTA principal, métricas positivas
          text: "#F9FAFB", // Texto primário sobre fundo escuro
          "text-muted": "#94A3B8", // Texto secundário/legendas
          border: "#1E293B", // Divisores e bordas sutis
        },
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
