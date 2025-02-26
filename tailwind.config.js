/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#005f69",
        secondary: "#E5E7EB",
        messageUser: "#D1FAE5",
      },
      scrollbar: {
        none: {
          scrollbar: {
            display: 'none',
          },
          '::-webkit-scrollbar': {
            display: 'none',
          },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded']
  }
};

export default config;
