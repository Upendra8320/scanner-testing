/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 0px 5px 0px rgba(152, 152, 152, 0.25)'
      }
    },
  },
  plugins: [],
}