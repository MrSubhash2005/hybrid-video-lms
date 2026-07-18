/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#070a13',
          panel: '#101622',
          card: '#161f30',
        },
        accent: {
          blue: '#2563eb',
          purple: '#7c3aed',
          cyan: '#0891b2',
          pink: '#db2777',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.15)',
        'glow-cyan': '0 0 20px rgba(8, 145, 178, 0.15)',
      },
    },
  },
  plugins: [],
}
