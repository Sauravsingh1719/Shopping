import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages*.{js,ts,jsx,tsx,mdx}",
    "./components*.{js,ts,jsx,tsx,mdx}",
    "./app*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "outline-variant": "#c2c7ca",
        "primary": "#0e1629",
        "tertiary-fixed": "#ffdbc8",
        
        "secondary": "#334155",
        "on-surface-variant": "#334155",
        "on-primary-container": "#1e293b",

        "inverse-primary": "#bec6e0",
        "primary-fixed-dim": "#bec6e0",
        "primary-container": "#232b3f",
        "surface-bright": "#f7f9fb",
        "secondary-container": "#d0e1fb",
        "on-tertiary": "#ffffff",
        "error": "#ba1a1a",
        "background": "#f7f9fb",
        "inverse-surface": "#2d3133",
        "surface-container-highest": "#e0e3e5",
        "surface": "#f7f9fb",
        "outline": "#73787a",
        "surface-variant": "#e0e3e5",
        "on-surface": "#191c1e",
        "tertiary": "#251206",
        "on-error-container": "#93000a",
        "on-tertiary-fixed": "#2a170a",
        "on-tertiary-container": "#ac8c79",
        "primary-fixed": "#dae2fd",
        "on-secondary-fixed-variant": "#38485d",
        "on-secondary-fixed": "#0b1c30",
        "on-primary-fixed-variant": "#3f465c",
        "on-secondary-container": "#54647a",
        "surface-container": "#eceef0",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "surface-container-lowest": "#ffffff",
        "on-primary-fixed": "#131b2e",
        "on-secondary": "#ffffff",
        "inverse-on-surface": "#eff1f3",
        "secondary-fixed": "#d3e4fe",
        "surface-dim": "#d8dadc",
        "on-primary": "#ffffff",
        "surface-tint": "#565e74",
        "tertiary-container": "#3c2618",
        "on-background": "#191c1e",
        "surface-container-high": "#e6e8ea",
        "tertiary-fixed-dim": "#e4bfaa",
        "on-tertiary-fixed-variant": "#5b4132",
        "secondary-fixed-dim": "#b7c8e1",
        "surface-container-low": "#f2f4f6"
      },
      fontFamily: {
        headline: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;