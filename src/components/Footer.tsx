"use client";

import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  return (
    <footer className={`py-12 border-t transition-theme ${isDark ? 'bg-dark-900 border-white/5' : 'bg-light-200 border-dark-200'}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/13.png" alt="3LMSolutions" className="w-14 h-14" />
              <div>
                <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-dark-800'}`}>3LMSolutions</h3>
                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-dark-500'}`}>SmartRecruitAI</p>
              </div>
            </div>
            <p className={`max-w-md mb-4 ${isDark ? 'text-white/50' : 'text-dark-600'}`}>
              {t.footer.description}
            </p>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'}`}>
                {t.footer.recruitment}
              </span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-dark-800'}`}>{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+21656566533" className={`flex items-center gap-2 transition-colors ${isDark ? 'text-white/50 hover:text-white' : 'text-dark-600 hover:text-primary'}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +216 56 566 533
                </a>
              </li>
              <li>
                <a href="mailto:contact@3lmsolutions.net" className={`flex items-center gap-2 transition-colors ${isDark ? 'text-white/50 hover:text-white' : 'text-dark-600 hover:text-primary'}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contact@3lmsolutions.net
                </a>
              </li>
              <li className={`flex items-center gap-2 ${isDark ? 'text-white/50' : 'text-dark-600'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Av. 18 Janvier, Arian Center Esc. C Bureau C408, Ariana
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-dark-800'}`}>{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className={`transition-colors ${isDark ? 'text-white/50 hover:text-white' : 'text-dark-600 hover:text-primary'}`}>
                  {t.footer.home}
                </a>
              </li>
              <li>
                <a href="/services" className={`transition-colors ${isDark ? 'text-white/50 hover:text-white' : 'text-dark-600 hover:text-primary'}`}>
                  {t.footer.services}
                </a>
              </li>
              <li>
                <a href="/about" className={`transition-colors ${isDark ? 'text-white/50 hover:text-white' : 'text-dark-600 hover:text-primary'}`}>
                  {t.footer.about}
                </a>
              </li>
              <li>
                <a href="/avis" className={`transition-colors ${isDark ? 'text-white/50 hover:text-white' : 'text-dark-600 hover:text-primary'}`}>
                  {t.footer.avis}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Map */}
        <div className={`mt-8 rounded-xl overflow-hidden border ${isDark ? 'border-white/5' : 'border-dark-200'}`}>
          <iframe
            src="https://www.google.com/maps?q=Ariana+Center+Avenue+18+Janvier+Ariana+Tunisie&output=embed"
            width="100%"
            height="150"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Bottom */}
        <div className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 ${isDark ? 'border-white/5' : 'border-dark-200'}`}>
          <p className={`text-sm ${isDark ? 'text-white/40' : 'text-dark-400'}`}>
            © {new Date().getFullYear()} 3LMSolutions. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            {[
              { name: "linkedin", path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
              { name: "facebook", path: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" },
              { name: "instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
              { name: "twitter", path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" },
            ].map((social, index) => (
              <a 
                key={index} 
                href="#" 
                className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-white/40 hover:text-white' : 'text-dark-400 hover:text-primary'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
