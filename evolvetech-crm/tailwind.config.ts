import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          50: '#f8fafc',
        },
        primary: {
          DEFAULT: '#8b5cf6', // violet-500
          hover: '#7c3aed', // violet-600
        },
        secondary: {
          DEFAULT: '#3b82f6', // blue-500
          hover: '#2563eb', // blue-600
        },
        accent: {
          DEFAULT: '#06b6d4', // cyan-500
          hover: '#0891b2', // cyan-600
        },
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
