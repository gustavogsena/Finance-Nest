/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "azul": {
          200: "#6E90E3",
          400: "#1746BA",
          600: "#013C73"
        },
        "amarelo": {
          300: "#FFE5AF",
          400: "#F9CC6D"
        },
        "vermelho": {
          300: "#ec9a9a",
          500: "#BD1919"
        },
        "verde": {
          300: "#1C7585",
          600: "#525658"
        },
        "cinza": {
          400: "#F9F9F9",
          500: "#EEECEC",
          600: "#DFDFDD"
        }
      }
    },

  },
  plugins: [],
}

