/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        polati: {
          blue: '#2563EB',
          'blue-dark': '#1D4ED8',
          orange: '#F97316',
          green: '#22C55E',
          'text-primary': '#1E293B',
          'text-secondary': '#64748B',
          'bg-light': '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
