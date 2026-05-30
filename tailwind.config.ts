import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f6f1e7",
        ink: "#111111",
        line: "#222222",
        brass: "#b8862c",
        register: "#e8d8a8",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
        mono: ["ui-monospace", "Menlo", "Monaco", "Courier New", "monospace"],
      },
      boxShadow: {
        ink: "3px 3px 0 0 #111111",
      },
    },
  },
  plugins: [],
};

export default config;
