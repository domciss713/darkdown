import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dd: {
          primary: "#7C3AED",
          primaryHover: "#6D28D9",
          accent: "#A78BFA",
          bg: "#0B0B12",
          panel: "#17172C",
          text: "#EDEDF7",
          muted: "#B6B6D1"
        }
      },
      boxShadow: {
        dd: "0 10px 40px rgba(124,58,237,0.25)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      },
      backdropBlur: {
        glass: "18px"
      }
    }
  },
  plugins: []
};

export default config;
