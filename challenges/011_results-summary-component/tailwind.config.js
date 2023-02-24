/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        lightred: "hsl(0, 100%, 67%)",
        orangyyellow: "hsl(39, 100%, 56%)",
        greenteal: "hsl(166, 100%, 37%)",
        cobaltblue: "hsl(234, 85%, 45%)",
        lightslate: "hsl(252, 100%, 67%)",
        lightroyal: "hsl(241, 81%, 54%)",
        violetblue: "hsla(256, 72%, 46%, 1)",
        persianblue: "hsla(241, 72%, 46%, 0)",
        plateblue: "hsl(221, 100%, 96%)",
        lightlavender: "hsl(241, 100%, 89%)",
        darkgrayblue: "hsl(224, 30%, 27%)",
      },
      fontFamily:{
        hanken : "Hanken Grotesk"
      }
    },
  },
  plugins: [],
}
