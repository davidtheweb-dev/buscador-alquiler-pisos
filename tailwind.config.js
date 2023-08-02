/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'color-white-100': '#ffffff',
        'color-surface-100': '#121212',
        'color-surface-200': '#282828',
        'color-surface-250': '#343434',
        'color-surface-300': '#3f3f3f',
        'color-surface-400': '#575757',
        'color-surface-500': '#717171',
        'color-surface-600': '#8b8b8b',
        'color-primary-100': '#cb0017',
        'color-primary-200': '#d63a2e',
        'color-primary-300': '#df5846',
        'color-primary-400': '#e8725e',
        'color-primary-500': '#ef8a77',
        'color-primary-600': '#f5a291',
        'color-overlay-100': '#000000bf',
        'color-overlay-200': '#0009',
      },
    },
  },
  plugins: [],
};
