import type { Config } from "tailwindcss";

/**
 * NEST - "Pen and paper" identity.
 *
 * Cool paper, blue-black ink, a fountain-pen blue for actions, a rose
 * margin line for caveats and destructive actions, and a highlighter used only
 * to mark "you are here". It should read as a private notebook on a shared
 * screen, not as a crisis service.
 *
 * The scale names (calm, lavender, accent, sage, sand, warm...) are kept from
 * the earlier palette so existing markup keeps working; their values changed:
 *   calm      -> blue-black ink scale (neutrals, text, rules)
 *   lavender  -> margin rose (caveats, "to be verified", delete)
 *   accent    -> fountain-pen blue (primary actions, links)
 *   sage      -> green ink (done, saved, stays-local)
 *   sand/warm -> paper tones (quiet notes)
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
        paper: "#F4F6F5",
        grid: "#DCE4EA",
        ink: "#1E2944",
        highlight: "#EEF07A",
        margin: "#B84F68",
        calm: {
          50: "#F5F7F8",
          100: "#EBEFF2",
          200: "#DCE3E9",
          300: "#C3CCD6",
          400: "#97A3B4",
          500: "#687489",
          600: "#535E75",
          700: "#434D66",
          800: "#2E3852",
          900: "#1E2944",
        },
        lavender: {
          DEFAULT: "#F0CCD4",
          50: "#FCF3F4",
          100: "#F8E4E8",
          200: "#F0CCD4",
          300: "#E3A9B6",
          400: "#CF7A8F",
          500: "#B84F68",
          600: "#A03B54",
          700: "#872F46",
          800: "#70263A",
          900: "#5A1F2F",
        },
        "soft-blue": {
          DEFAULT: "#D6DEF3",
          50: "#F2F5FC",
          100: "#E8ECF8",
          200: "#D6DEF3",
          300: "#B3C1E8",
          400: "#7F94D4",
          500: "#4A63BC",
        },
        "pale-blue": {
          DEFAULT: "#EEF2F7",
          50: "#F7F9FB",
          100: "#EEF2F7",
          200: "#DCE4EA",
          300: "#C6D2DC",
        },
        "deep-indigo": {
          DEFAULT: "#1E2944",
          light: "#434D66",
          dark: "#141C30",
        },
        accent: {
          DEFAULT: "#2D47A8",
          hover: "#233A8C",
          light: "#E8ECF8",
        },
        sage: {
          100: "#E6F1EA",
          200: "#CFE4D6",
          300: "#A9CDB5",
          500: "#4F8A65",
          700: "#2F6B4F",
        },
        sand: {
          50: "#F7F8F5",
          100: "#F0F2EE",
          200: "#E2E6E0",
        },
        warm: {
          50: "#F7F8F5",
          100: "#F0F2EE",
          200: "#E2E6E0",
          300: "#CDD3CB",
          rose: "#FCF3F4",
          peach: "#F8E4E8",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", '"Segoe UI"', "Arial", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        // Paper does not float: shadows are reserved for things that sit above
        // the page (menus, the quick-exit button).
        soft: "0 1px 0 rgba(30, 41, 68, 0.06)",
        card: "none",
        "card-hover": "none",
        lift: "0 6px 20px -8px rgba(30, 41, 68, 0.35)",
      },
      borderRadius: {
        // Tighter than before: sheets are paper, not bubbles.
        lg: "0.375rem",
        xl: "0.5rem",
        "2xl": "0.625rem",
      },
    },
  },
  plugins: [],
};

export default config;
