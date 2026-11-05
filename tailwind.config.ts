import type { Config } from "tailwindcss";

/**
 * Trauma-informed palette.
 * Soft blues and lavenders with warm neutrals. No reds or harsh alert colors
 * are used anywhere in the primary UI; status uses muted, calm tones instead.
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
