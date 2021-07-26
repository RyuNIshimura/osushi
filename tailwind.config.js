module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '!./components/organisms/header.js',
  ],
  darkMode: 'class',
  theme: {
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem', 
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      'mobile-input': '16px',
    },
    fontFamily: {
      sans: [
        '-apple-system',
        'blinkmacsystemfont',
        'segoe ui',
        'helvetica',
        'arial',
        'sans-serif',
        'apple color emoji',
        'segoe ui emoji'
      ]
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1120px',
      // => @media (min-width: 1120px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
