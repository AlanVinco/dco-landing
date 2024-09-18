/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      "light", // Usa solo el tema claro
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}

