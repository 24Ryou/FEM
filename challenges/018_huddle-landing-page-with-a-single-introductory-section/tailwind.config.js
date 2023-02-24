/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        clrViolet: "hsl(257, 40%, 49%)",
        clrmagneta: "hsl(300, 69%, 71%)",
      },
      fontFamily:{
        poppins : "Poppins",
        open : "Open Sans",
      }
    },
  },
  plugins: [],
}
