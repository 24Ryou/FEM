/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        red : "hsl(0, 100%, 74%)",
        green : "hsl(154, 59%, 51%)",
        blue : "hsl(248, 32%, 49%)",
        darkblue : "hsl(249, 10%, 26%)",
        grayishblue : "hsl(246, 25%, 77%)",
      },
      fontFamily : {
        Poppins : "Poppins"
      }
    },
  },
  plugins: [],
}
