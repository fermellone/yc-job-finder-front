// import the default theme
import colors from "tailwindcss/colors"; // In case you want to add the default colors uncoment this import and use them in the theme section

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    colors: {
      primary: "#3b0d91",
      secondary: "#0077c2",
      black: "#2b2d42",
      white: colors.white,
    },
  },
  plugins: [],
};
