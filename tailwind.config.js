/** @type {import('tailwindcss').Config} */
import tailwindcss from '@tailwindcss/vite'

export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
      "./node_modules/daisyui/**/**/*.{js,jsx,ts,tsx}", // Add your component library here
    ],
    theme: {
      extend: {},
    },
    plugins: [
        tailwindcss(),
    ],
  };
  