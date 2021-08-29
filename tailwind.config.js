module.exports = {
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  /* optimize for fast reload, dropping all non essential utility classes*/
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: {
        standard: ['outline-none'],
      },
    },
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        '8xl': '1920px', // custom screen size
      },

      height: {
        'video': "40rem",
      },

      colors: {
        // Configure your color palette here
        'brand': "#42BFDD",
        'brand-dim': "#BBE6E4",
        'brand-white': "#FFFFFF",
        'brand-gray': "#F0F6F6",
        'brand-blue': "#0052CC",
        'custom-green': "#19857b",
        'custom-green-deep': "#037c70",
        gray: {
          800: "#424242",
          900: "#303030",
        }
      },
      backgroundImage: theme => ({
        'auth-landing': "url('https://source.unsplash.com/random')",
        'sign-up': "url('https://source.unsplash.com/random')",
        'sign-in': "url('https://source.unsplash.com/random')",
      }),

      'animation': {
        'gradient-x':'gradient-x 15s ease infinite',
        'gradient-y':'gradient-y 15s ease infinite',
        'gradient-xy':'gradient-xy 15s ease infinite',
      },

      'keyframes': {
        'gradient-y': {
          '0%, 100%': {
            'background-size':'400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size':'200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size':'200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size':'200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size':'400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size':'200% 200%',
            'background-position': 'right center'
          }
        }
      }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
