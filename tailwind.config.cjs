/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0a0e3d",
          deep: "#05061f",
          panel: "#0d1030",
          panel2: "#141838",
          line: "#23274d",
        },
        gold: {
          DEFAULT: "#f5c518",
          dim: "#8a6d10",
        },
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
