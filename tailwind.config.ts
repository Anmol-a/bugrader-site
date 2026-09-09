import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F2F4F7",
        "paper-alt": "#E9ECF1",
        ink: "#10161F",
        "ink-soft": "#54606F",
        line: "#DBE0E7",
        panel: "#0D131D",
        "panel-2": "#141C2B",
        "panel-line": "#26314A",
        "panel-ink": "#E7EAF0",
        "panel-muted": "#8590A3",
        gold: "#B9862F",
        "gold-soft": "#E7C578",
        alert: "#C6402F",
        clear: "#2F8F73",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        sweep: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pulse2: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        scan: {
          "0%, 100%": { transform: "translateY(-60%)", opacity: "0" },
          "15%": { opacity: "1" },
          "50%": { transform: "translateY(60%)", opacity: "1" },
          "85%": { opacity: "1" },
        },
        flow: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(420%)" },
        },
      },
      animation: {
        sweep: "sweep 6s linear infinite",
        blip: "pulse2 1.6s ease-in-out infinite",
        scan: "scan 1.4s ease-in-out infinite",
        flow: "flow 2.8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;