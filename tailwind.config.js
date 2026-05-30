/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'gradient-pan': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'gradient-pan': 'gradient-pan 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        aurora: {
          primary: '#8b5cf6',
          'primary-content': '#ffffff',
          secondary: '#ec4899',
          'secondary-content': '#ffffff',
          accent: '#22d3ee',
          'accent-content': '#06121a',
          neutral: '#1c1830',
          'neutral-content': '#e6e3f0',
          'base-100': '#0f0d18',
          'base-200': '#171428',
          'base-300': '#221d3a',
          'base-content': '#e6e3f0',
          info: '#38bdf8',
          success: '#34d399',
          warning: '#fbbf24',
          error: '#fb7185',
          '--rounded-box': '1.25rem',
          '--rounded-btn': '0.75rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '0.2s',
          '--border-btn': '1px',
        },
      },
      'dark',
    ],
  },
}

