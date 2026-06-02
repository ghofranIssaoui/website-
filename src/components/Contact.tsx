"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.errors?.[0]?.message || data.message || "Failed to send message");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const bgClass = isDark ? "bg-dark-800/50" : "bg-light-200/80";
  const textPrimary = isDark ? "text-white" : "text-dark-800";
  const textSecondary = isDark ? "text-white/60" : "text-dark-600";
  const textMuted = isDark ? "text-white/50" : "text-dark-500";

  return (
    <section ref={ref} id="contact" className="py-24 relative transition-theme">
      <div className={`absolute inset-0 ${bgClass}`} />

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-[100px] animate-float-gentle" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-float-gentle" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 animate-pulse-scale ${isDark ? "bg-green-500/10 text-green-500" : "bg-green-500/10 text-green-600"}`}>
              {t.nav.contactUs}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className={textPrimary}>{t.contact.title}</span>
              <span className="text-gradient">{t.contact.subtitle}</span>
              <span className={textPrimary}>{t.contact.titleEnd}</span>
            </h2>
            <p className={`text-lg mb-8 ${textSecondary}`}>
              {t.contact.description}
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: "phone", label: t.contact.phone, value: "+216 56 566 533", colorClass: isDark ? "bg-primary/10 text-primary" : "bg-primary/10 text-primary", delay: "0ms" },
                { icon: "mail", label: t.contact.email, value: "contact@3lmsolutions.net", colorClass: isDark ? "bg-secondary/10 text-secondary" : "bg-secondary/10 text-secondary", delay: "100ms" },
                { icon: "location", label: t.contact.address, value: "Av. 18 Janvier, Arian Center Esc. C Bureau C408, Ariana", colorClass: isDark ? "bg-green-500/10 text-green-500" : "bg-green-500/10 text-green-600", delay: "200ms" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: item.delay }}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center animate-float-gentle ${item.colorClass.split(" ")[0]}`}>
                    {item.icon === "phone" && (
                      <svg className={`w-6 h-6 ${item.colorClass.split(" ")[1]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    )}
                    {item.icon === "mail" && (
                      <svg className={`w-6 h-6 ${item.colorClass.split(" ")[1]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    {item.icon === "location" && (
                      <svg className={`w-6 h-6 ${item.colorClass.split(" ")[1]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className={`text-sm ${textMuted}`}>{item.label}</p>
                    <p className={`font-medium ${textPrimary}`}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {["linkedin", "twitter", "instagram", "facebook"].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 hover:scale-110 animate-fade-in-up ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white" : "bg-dark-100/50 border-dark-200 hover:bg-dark-200/50 text-dark-600 hover:text-dark-800"}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {social === "linkedin" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  )}
                  {social === "twitter" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  )}
                  {social === "instagram" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )}
                  {social === "facebook" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`} style={{ transitionDelay: "200ms" }}>
            <form onSubmit={handleSubmit} className={`p-8 rounded-2xl border animate-float-gentle ${isDark ? "bg-dark-800/50 border-white/5" : "bg-light-100 border-dark-200"}`}>
              <div className="space-y-6">
                {[
                  { label: t.contact.name, type: "text", placeholder: t.contact.namePlaceholder, key: "name" },
                  { label: t.contact.email, type: "email", placeholder: t.contact.emailPlaceholder, key: "email" },
                  { label: t.contact.subject, type: "text", placeholder: t.contact.subjectPlaceholder, key: "subject" },
                ].map((field, index) => (
                  <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <label className={`block text-sm mb-2 ${isDark ? "text-white/70" : "text-dark-600"}`}>{field.label}</label>
                    <input
                      type={field.type}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-primary transition-colors ${isDark ? "bg-dark-700/50 border-white/10 text-white placeholder-white/40" : "bg-light-200 border-dark-200 text-dark-800 placeholder-dark-400"}`}
                      placeholder={field.placeholder}
                      required
                    />
                  </div>
                ))}

                <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                  <label className={`block text-sm mb-2 ${isDark ? "text-white/70" : "text-dark-600"}`}>{t.contact.message}</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-primary transition-colors resize-none ${isDark ? "bg-dark-700/50 border-white/10 text-white placeholder-white/40" : "bg-light-200 border-dark-200 text-dark-800 placeholder-dark-400"}`}
                    placeholder={t.contact.messagePlaceholder}
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center animate-fade-in-up">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden ripple animate-fade-in-up disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ animationDelay: "400ms" }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : submitted ? (
                      <>
                        <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {t.contact.sent}
                      </>
                    ) : (
                      t.contact.submit
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
