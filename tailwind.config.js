module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Oswald', 'sans-serif'],
      body: ['Poppins', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      colors: {
        primary: "#00A760",
        primary_light: "#BDD4C3",
        primary_dark: "#2D7F63",
        secondary: "#9D9C9C",
        secondary_dark: "#3C3C3B",
        secondary_light: "#D0D0CF",
      }
    },
  },
  plugins: [],
};
