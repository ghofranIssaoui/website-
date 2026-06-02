"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const steps = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    color: "primary",
    delay: "0ms",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "secondary",
    delay: "200ms",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    color: "green",
    delay: "400ms",
  },
];

export default function HowItWorks() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-primary/10",
          text: "text-primary",
          border: "border-primary/30",
          gradient: "from-primary to-blue-400",
        };
      case "secondary":
        return {
          bg: "bg-secondary/10",
          text: "text-secondary",
          border: "border-secondary/30",
          gradient: "from-secondary to-purple-400",
        };
      case "green":
        return {
          bg: "bg-green-500/10",
          text: "text-green-500",
          border: "border-green-500/30",
          gradient: "from-green-500 to-emerald-400",
        };
      default:
        return {
          bg: "bg-primary/10",
          text: "text-primary",
          border: "border-primary/30",
          gradient: "from-primary to-blue-400",
        };
    }
  };

  return (
    <section ref={ref} className="py-24 relative overflow-hidden transition-theme">
      {/* Background */}
      <div className={`absolute inset-0 ${isDark ? 'bg-dark-900' : 'bg-light-100'}`} />
      
      {/* Animated Decorative Elements */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl animate-float-gentle" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-secondary/5 to-transparent rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: "2s" }} />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${i % 2 === 0 ? 'bg-primary/30' : 'bg-secondary/30'} dark:block hidden`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-gentle ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 animate-pulse-scale ${isDark ? 'bg-secondary/10 text-secondary' : 'bg-secondary/10 text-secondary'}`}>
            {t.howItWorks.title}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className={isDark ? 'text-white' : 'text-dark-800'}>{t.howItWorks.subtitle}</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 via-secondary/50 to-green-500/50 -translate-y-1/2 z-0 animate-pulse" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const colors = getColorClasses(step.color);
              return (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: step.delay }}
                >
                  <div className="relative z-10 text-center lg:text-center group">
                    {/* Step Number Badge */}
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${colors.bg} border ${colors.border} mb-6 mx-auto lg:mx-auto group-hover:scale-110 transition-transform duration-300 hover:shadow-lg`}>
                      <div className={`bg-gradient-to-br ${colors.gradient} p-4 rounded-xl group-hover:rotate-6 transition-transform duration-300`}>
                        <div className="text-white animate-pulse-scale">
                          {step.icon}
                        </div>
                      </div>
                    </div>

                    {/* Step Number */}
                    <span className={`absolute top-0 right-0 lg:right-auto lg:left-0 text-6xl font-bold ${colors.text} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}>
                      0{index + 1}
                    </span>

                    {/* Content */}
                    <h3 className={`text-xl font-bold mb-4 group-hover:text-gradient transition-all duration-300 ${isDark ? 'text-white' : 'text-dark-800'}`}>
                      {t.howItWorks.steps[index].title}
                    </h3>
                    <p className={`max-w-sm mx-auto transition-colors duration-300 ${isDark ? 'text-white/50 group-hover:text-white/70' : 'text-dark-600 group-hover:text-dark-800'}`}>
                      {t.howItWorks.steps[index].description}
                    </p>

                    {/* Arrow (hidden on mobile, shown between items on desktop) */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-20 animate-slide-in-right" style={{ animationDelay: `${index * 200 + 500}ms` }}>
                        <div className={`w-12 h-12 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center animate-bounce-slow`}>
                          <svg className={`w-5 h-5 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
          {[
            { value: "85%", label: t.howItWorks.stats.timeSaved, icon: "⚡", delay: "0ms" },
            { value: "92%", label: t.howItWorks.stats.matchingPrecision, icon: "🎯", delay: "100ms" },
            { value: "24/7", label: t.howItWorks.stats.aiSupport, icon: "🤖", delay: "200ms" },
            { value: "3x", label: t.howItWorks.stats.moreApplications, icon: "📈", delay: "300ms" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-2xl border hover:-translate-y-1 hover:shadow-xl transition-all duration-300 animate-float-gentle ${isDark ? 'bg-dark-800/50 border-white/5' : 'bg-light-100 border-dark-200'}`}
              style={{ animationDelay: stat.delay }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className={`text-sm ${isDark ? 'text-white/50' : 'text-dark-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
