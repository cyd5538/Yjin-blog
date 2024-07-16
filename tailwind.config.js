const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    "./posts/**/*.{mdx}"
	],
  theme: {
    fontFamily: {
      HakgyoansimWoojuR: ["HakgyoansimWoojuR"],
      Pretendard: ["Pretendard"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      textShadow: {
        base: '0 4px 8px var(--tw-shadow-color)',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              'font-size': '1.8em'
            },
            h2: {
              'font-size': '1.6em'
            },
            h3: {
              'font-size': '1.3em'
            },
            u : {
              'text-decoration-style': 'solid',
              'text-underline-offset' : "0.2em",
              'text-underline-offset': '8px'
            },
            'blockquote': {
              overflow: 'hidden', 
            },
            p: {
              'font-size': '1.1em'
            },
            li: {
              'font-size': '1.0em'
            },
            span: {
              'font-size': '1.1em'
            },
            
            blockquote: {
              "border-left-color": "rgb(139,92,246)",
            },
            'blockquote p::before': {
              content: "''", 
            },
            a: {
             "text-decoration": "none",
             'font-size': '0.8rem'
            },
          },
        },
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
  require("tailwindcss-animate"), 
  require('@tailwindcss/typography'), 
  plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        'text-shadow': (value) => ({
          textShadow: value,
        }),
      },
      { values: theme('textShadow') }
    )
  })],
}