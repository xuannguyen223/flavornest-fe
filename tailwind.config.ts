/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./features/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        potta: ['"Potta One"', "cursive"],
        poppins: ["Poppins", "sans-serif"],
        cormorant: ["Cormorant Garamond", "serif"],
      },
      animation: {
        l5: "l5 1.5s infinite linear alternate",
      },
      keyframes: {
        l5: {
          "0%": {
            boxShadow: "40px 0 #fe6b6e, -40px 0 #fe6b6e33",
            background: "#fe6b6e",
          },
          "33%": {
            boxShadow: "40px 0 #fe6b6e, -40px 0 #fe6b6e33",
            background: "#fe6b6e33",
          },
          "66%": {
            boxShadow: "40px 0 #fe6b6e33, -40px 0 #fe6b6e",
            background: "#fe6b6e33",
          },
          "100%": {
            boxShadow: "40px 0 #fe6b6e33, -40px 0 #fe6b6e",
            background: "#fe6b6e",
          },
        },
      },
    },
  },
  plugins: [],
};
