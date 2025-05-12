/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse': 'pulse 2s infinite',
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
    screens: {
      'xl': { 'max': '1200px' },
      'lg': { 'max': '1080px' },
      'md-lg': { 'max': '991px' },
      'md': { 'max': '768px' },
      'sm': { 'max': '576px' },
      'xs': { 'max': '480px' },
      '2xs': { 'max': '340px' },
    },
  },
  plugins: [],
};