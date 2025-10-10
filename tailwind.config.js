import {heroui} from "@heroui/theme"
import { s } from "framer-motion/client";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        primary: "#F08787",
        secondary: "#FFC7A7",
        tertiary: "#FEE2AD",
        rare: "#F8FAB4"
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

module.exports = config;