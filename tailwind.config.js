/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sourGummy: ['"Sour Gummy"', 'sans'],
        airalRoundedMtBold:['"Arial Rounded MT"','"Helvetica Rounded"',"Helvetica",'sans'],
        helvetica:['Helvetica','Helvetica Neue','"Helvetica Rounded"','sans'],
        helveticaRounded:['"Helvetica Rounded"','Helvetica','sans'],
        sevenSegment:['"Segment7"',"Helvetica"]
      },
      keyframes: {
        startCircleTimer: {
          '0%': { strokeDashoffset: 'var(--startOffset, 100)' }, // Fallback to 100 if --startOffset is undefined
          '100%': { strokeDashoffset: 'var(--endOffset, 0)' }, // Fallback to 0 if --endOffset is undefined
        },
      },
      animation: {
        startCircleTimer: 'startCircleTimer var(--startupAnimationDuration, 3s) ease-in-out',
      },
    },
  },
  plugins: [],
};
