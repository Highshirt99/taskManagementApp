/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  
    extend: {
   
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'purple-dark': '#635FC7',
        'purple-light': '#A8A4FF',
        'black': '#000112',
        'gray-darker': '#20212C',
        'gray-dark': '#2B2C37',
        'gray-medium': '#3E3F4E',
        'gray-light': '#828FA3',
        'blue-lightest': '#E4EBFA',
        'blue-lighter': '#F4F7FD',
        'white': '#FFFFFF',
        'red': '#EA5555',
        'red-light': '#FF9898',
      },


    },
  },
  plugins: [],
}
