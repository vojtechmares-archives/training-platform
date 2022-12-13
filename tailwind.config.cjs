const colors = require('tailwindcss/colors')
// import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
