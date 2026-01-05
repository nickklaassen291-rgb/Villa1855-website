import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Villa 1855 Primary Colors
        primary: {
          darkest: '#102B2A',
          dark: '#405656',
          DEFAULT: '#6F8281',
          light: '#9FADAD',
          lighter: '#CED8D8',
          lightest: '#E7ECEC',
        },
        // Accent Color (Koper)
        accent: {
          DEFAULT: '#B58C67',
          hover: '#9A7555',
        },
        // Neutrals
        offwhite: '#F5F7F8',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Lora', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Public Sans', '-apple-system', 'sans-serif'],
        script: ['var(--font-script)', 'Great Vibes', 'cursive'],
      },
      spacing: {
        'section': '6rem',
      },
      maxWidth: {
        'container': '1200px',
      },
      boxShadow: {
        'soft': '0 10px 40px rgba(16, 43, 42, 0.1)',
        'strong': '0 20px 60px rgba(16, 43, 42, 0.15)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
