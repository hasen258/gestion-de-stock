/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2F80ED',
          dark: '#2563EB',
        },
        secondary: {
          DEFAULT: '#27AE60',
          dark: '#219A52',
        },
        dark: {
          DEFAULT: '#1F2937',
          lighter: '#374151',
          darker: '#111827',
        }
      },
    },
  },
  plugins: [],
} 