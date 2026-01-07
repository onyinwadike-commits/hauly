/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./contexts/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        navy: '#1E3A5F',
        copper: '#C27D4B',
        charcoal: '#3D3D3D',
        'light-gray': '#F8F8F8',
        'border-gray': '#E5E5E5',
        'error-red': '#DC2626',
        'success-green': '#16A34A',
        'warning-yellow': '#FCD34D',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
