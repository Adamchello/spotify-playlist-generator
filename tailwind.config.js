/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          200: '#3DE176',
          300: '#2BDE6A',
          400: '#21D460',
          500: '#1DB954',
          600: '#1CB050',
          700: '#199F48',
          800: '#168D40',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
