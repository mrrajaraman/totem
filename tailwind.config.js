/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#000000',
        canvas: '#050505',
        surface: {
          50: '#1D1D1D',
          100: '#161616',
          200: '#121212',
          DEFAULT: '#0E0E0E',
          subtle: '#0A0A0A',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.07)',
          DEFAULT: '#222222',
          strong: '#333333',
        },
        electric: {
          DEFAULT: '#39FF14',
          hover: '#32e612',
          subtle: 'rgba(57, 255, 20, 0.12)',
          border: 'rgba(57, 255, 20, 0.28)',
          glow: 'rgba(57, 255, 20, 0.35)',
        },
        muted: {
          DEFAULT: '#A3A3A3',
          dark: '#71717A',
          dim: '#52525B',
        }
      },
      fontFamily: {
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.2em',
        telemetry: '0.15em',
      },
      boxShadow: {
        'electric-sm': '0 0 16px -4px rgba(57, 255, 20, 0.3)',
        'electric-btn': '0 8px 24px -6px rgba(57, 255, 20, 0.35)',
        'card-subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.37), 0 1px 2px -1px rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
