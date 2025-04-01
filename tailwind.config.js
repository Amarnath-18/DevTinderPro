module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/ui/**/*.{js,ts,jsx,tsx}",
    "./node_modules/daisyui/dist/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
