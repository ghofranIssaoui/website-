"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative w-14 h-14 rounded-full
        flex items-center justify-center
        transition-all duration-300 ease-out
        hover:scale-110 active:scale-95
        ${isAnimating ? "rotate-180" : "rotate-0"}
        ${isDark 
          ? 'bg-dark-800 border border-white/10 hover:bg-dark-700' 
          : 'bg-light-200 border border-light-400 hover:bg-light-300'
        }
        shadow-lg hover:shadow-xl
        cursor-pointer
      `}
      aria-label="Toggle theme"
    >
      {/* Background Glow */}
      <div 
        className={`
          absolute inset-0 rounded-full
          transition-all duration-300
          ${isDark 
            ? 'bg-gradient-to-br from-primary/20 to-secondary/20' 
            : 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20'
          }
        `}
      />

      {/* Sun Icon - shown in light mode */}
      <svg
        className={`
          absolute w-7 h-7
          transition-all duration-300 ease-out
          ${isDark 
            ? 'opacity-0 rotate-90 scale-50 text-yellow-400' 
            : 'opacity-100 rotate-0 scale-100 text-orange-500'
          }
        `}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon Icon - shown in dark mode */}
      <svg
        className={`
          absolute w-7 h-7
          transition-all duration-300 ease-out
          ${isDark 
            ? 'opacity-100 rotate-0 scale-100 text-blue-400' 
            : 'opacity-0 -rotate-90 scale-50 text-blue-300'
          }
        `}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div 
          className={`
            absolute top-1 right-1 w-1.5 h-1.5 rounded-full
            transition-all duration-300
            ${isDark ? 'bg-primary' : 'bg-orange-400'}
          `}
        />
        <div 
          className={`
            absolute bottom-2 left-1 w-1 h-1 rounded-full
            transition-all duration-300
            ${isDark ? 'bg-secondary' : 'bg-yellow-400'}
          `}
        />
      </div>
    </button>
  );
}
