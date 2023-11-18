/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        main: '#2DB4E0',
        main_light: '#baeeff',
        secondary: '#E02D5B',
        fats: '#E3D94B',
        proteins: '#D6D5CC',
        carbohydrates: '#8B4A5B',
        text: '#324247',
      },
      fontSize: {
        'xs': '.7rem',
      },
      fontFamily: {
        'a': ['Antonio'],
        'j': ['Jua'],
      }
    },
  },
  plugins: [],
}

