import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        italiana: ["Italiana", "serif"],
      },
      colors: {
        primary: "#057857", // vert foncé
        accent: "#F2B705", // orange doux
        sky: "#0077B6",    // bleu profond
      },
    },
  },
  plugins: [],
};
export default config;
