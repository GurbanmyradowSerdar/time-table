/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Roboto Mono", "sans-serif"],
      },
      colors: {
        text: "#050315",
        background: "#fbfbfe",
        primary: "#2f27ce",
        secondary: "#dedcff",
        accent: "#433bff",
      },
    },
  },
  plugins: [],
};
