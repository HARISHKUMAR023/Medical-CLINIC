/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       'primary':'#001242',
       'secondary':'#FFFFFF',
    'primary-text':'#FFFFFF'
      },
    },
  },
  plugins: [],
}

