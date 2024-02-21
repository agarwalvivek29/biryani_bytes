/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
        indie: ['Indie Flower', 'cursive'],
        saira: ['Saira', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

