const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    maxHeight: {
      0: "0",
      "1/4": "25vh",
      "1/2": "50vh",
      "3/4": "75vh",
      full: "100vh",
    },
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
    },
    colors: {
      // Build your palette here
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      trueGray: colors.trueGray,
      blueGray: colors.blueGray,
      coolGray: colors.coolGray,
      warmGray: colors.warmGray,
      violet: colors.violet,
      purple: colors.purple,
      // fuchsia: colors.fuchsia,
      indigo: colors.indigo,
      blue: colors.blue,
      cyan: colors.cyan,
      sky: colors.sky,
      green: colors.green,
      teal: colors.teal,
      emerald: colors.emerald,
      yellow: colors.yellow,
      // amber: colors.amber,
      red: colors.red,
      // pink: colors.pink,
      // rose: colors.rose,
      primary: {
        0: "#1e1e24",
        100: "#1b1b20",
        200: "#18181d",
        300: "#151519",
        400: "#121216",
        500: "#0f0f12",
        600: "#0c0c0e",
        700: "#09090b",
        800: "#060607",
        900: "#030304",
        "light-0": "#25252D",
        "light-100": "#2A2A32",
      },
      accent: {
        0: "#00C6C3",
        500: "#158582",
      },
    },
    extend: {
      width: {
        half: "50vw",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["focus", "checked"],
    },
    borderWidth: ["hover", "focus"],
    display: ["group-hover", "responsive"],
    transitionProperty: ["responsive", "motion-safe", "motion-reduce"],
  },

  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
