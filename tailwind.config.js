/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html'],
  theme: {
    fontFamily: {
      sans: ['"Noto Sans Display', '"Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
