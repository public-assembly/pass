/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          100: '#F4F4F4',
          200: '#F0F4F0',
          300: '#DCE3DC',
          400: '#CCD3CC',
          500: '#A6ACA7',
          600: '#7E8681',
          700: '#59605C',
          800: '#424844',
          900: '#1F2321',
        },
        mint: {
          100: '#BDF1CF',
        },
        error: {
          400: '#F97066',
        },
      },
      fontFamily: {
        Unica77: ['Unica77', 'sans-serif'],
        ibmPlex: ['IBM Plex Mono', 'monospace'],
        VT323: ['VT323', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '4rem',
      },
      letterSpacing: {
        normal: '0',
        wide: '0.5px',
        wider: '0.4px',
      },
      lineHeight: {
        normal: '1.5',
      },
      zIndex: {
        '-1': '-1',
      },

      // tokens
      backgroundColor: {
        primary: '#DCE3DC',
        dim: '#CCD3CC',
        bold: '#BDF1CF',
        invert: '#1F2321',
        invertSecondary: '#424844',
      },
      textColor: {
        primary: '#1F2321',
        secondary: '#59605C',
        invert: '#F4F4F4',
        error: '#F97066',
        disabled: '#A6ACA7',
      },
      borderColor: {
        primary: '#1F2321',
        secondary: '#A6ACA7',
        invert: '#59605C',
        disabled: '#A6ACA7',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
