// tailwind.config.js
module.exports = {
    content: [
      "./App.{js,jsx,ts,tsx}",
      "./app/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          coppel: {
            primary: '#E40521', // Rojo Coppel
            secondary: '#002D72', // Azul Coppel
            light: '#F5F5F5',
            dark: '#333333'
          }
        }
      },
    },
    plugins: [],
  }