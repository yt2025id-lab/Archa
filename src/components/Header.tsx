"use client";

import { useState, useEffect } from "react";
import ArchaLogo from "./ArchaLogo";
import ConnectWallet from "./ConnectWallet";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t("nav.about"), href: "/#tentang" },
    { label: t("nav.howItWorks"), href: "/#cara-kerja" },
    { label: t("nav.advantages"), href: "/#keunggulan" },
    { label: t("nav.pools"), href: "/pools" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "id" ? "en" : "id");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="group flex items-center gap-2">
            <ArchaLogo size={40} className="w-10 h-10" />
            <div className="flex flex-col">
              <span
                className={`text-xl font-semibold tracking-widest transition-colors duration-300 ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                ARCHA
              </span>
              <span
                className={`text-[10px] font-medium tracking-wider transition-colors duration-300 ${
                  scrolled ? "text-green-600" : "text-green-400"
                }`}
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                Arisan Onchain
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-300 group ${
                  scrolled
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    scrolled
                      ? "bg-gradient-to-r from-green-500 to-blue-500"
                      : "bg-white"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Language Switcher & Connect Wallet */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="uppercase font-semibold">{language}</span>
            </button>

            {/* Connect Wallet Button */}
            <ConnectWallet variant="header" scrolled={scrolled} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`w-6 h-0.5 transition-all duration-300 origin-center ${
                  scrolled ? "bg-gray-900" : "bg-white"
                } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? "bg-gray-900" : "bg-white"
                } ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-6 h-0.5 transition-all duration-300 origin-center ${
                  scrolled ? "bg-gray-900" : "bg-white"
                } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            menuOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`flex flex-col gap-4 pb-6 ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-lg font-medium py-2 border-b border-white/10"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center justify-center gap-2 py-3 rounded-full text-lg font-medium ${
                scrolled
                  ? "bg-gray-100 text-gray-700"
                  : "bg-white/10 text-white backdrop-blur-sm"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              {language === "id" ? "English" : "Bahasa Indonesia"}
            </button>

            {/* Mobile Connect Wallet */}
            <ConnectWallet variant="mobile" scrolled={scrolled} />
          </div>
        </div>
      </div>
    </header>
  );
}
