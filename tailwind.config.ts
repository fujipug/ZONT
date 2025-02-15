import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
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
          '0%': { backgroundColor: '#FF007F', opacity: '90%' }, // Pink
          '25%': { backgroundColor: '#FF8C00', opacity: '90%' }, // Orange
          '50%': { backgroundColor: '#32CD32', opacity: '90%' }, // Green
          '75%': { backgroundColor: '#1E90FF', opacity: '90%' }, // Blue
          '100%': { backgroundColor: '#FF007F', opacity: '90%' }, // Back to Pink
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()]
} satisfies Config;
