import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // colors: {
      //   background: "var(--background)",
      //   foreground: "var(--foreground)",
      // },
      animation: {
        'party-vibe': 'partyVibe 5s ease-in-out infinite',
      },
      keyframes: {
        partyVibe: {
          '0%': { backgroundColor: '#FF007F' }, // Pink
          '25%': { backgroundColor: '#FF8C00' }, // Orange
          '50%': { backgroundColor: '#32CD32' }, // Green
          '75%': { backgroundColor: '#1E90FF' }, // Blue
          '100%': { backgroundColor: '#FF007F' }, // Back to Pink
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
} satisfies Config;
