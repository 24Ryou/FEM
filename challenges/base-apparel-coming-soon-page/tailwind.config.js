/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          red : {
            soft: "hsl(0, 93%, 68%)",
            Desaturated: "hsl(0, 36%, 70%)",
            Grayish: "hsl(0, 6%, 24%)",
          },
          gradient : {
            100: "hsl(0, 0%, 100%)",
            200: "hsl(0, 100%, 98%)",
            300: "hsl(0, 80%, 86%)",
            400: "hsl(0, 74%, 74%)",
          }
        }
      },
      fontFamily: {
        josefin : "Josefin Sans"
      },
      letterSpacing : {
        'widest': '15px'
      }
    },
  },
  plugins: [],
}
