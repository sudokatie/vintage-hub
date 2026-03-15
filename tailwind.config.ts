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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Mission Control palette
        mc: {
          black: '#0a0a0a',
          dark: '#111111',
          panel: '#0d0d0d',
          border: '#2a2a2a',
          'border-light': '#3a3a3a',
          red: '#dc2626',
          'red-dim': '#991b1b',
          white: '#ffffff',
          gray: '#888888',
          'gray-dim': '#555555',
          'gray-dark': '#333333',
        },
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
        display: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        'wide': '0.1em',
        'wider': '0.15em',
      },
    },
  },
  plugins: [],
};
export default config;
