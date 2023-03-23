/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  safelist: [
    {
      pattern: /(border|text)-(blue|gray|green|orange|pink|red|yellow)-500/
    }
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
