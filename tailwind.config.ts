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
        gov: {
          navy: {
            900: '#0B2A5B',
            800: '#0e346f',
            700: '#14438c',
            600: '#1a52aa',
            500: '#1F4E9C',
          },
          blue: {
            50: '#f0f5ff',
            100: '#e0ecff',
            500: '#1F4E9C',
            600: '#1F4E9C',
            700: '#1F4E9C',
            800: '#183e7d',
            900: '#0B2A5B',
          },
          saffron: {
            50: '#fff7ed',
            100: '#ffedd5',
            500: '#F58220',
            600: '#ea580c',
            700: '#c2410c',
          },
          teal: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
          },
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
          },
          red: {
            50: '#fef2f2',
            100: '#fee2e2',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c',
          },
        },
        blue: {
          50: '#f0f5ff',
          100: '#e0ecff',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1F4E9C',
          700: '#1F4E9C',
          800: '#183e7d',
          900: '#0B2A5B',
        },
      },
    },
  },
  plugins: [],
};

export default config;
