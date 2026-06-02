"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Navigation() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/about", label: t.nav.about },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-theme">
      <div
        className={`absolute inset-0 backdrop-blur-lg border-b ${isDark ? "bg-dark-900/95 border-white/10" : "bg-light-100/95 border-dark-200"}`}
      />

      <div className="container mx-auto px-6 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/13.png" alt="3LMSolutions" className="w-12 h-12" />
            <span
              className={`font-bold text-lg ${isDark ? "text-white" : "text-dark-800"}`}
            >
              3LMSolutions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive(link.href)
                    ? "text-primary"
                    : `${isDark ? "text-white/70" : "text-dark-600"} hover:text-primary`
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                )}
              </Link>
            ))}

            <Link
              href="/#contact"
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              {t.nav.contactUs}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${isDark ? "text-white" : "text-dark-800"}`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className={`md:hidden absolute top-16 left-0 right-0 py-4 px-6 border-t ${isDark ? "bg-dark-800 border-white/10" : "bg-light-200 border-dark-200"}`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-3 text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary"
                    : isDark
                      ? "text-white"
                      : "text-dark-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="block mt-4 py-3 text-center bg-gradient-to-r from-primary to-secondary rounded-full text-white font-medium"
            >
              {t.nav.contactUs}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
