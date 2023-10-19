/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        main: '#2DB4E0',
        secondary: '#E02D5B',
        fats: '#E3D94B',
        proteins: '#D6D5CC',
        carbohydrates: '#8B4A5B',
        text: '#324247',
      },
      fontFamily: {
        'a': ['Antonio'],
        'j': ['Jua'],
      }
    },
  },
  plugins: [],
}

