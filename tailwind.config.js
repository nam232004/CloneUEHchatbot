/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#005f69",
        secondary:"#E5E7EB"
      },
    },
  },
  plugins: [],
};

export default config;
