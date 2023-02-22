/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        my: {
          blue: "hsl(223, 87%, 63%)",
          paleblue: "hsl(223, 100%, 88%)",
          lightred: " hsl(354, 100%, 66%)",
          gray: "hsl(0, 0%, 59%)",
          darkblue: "hsl(209, 33%, 12%)",
        }
      },
      fontFamily: {
        Franklin: "Libre Franklin"
      },
      dropShadow: {
        my:'0 5px 5px hsl(223, 100%, 88%)'
      }
    },
  },
  plugins: [],
}
