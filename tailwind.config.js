import { nextui } from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      "roya": {
        extend: "dark", // <- inherit default values from dark theme
        colors: {
          background: "#0D001A",
          foreground: "#ffffff",
          default: {
            100: "#180D2688",
            200: "#22152E88",
            300: "#30223988",
            400: "#3E314488",
            500: "#4D445088",
            600: "#92859688",
            700: "#C8B8CA88",
            800: "#ECDFED88",
            900: "#F6EEF688",
            DEFAULT: "#4D445088",
            foreground: "#ffffff",
          },
          primary: {
            50: "#3B096C",
            100: "#190B30",
            200: "#24133A",
            300: "#331E48",
            400: "#432C56",
            500: "#553D64",
            600: "#9272A2",
            700: "#C39FD0",
            800: "#E7CAEF",
            900: "#F4E3F7",
            DEFAULT: "#9272A2",
            foreground: "#ffffff",
          },
          faded: {
            900: "#180D2688",
            800: "#22152E88",
            700: "#30223988",
            600: "#3E314488",
            500: "#4D445088",
            400: "#92859688",
            300: "#C8B8CA88",
            200: "#ECDFED88",
            100: "#F6EEF688",
            DEFAULT: "#ECDFED88",
            foreground: "#ffffff",
          },
        },
      },
    },
  })]
};
