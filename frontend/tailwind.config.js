/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        bounce: "bounce 2s infinite",
        bounce2: "bounce 2s infinite 0.2s",
        bounce3: "bounce 2s infinite 0.4s",
      },
    },
  },
  plugins: [],
};
