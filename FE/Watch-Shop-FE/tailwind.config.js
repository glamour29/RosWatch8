/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  darkMode: ['class', '[data-theme="dark"]'],

  theme: {
    extend: {
      colors: {
        'main-red': '#2d2d2e',
        'main-black': '#354458',
      },
      width: {
        container: '1300px',
        '380px': '380px',
      },
      height: {
        header: '80px',
      },
      margin: {
        '380px': '380px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
};
