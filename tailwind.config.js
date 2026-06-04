/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'Apple SD Gothic Neo', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
