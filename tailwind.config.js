/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0dcaf0',
        disabled: '#c4dbf7'
      }
    },
  },
  plugins: [],
}

