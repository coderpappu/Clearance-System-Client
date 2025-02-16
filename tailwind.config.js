/** @type {import('tailwindcss').Config} */

import { keepTheme } from "keep-react/keepTheme";

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  plugins: [],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "dark-bg": "#0B1120",
        "dark-card": "#1E293B",
        "dark-box": "#293548",
        "dark-text-color": "#c4c7ce",
        "dark-heading-color": "rgb(56 189 248)",
        "dark-border-color": "#e5e7eb",
        "button-bg": "#3686FF",
        "button-bg-hover": "#4890fc",
        "light-text-color": "#a5a5a5b8",
        "light-bg": "#e5e7eb6e",
        "gray-text": "#8b8b8b",
      },
    },
    fontFamily: {
      body: [
        "Raleway",
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      heading: "Raleway",
      sans: [
        "Raleway",
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      raleway: ["Raleway", "Roboto"],
    },
  },
};

export default keepTheme(config);
