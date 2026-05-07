import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05060A",
          900: "#070A12",
          800: "#0B1020",
          700: "#101933"
        },
        neon: {
          cyan: "#3EE7FF",
          green: "#3BFFB6",
          purple: "#A78BFA",
          blue: "#4F8CFF"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(62,231,255,0.10), 0 0 32px rgba(62,231,255,0.10)",
        glowStrong:
          "0 0 0 1px rgba(62,231,255,0.18), 0 0 48px rgba(62,231,255,0.18)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 20% 20%, rgba(62,231,255,0.16) 0%, transparent 55%), radial-gradient(circle at 80% 30%, rgba(167,139,250,0.12) 0%, transparent 60%), radial-gradient(circle at 35% 90%, rgba(59,255,182,0.12) 0%, transparent 60%)",
        "soft-noise":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.22'/%3E%3C/svg%3E\")",
        "animated-gradient":
          "linear-gradient(135deg, rgba(62,231,255,0.22), rgba(79,140,255,0.16), rgba(167,139,250,0.18), rgba(59,255,182,0.16))"
      }
    }
  },
  plugins: []
} satisfies Config;

