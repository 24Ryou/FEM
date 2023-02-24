/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors : {
        cyan : "hsl(179, 62%, 43%)",
        lightcyan : "hsl(179, 62%, 43% , 0.8)",
        brightyellow : "hsl(71, 73%, 54%)",
        lightgray : "hsl(204, 43%, 93%)",
        grayishblue : "hsl(218, 22%, 67%)",
      },
      fontFamily: {
        Karla : "Karla"
      }
    },
  },
  plugins: [],
}
