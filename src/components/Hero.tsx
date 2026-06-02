"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-500">
      {/* Background */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${isDark ? 'bg-dark-900' : 'bg-light-100'}`} 
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, ${isDark ? '0.1' : '0.05'}) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, ${isDark ? '0.1' : '0.05'}) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          opacity: isDark ? 0.1 : 0.3
        }} />
      </div>

      {/* Floating Particles - Only in Dark Mode */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-gentle ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className={`flex-1 text-center lg:text-left fade-in-up ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* Logo */}
            <div className="mb-8">
              <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full font-medium transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/80' : 'bg-light-300/80 border border-light-400 text-dark-800'}`}>
                <img src="/13.png" alt="3LMSolutions" className="w-16 h-16" />
                <span>{t.hero.subtitle}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className={`animate-fade-in-left inline-block ${isDark ? 'text-white' : 'text-dark-800'}`}>{t.hero.title1}</span>
              <span className="text-gradient animate-fade-in-scale inline-block">{t.hero.title2}</span>
              <br />
              <span className={`animate-fade-in-right inline-block ${isDark ? 'text-white' : 'text-dark-800'}`}>{t.hero.title3}</span>
              <span className="text-gradient animate-pulse-scale inline-block">{t.hero.title4}</span>
            </h1>

            {/* Description */}
            <p className={`text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up ${isDark ? 'text-white/70' : 'text-dark-600'} ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
              {t.hero.description}
            </p>

            {/* CTA Button */}
            <button
              onClick={() => router.push("/login")}
              className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 overflow-hidden animate-fade-in-up hover:scale-105"
              style={{ animationDelay: '0.2s' }}
            >
              <span className="relative z-10 flex items-center gap-3 text-white">
                {t.hero.connect}
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 mt-12">
              {[
                { value: "+85", label: t.hero.projects },
                { value: "+30", label: t.hero.clients },
                { value: "7+", label: t.hero.countries },
              ].map((stat, index) => (
                <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className={`text-sm ${isDark ? 'text-white/50' : 'text-dark-500'}`}>{stat.label}</div>
                </div>
              ))}
              <div className="hidden lg:block w-px h-12" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : '#D1D5DB' }} />
            </div>
          </div>

          {/* Right Content - 3D Phone */}
          <div className={`flex-1 perspective-1000 flex justify-center fade-in-up ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="phone-container relative">
              {/* Blue Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full blur-[80px] animate-pulse" />
              
              {/* Phone Frame */}
              <div className={`relative w-[280px] md:w-[320px] h-[580px] md:h-[660px] rounded-[3rem] p-3 transition-all ${isDark ? 'bg-dark-800 border-white/10' : 'bg-light-100 border-light-300 border-2'}`}>
                <img 
                  src={isDark ? "/123.jpg" : "/1234.jpeg"} 
                  alt="SmartRecruitAI Signup" 
                  className="w-full h-full object-cover rounded-[2.5rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className={`w-6 h-10 rounded-full flex justify-center pt-2 ${isDark ? 'border-white/30 bg-transparent' : 'border-dark-300 bg-dark-800/10'}`}>
          <div className={`w-1.5 h-3 rounded-full animate-bounce ${isDark ? 'bg-white/50' : 'bg-dark-600'}`} />
        </div>
      </div>
    </section>
  );
}
