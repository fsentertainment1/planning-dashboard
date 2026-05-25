/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#060608',
          900: '#0A0A0E',
          800: '#0F0F14',
          700: '#161619',
          600: '#1C1C22',
          500: '#252529',
          400: '#36363D',
          300: '#52525B',
        },
        accent: {
          orange: '#F97316',
          'orange-dim': '#C2410C',
          blue: '#3B82F6',
          'blue-dim': '#1D4ED8',
          green: '#22C55E',
          amber: '#F59E0B',
          red: '#EF4444',
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#CBD5E1',
          muted: '#64748B',
          dim: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern':
          "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23252529' fill-opacity='0.4'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
