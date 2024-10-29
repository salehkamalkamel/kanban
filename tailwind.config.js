/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode by adding a class to the root element
  theme: {
    extend: {
      colors: {
        primary: "#635FC7",
        primaryLte: "#A8A4FF",
        black1: "#000112",
        black2: "#20212C",
        black3: "#2B2C37",
        black4: "#3E3F4E",
        gray1: "#828FA3",
        gray2: "#E4EBFA",
        gray3: "#F4F7FD",
        red1: "#EA5555",
        red2: "#FF9898",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"], // Custom font from your design system
      },
      fontSize: {
        xl: ["24px", "30px"], // XL Heading
        lg: ["18px", "23px"], // L Heading
        base: ["13px", "23px"], // Body text (L)
        sm: ["12px", "15px"], // M Heading
      },
      boxShadow: {
        "button-light": "0 4px 6px rgba(99, 95, 199, 0.1)", // Button shadow light mode
        "button-dark": "0 4px 6px rgba(168, 164, 255, 0.2)", // Button shadow dark mode
      },
      borderRadius: {
        button: "8px", // Apply consistent button border-radius
      },
    },
  },
  variants: {
    extend: {
      // Extend variants for dark mode to apply them globally where needed
      backgroundColor: ["dark"],
      textColor: ["dark"],
      borderColor: ["dark"],
      boxShadow: ["dark"],
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
