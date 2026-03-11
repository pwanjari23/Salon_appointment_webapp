/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          beige: '#F9F5F0',    // Main background
          tan: '#EAE3D9',      // Light bento card
          bronze: '#C4B39C',   // Medium bento card
          olive: '#5F6A53',    // Dark green bento card
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'], // High-end heading font
        sans: ['"Inter"', 'sans-serif'],          // Clean body font
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.perspective-1000': {
          perspective: '1000px',
        },
      });
    },
  ],
}