import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class", // Active si tu veux un dark mode plus tard
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1496px",
      },
    },
    extend: {
      colors: {
        primary: "#2563EB",
        primaryHover: "#1E40AF",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#B91C1C",
        grayLight: "#F3F4F6",
        grayDark: "#374151",
        background: "#FFFFFF",
        text: "#000000",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        italiana: ['Italiana', 'serif'],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        slideDown: "slideDown 0.3s ease-out forwards",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
