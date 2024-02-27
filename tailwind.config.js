/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "auth-background": "url('/src/assets/images/background.png')",
      },
      colors: {
        primary: {
          1: "var(--primary-color-1)",
          2: "var(--primary-color-2)",
          3: "var(--primary-color-3)",
          4: "var(--primary-color-4)",
        },
        "primary-text": "var(--primary-text-color)",
        "secondary-text": "var(--secondary-text-color)",
        secondary: {
          1: "var(--secondary-color-1)",
          2: "var(--secondary-color-2)",
          3: "var(--secondary-color-3)",
          4: "var(--secondary-color-4)",
        },
        background: "var(--background-color)",
        gray: {
          1: "var(--gray-color-1)",
          2: "var(--gray-color-2)",
          3: "var(--gray-color-3)",
          4: "var(--gray-color-4)",
          5: "var(--gray-color-5)",
        },
        black: "var(--black-color)",
        white: "var(--white-color)",
        risk: {
          1: "var(--risk-color-1)",
          2: "var(--risk-color-2)",
          3: "var(--risk-color-3)",
          4: "var(--risk-color-4)",
        },
        green: "var(--green-color)",
        link: "var(--link-color)",
        success: "var(--success-color)",
        info: "var(--info-color)",
        error: {
          1: "var(--error-color-1)",
          2: "var(--error-color-2)",
        },
        event: "var(--event-color)",
        disabled: "var(--disabled-color)",
        "disabled-cta": "var(--disabled-cta-color)",
      },
      borderColor: {
        success: "var(--success-border-color)",
        info: "var(--info-border-color)",
        error: "var(--error-border-color)",
        event: "var(--event-border-color)",
        hover: "var(--hover-border-color)",
        focus: "var(--focus-border-color)",
        disabled: "var(--disabled-border-color)",
        "disabled-cta": "var(--disabled-cta-border-color)",
      },
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        input: "0px 2px 16px 0px rgba(36, 38, 41, 0.04)",
        toast: "0px 10px 10px 0px rgba(0, 97, 170, 0.10)",
        dropdown: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@headlessui/tailwindcss"),
  ],
};
