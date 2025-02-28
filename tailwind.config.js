/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#005f69",
        secondary: "#E5E7EB",
        tri: "#F36F32",
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
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp')
  ],
  variants: {
    scrollbar: ['rounded'],
    extend: {
      lineClamp: ['hover']
    }
  }
};

export default config;
