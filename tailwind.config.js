const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.gray,
        success: colors.green,
        info: colors.cyan,
        danger: colors.red,
        warning: colors.orange,
        light: colors.white,
        dark: colors.black,
      },
      screens: {
        'sm': '350px',
        'md': '501px',
        'lilLogo': '750px',
        'lg': '900px',
        'xl': '1200px',
        
      },
      fontFamily: {
        sans: ['windsor'],
        'Eurostile': ['eurostile'],
        'EuroExtended': ['eurostile-extended']
      },
      gridTemplateColumns: {
        'big': 'repeat(4, 1fr)',
        'small': 'repeat(3, 1fr)',
        'main' : '120px 1fr 1fr 1fr'
      },
      width: {
        'main': 'calc(100% - 60px)',
        'lil' : 'calc(100% - 30px)',

      },
      margin: {
        'main': '0 auto'
      }
    },
  },
  plugins: [],
};
