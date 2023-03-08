/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#0c4a6e",
          "secondary": "#81e2de",
          "accent": "#bbb3ef",
          "neutral": "#1B1C2C",
          "base-100": "#1f2937",
          "info": "#50C1E7",
          "success": "#19D25D",
          "warning": "#945D05",
          "error": "#E34A6B",
        },
      },
    ],
  },
};
