import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vantage Wealth brand palette (extracted from vantagewealth.ca)
        navy: {
          DEFAULT: "#0D2F52",
          50: "#EAF0F6",
          100: "#D2DEEC",
          200: "#A7BDD9",
          300: "#6E92B8",
          400: "#3D6A98",
          500: "#164070",
          600: "#0D2F52",
          700: "#0A2542",
          800: "#071B33",
          900: "#051426",
        },
        gold: {
          DEFAULT: "#CA902F",
          light: "#E0B25A",
          dark: "#A9761E",
          50: "#FBF4E6",
          100: "#F5E6C8",
        },
        cream: "#F8F6F1",
        teal: {
          DEFAULT: "#7EBEC5",
          dark: "#5A9CA3",
          light: "#A8D2D7",
        },
        // Financial health indicator colors (results only)
        health: {
          green: "#2E9E5B",
          greenBg: "#E8F5EE",
          yellow: "#E0A104",
          yellowBg: "#FDF6E3",
          red: "#D4634A",
          redBg: "#FBEAE5",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-dm)", "DM Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "20px",
        "3xl": "28px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(13,47,82,0.06), 0 8px 30px rgba(13,47,82,0.08)",
        cardHover: "0 4px 12px rgba(13,47,82,0.08), 0 16px 50px rgba(13,47,82,0.14)",
        gauge: "0 10px 40px rgba(13,47,82,0.12)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
