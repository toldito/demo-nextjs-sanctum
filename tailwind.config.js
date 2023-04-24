/** @type {import('tailwindcss').Config} */
const {fontFamily} = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          25: "#FCFAFF",
          50: "#F9F5FF",
          100: "#F4EBFF",
          200: "#E9D7FF",
          300: "#D6BBFB",
          400: "#B692F6",
          500: "#9E77ED",
          600: "#7F56D9",
          700: "#6941C6",
          800: "#53389E",
          900: "#42307D",
        },
      },
    },
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
};
