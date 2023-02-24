/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        Grayish_Blue:{
          600: "hsl(217, 19%, 35%)",
          500: "hsl(214, 17%, 51%)",
          400: "hsl(212, 23%, 69%)",
          100: "hsl(210, 46%, 95%)",
        }
      },
      fontFamily: {
        main: "Manrope"
      }
    },
  },
  plugins: [],
}
