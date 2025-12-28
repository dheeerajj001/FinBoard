module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#18181B',
        accent: '#06d6a0',
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(0,0,0,0.09)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

