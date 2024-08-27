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
      },
      // animation: {
      //   slideDown: 'slideDown 1s ease-out',
      // },
      // keyframes: {
      //   slideDown: {
      //     '0%': { transform: 'translateY(-20px)', opacity: '0' },
      //     '100%': { transform: 'translateY(0)', opacity: '1' },
      //   },
      // },
    },
  },
  plugins: [require('daisyui')],
}