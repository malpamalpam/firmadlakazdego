import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00BBFF",
        "primary-alt": "#33C9FF",
        secondary: "#4E459D",
        "secondary-alt": "#5A50AD",
        body: "#5A5A5A",
        heading: "#000000",
        muted: "#9b9b9b",
        gray: "#dadada",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1.25rem",
        screens: {
          sm: "100%",
          md: "100%",
          lg: "960px",
          xl: "1200px",
          "2xl": "1320px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
