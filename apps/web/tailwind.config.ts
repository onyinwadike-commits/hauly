import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
      },
    },
  },
  plugins: [],
};

export default config;
