/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          violet: '#7C3AED',
          violetDark: '#6D28D9',
          violetDeep: '#5B21B6',
          lime: '#A3E635',
          limeHover: '#84CC16',
          dark: '#0B071E',
          cardDark: '#150B36',
          cardBorder: '#2E1A66',
        }
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'tactile': '0 4px 0 0 #4C1D95',
        'tactile-lime': '0 4px 0 0 #4D7C0F',
        'tactile-white': '0 4px 0 0 #CBD5E1',
        'tactile-active': '0 0 0 0 #4C1D95',
        'glow-violet': '0 0 50px -10px rgba(124, 58, 237, 0.5)',
        'glow-lime': '0 0 50px -10px rgba(163, 230, 53, 0.4)',
      }
    },
  },
  plugins: [],
}
