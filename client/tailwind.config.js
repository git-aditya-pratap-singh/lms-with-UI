/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ring: "var(--ring)",
      },
      screens: {
        'monitor': { 'max': '1535px' },
       
        'tablet': { 'min': '441px', 'max': '1068px' },

        'phone': { 'max': '420px' },
      }
    },
  },
  plugins: [require('daisyui')],
}