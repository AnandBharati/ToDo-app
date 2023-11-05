/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [{
      "light": {
        "primary": "#2c1fba",
        "secondary": "#8c021e",
        "accent": "#e27b04",
        "neutral": "#161722",
        "base-100": "#f1f0f5",
        "info": "#5ea8e8",
        "success": "#4ddb8a",
        "warning": "#ecc113",
        "error": "#dc3532",
        "dark": "#000"
      }
    },
    {
      "dark": {
        "primary": "#1eb854",
        "secondary": "#1db990",
        "accent": "#1db9ac",
        "neutral": "#dbeafe",
        "base-100": "#171212",
        "info": "#3abff8",
        "success": "#36d399",
        "warning": "#fbbd23",
        "error": "#f87272",
      }
    }
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}

