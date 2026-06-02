import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#8B5CF6",
        dark: {
          900: "#0A0A0A",
          800: "#1A1A1A",
          700: "#2A2A2A",
          600: "#3A3A3A",
        },
        light: {
          100: "#FFFFFF",
          200: "#F9FAFB",
          300: "#F3F4F6",
          400: "#E5E7EB",
          500: "#D1D5DB",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient-dark": "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)",
        "hero-gradient-light": "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 50%, #FFFFFF 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "rotate-slow": "rotateSlow 20s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "bounce-slow": "bounceSlow 3s ease-in-out infinite",
        "spin-slow": "spinSlow 8s linear infinite",
        "fade-in": "fadeIn 1s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "slide-in-left": "slideInLeft 0.8s ease-out forwards",
        "slide-in-right": "slideInRight 0.8s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "wave": "wave 1.5s ease-in-out infinite",
        "ripple": "ripple 1s linear infinite",
        "tilt": "tilt 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotateY(-15deg) rotateX(5deg)" },
          "50%": { transform: "translateY(-20px) rotateY(-10deg) rotateX(0deg)" },
        },
        rotateSlow: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        wave: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(20deg)" },
          "75%": { transform: "rotate(-20deg)" },
        },
        ripple: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        tilt: {
          "0%, 100%": { transform: "rotateX(0deg) rotateY(0deg)" },
          "25%": { transform: "rotateX(5deg) rotateY(5deg)" },
          "50%": { transform: "rotateX(0deg) rotateY(0deg)" },
          "75%": { transform: "rotateX(-5deg) rotateY(-5deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
