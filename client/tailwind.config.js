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
       'primary-text':'#FFFFFF',
       'dark1':'#1E1E1E',
       'dark2':'#333333',
       'text-dark':'#ffffff',
       'dark-orange':'rgb(249 115 22)',
       
      },
    },
  },
  plugins: [],
}

