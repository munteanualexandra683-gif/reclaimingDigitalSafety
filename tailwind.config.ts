import type { Config } from "tailwindcss";

/**
 * NEST - Trauma-informed palette
 * Soft blues, lavenders, warm neutrals, and calming indigos.
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
        calm: {
          50: "#f6f7fb",
          100: "#eef0f8",
          200: "#dde1f0",
          300: "#c3cae4",
          400: "#9aa5d1",
          500: "#7784bd",
          600: "#5f68a3",
          700: "#4e5585",
          800: "#43486c",
          900: "#3a3e58",
        },
        lavender: {
          DEFAULT: "#E6E0F3",
          50: "#faf8fd",
          100: "#f3eefb",
          200: "#e8def6",
          300: "#d5c3ee",
          400: "#bb9fe1",
          500: "#a27fd3",
          600: "#8a63bf",
          700: "#744fa3",
          800: "#604285",
          900: "#50386c",
        },
        "soft-blue": {
          DEFAULT: "#CADAF0",
          50: "#f3f7fc",
          100: "#e4edfa",
          200: "#CADAF0",
          300: "#a5c2e6",
          400: "#7da4db",
          500: "#5a86ce",
        },
        "pale-blue": {
          DEFAULT: "#F0F5FB",
          50: "#f8fafd",
          100: "#F0F5FB",
          200: "#e0ebf7",
          300: "#c8ddf1",
        },
        "deep-indigo": {
          DEFAULT: "#3F3D56",
          light: "#585577",
          dark: "#2c2a3e",
        },
        accent: {
          DEFAULT: "#6C63FF",
          hover: "#5b52e0",
          light: "#eeedff",
        },
        sage: {
          100: "#eef4ef",
          200: "#d7e6db",
          300: "#b4cfbb",
          500: "#6fa37d",
          700: "#4e7a5b",
        },
        sand: {
          50: "#fbfaf7",
          100: "#f5f2ec",
          200: "#e9e3d7",
        },
        warm: {
          50: "#fdfbf9",
          100: "#fbf6f1",
          200: "#f7ece2",
          300: "#eedbca",
          rose: "#FDF2F0",
          peach: "#F9E8E4",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
        ],
      },
      boxShadow: {
        soft: "0 2px 20px -8px rgba(79, 85, 133, 0.25)",
        card: "0 1px 3px rgba(67, 72, 108, 0.08), 0 8px 24px -12px rgba(67, 72, 108, 0.18)",
        "card-hover": "0 4px 20px -4px rgba(108, 99, 255, 0.15), 0 2px 6px -1px rgba(63, 61, 86, 0.08)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
