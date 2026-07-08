import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rpg: {
          bg: "#1a1a24",
          surface: "#2d2d3d",
          border: "#4b4b66",
          text: "#e0e0e0",
          primary: "#c84b31",
          primaryHover: "#e26245",
          accent: "#2d4263",
          error: "#ff5252"
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        retro: ['"VT323"', 'monospace']
      }
    },
  },
  plugins: [],
};
export default config;
