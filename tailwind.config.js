/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      keyframes:
      {
        timer:{
          '0%':{strokeDashoffset:0},
          '100%': {strokeDashoffset:56.556636810302734}
        }
      },
      animation:
      {
        timer: 'timer 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}