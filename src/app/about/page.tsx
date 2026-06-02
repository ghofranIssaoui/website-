"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const stats = [
  { value: "+30", key: "clients" as const },
  { value: "+85", key: "projects" as const },
  { value: "7+", key: "countries" as const },
  { value: "10+", key: "experts" as const },
];

const valueIcons = [
  <svg key="reliability" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="reactivity" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
  <svg key="security" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>,
];

export default function AboutPage() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  const valueKeys = ["reliability", "reactivity", "security"] as const;

  return (
    <main className={`min-h-screen transition-theme ${isDark ? 'bg-dark-900' : 'bg-light-100'}`}>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className={`absolute inset-0 ${isDark ? 'bg-dark-800/50' : 'bg-light-200/80'}`} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center max-w-4xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t.nav.about}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className={isDark ? 'text-white' : 'text-dark-800'}>About </span>
              <span className="text-gradient">Us</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-dark-800'}`}>
                {t.about.whoWeAre}
              </h2>
              <div className={`space-y-4 ${isDark ? 'text-white/60' : 'text-dark-600'}`}>
                <p>{t.about.whoWeAreDesc1}</p>
                <p>{t.about.whoWeAreDesc2}</p>
                <p>{t.about.whoWeAreDesc3}</p>
              </div>
            </div>
            
            <div className={`flex justify-center transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
              <img src="/13.png" alt="3LMSolutions" className="w-48 h-48" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl border transition-all duration-500 hover:-translate-y-1 ${isDark ? 'bg-dark-800 border-white/5' : 'bg-light-200 border-dark-200'} ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className={isDark ? 'text-white/50' : 'text-dark-600'}>{t.about.stats[stat.key]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-dark-800'}`}>{t.about.values.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {valueKeys.map((key, index) => (
              <div
                key={key}
                className={`text-center p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${isDark ? 'bg-dark-800 border-white/5' : 'bg-light-200 border-dark-200'} ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6">
                  <div className="text-white">
                    {valueIcons[index]}
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-dark-800'}`}>{t.about.values[key]}</h3>
                <p className={isDark ? 'text-white/50' : 'text-dark-600'}>{t.about.values[`${key}Desc` as keyof typeof t.about.values]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="relative p-12 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t.about.cta.title}
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                {t.about.cta.description}
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white rounded-xl text-primary font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {t.about.cta.button}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
