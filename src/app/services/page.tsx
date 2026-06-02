"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const services = [
  {
    id: "ia",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "from-primary to-blue-400",
  },
  {
    id: "web",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0 3-4.03 3-9s-1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    color: "from-secondary to-purple-400",
  },
  {
    id: "mobile",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-green-500 to-emerald-400",
  },
  {
    id: "devops",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    color: "from-orange-500 to-amber-400",
  },
  {
    id: "erp",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    color: "from-pink-500 to-rose-400",
  },
  {
    id: "data",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "from-cyan-500 to-teal-400",
  },
  {
    id: "iot",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9l3 3m0 0l-3 3m3-3h4.5M3 19a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    color: "from-violet-500 to-purple-400",
  },
  {
    id: "cm",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    color: "from-rose-500 to-pink-400",
  },
];

const serviceIds = ["ia", "web", "mobile", "devops", "erp", "data", "iot", "cm"] as const;
type ServiceId = typeof serviceIds[number];

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  details: { title: string; items: string[] }[];
}

export default function ServicesPage() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [activeService, setActiveService] = useState<ServiceId>("ia");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const currentServiceData = t.services[activeService as keyof typeof t.services] as ServiceData;

  return (
    <main className={`min-h-screen transition-theme ${isDark ? 'bg-dark-900' : 'bg-light-100'}`}>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className={`absolute inset-0 ${isDark ? 'bg-dark-800/50' : 'bg-light-200/80'}`} />
        
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-float-gentle" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] animate-float-gentle" style={{ animationDelay: "2s" }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center max-w-4xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t.nav.services}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className={isDark ? 'text-white' : 'text-dark-800'}>{t.services.title}</span>
              <span className="text-gradient">{t.services.subtitle}</span>
            </h1>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${isDark ? 'text-white/60' : 'text-dark-600'}`}>
              {t.services.designedDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Services Navigation */}
      <section className="py-8 sticky top-16 z-40 backdrop-blur-lg">
        <div className={`container mx-auto px-6 ${isDark ? 'bg-dark-900/90' : 'bg-light-100/90'}`}>
          <div className="flex flex-wrap justify-center gap-4">
            {serviceIds.map((id) => {
              const serviceData = t.services[id as keyof typeof t.services] as { title: string };
              return (
                <button
                  key={id}
                  onClick={() => setActiveService(id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeService === id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : `${isDark ? 'bg-dark-800 text-white/70 hover:text-white' : 'bg-light-200 text-dark-600 hover:text-dark-800'}`
                  }`}
                >
                  {serviceData.title}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Details */}
      {currentServiceData && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            {/* Service Header */}
            <div className={`text-center max-w-4xl mx-auto mb-12 p-8 rounded-2xl ${isDark ? 'bg-dark-800/50 border border-white/5' : 'bg-light-200 border border-dark-200'}`}>
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${services.find(s => s.id === activeService)?.color} mb-6`}>
                <div className="text-white w-12 h-12">
                  {services.find(s => s.id === activeService)?.icon}
                </div>
              </div>
              <span className="text-sm font-medium text-primary mb-2 block">{currentServiceData.subtitle}</span>
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-dark-800'}`}>
                {currentServiceData.title}
              </h2>
              <p className={`text-lg ${isDark ? 'text-white/60' : 'text-dark-600'}`}>
                {currentServiceData.description}
              </p>
            </div>

            {/* Service Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentServiceData.details.map((detail: { title: string; items: string[] }, index: number) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1 ${isDark ? 'bg-dark-800/50 border border-white/5 hover:border-primary/30' : 'bg-light-200 border border-dark-200 hover:border-primary/30'}`}
                >
                  <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-dark-800'}`}>
                    {detail.title}
                  </h3>
                  <ul className="space-y-2">
                    {detail.items.map((item, idx) => (
                      <li key={idx} className={`flex items-start gap-3 ${isDark ? 'text-white/60' : 'text-dark-600'}`}>
                        <svg className="w-5 h-5 text-gradient flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl ${isDark ? 'bg-dark-800/50 border-white/5' : 'bg-light-200 border-dark-200'} border`}>
            {[
              { value: "+30", label: t.services.stats.clients },
              { value: "+85", label: t.services.stats.projects },
              { value: "7+", label: t.services.stats.countries },
              { value: "24/7", label: t.services.stats.support },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className={`text-sm ${isDark ? 'text-white/50' : 'text-dark-600'}`}>{stat.label}</div>
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
                {t.services.designed}
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                {t.services.designedDesc}
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white rounded-xl text-primary font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {t.services.cta}
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
