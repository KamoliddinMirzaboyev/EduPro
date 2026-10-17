/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FAFAFA',
        surface: '#FFFFFF',
        border: '#E4E4E7',
        primary: {
          DEFAULT: '#0F172A',
          hover: '#1E293B',
          accent: '#2563EB',
          'accent-light': '#EFF6FF',
        },
        zinc: {
          950: '#09090B',
          700: '#3F3F46',
          600: '#52525B',
          500: '#71717A',
          400: '#A1A1AA',
          200: '#E4E4E7',
          100: '#F4F4F5',
          50: '#FAFAFA',
        },
        status: {
          success: { text: '#15803D', bg: '#F0FDF4', border: '#BBF7D0' },
          warning: { text: '#B45309', bg: '#FFFBEB', border: '#FDE68A' },
          danger: { text: '#B91C1C', bg: '#FEF2F2', border: '#FECACA' },
        }
      },
      borderRadius: {
        'md': '6px',
        'lg': '8px',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
