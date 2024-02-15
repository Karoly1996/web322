/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.html`],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["luxury"],
  },
  plugins: [
    require('@tailwindcss/typography'), 
    require('daisyui'),
  ],
}

