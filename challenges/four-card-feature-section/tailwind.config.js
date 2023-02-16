/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary:{
          red: "hsl(0, 78%, 62%)",
          cyan: "hsl(180, 62%, 55%)",
          orange: "hsl(34, 97%, 64%)",
          blue: "hsl(212, 86%, 64%)",
        },
        neutral: {
          600: "hsl(234, 12%, 34%)",
          300: "hsl(229, 6%, 66%)",
          100: "hsl(0, 0%, 98%)",
        }
      },
      fontFamily: {
        poppins: "Poppins"
      },
      screens: {
        'xs': '350px'
      }
  },
  plugins: [],
  }
}