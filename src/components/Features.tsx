"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "@/context/ThemeContext"
import { useLanguage } from "@/context/LanguageContext"

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "from-primary to-blue-400",
    delay: "0ms",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "from-secondary to-purple-400",
    delay: "100ms",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-green-500 to-emerald-400",
    delay: "200ms",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "from-orange-500 to-amber-400",
    delay: "300ms",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "from-pink-500 to-rose-400",
    delay: "400ms",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-cyan-500 to-teal-400",
    delay: "500ms",
  },
]

export default function Features() {
  const [visible, setVisible] = useState(false)
  const { isDark } = useTheme()
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-24 relative transition-all duration-500">
      <div className={`absolute inset-0 transition-all duration-500 ${isDark ? "bg-dark-800/50" : "bg-light-200/80"}`} />
      {isDark && (
        <>
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-float-gentle" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] animate-float-gentle" style={{ animationDelay: "2s" }} />
        </>
      )}

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 animate-pulse-scale ${isDark ? "bg-primary/10 text-primary" : "bg-primary/20 text-primary"}`}>
            {t.features.title}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className={isDark ? "text-white" : "text-dark-800"}>{t.features.titlePrefix}</span>
            <span className="text-gradient">{t.features.subtitle}</span>
            <span className={isDark ? "text-white" : "text-dark-800"}>{t.features.titleSuffix}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-2xl transition-all duration-500 hover:-translate-y-2 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } ${isDark ? "bg-dark-800/50 border-white/5 hover:border-primary/30" : "bg-light-100 border-dark-200 hover:border-primary/30"}`}
              style={{ transitionDelay: feature.delay, borderWidth: "1px", borderStyle: "solid" }}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <div className="text-white">{feature.icon}</div>
              </div>

              <h3 className={`text-xl font-semibold mb-3 group-hover:text-gradient transition-all ${isDark ? "text-white" : "text-dark-800"}`}>
                {t.features.items[index].title}
              </h3>
              <p className={`transition-colors ${isDark ? "text-white/50 group-hover:text-white/70" : "text-dark-600 group-hover:text-dark-800"}`}>
                {t.features.items[index].description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
