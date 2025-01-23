/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "serif"],
        varela: ["Varela Round", "serif"],
      }
    },
  },
  plugins: [flowbite.plugin()],
}