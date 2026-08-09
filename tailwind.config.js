/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#4f46e5",
        primaryDark: "#4338ca",
      },
    },
  },
  plugins: [],
};
