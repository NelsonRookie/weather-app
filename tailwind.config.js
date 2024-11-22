/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#f9fafb', // Soft off-white for a clean look
          primary: '#6366f1',    // Indigo blue for accents
          secondary: '#818cf8',  // Softer indigo for secondary elements
          text: '#1f2937',       // Dark gray for text
          muted: '#9ca3af',      // Light gray for muted elements
          border: '#e5e7eb',     // Subtle gray for borders
        },
        dark: {
          background: '#1e293b', // Deep slate for background
          primary: '#60a5fa',    // Sky blue for accents
          secondary: '#3b82f6',  // Bright blue for secondary elements
          text: '#f8fafc',       // Off-white for text
          muted: '#6b7280',      // Muted gray for secondary elements
          border: '#374151',     // Subtle dark gray for borders
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}