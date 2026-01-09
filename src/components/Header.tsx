"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ArchaLogo from "./ArchaLogo";
import ConnectWallet from "./ConnectWallet";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { language, setLanguage, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine active item based on pathname or hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        setActiveSection(hash);
      } else if (pathname && pathname !== "/") {
        setActiveSection(pathname);
      } else {
        setActiveSection("");
      }
    };

    // Initial check
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  const navItems = [
    { label: t("nav.about"), href: "/#tentang" },
    { label: t("nav.howItWorks"), href: "/#cara-kerja" },
    { label: t("nav.advantages"), href: "/#keunggulan" },
    { label: t("nav.pools"), href: "/pools" },
    { label: "AI Optimizer", href: "/ai" },
    { label: "Leaderboard", href: "/leaderboard" },
  ];

  const handleLanguageChange = (lang: "id" | "en") => {
    setLanguage(lang);
    setLanguageDropdown(false);
  };

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return activeSection === href.substring(1);
    }
    return activeSection === href || pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ease-out py-4 md:py-6" style={{ position: 'fixed' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <nav className="bg-white rounded-full shadow-lg px-4 md:px-6 py-3 md:py-4 flex items-center justify-between backdrop-blur-xl border border-gray-100/50" style={{backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)'}}>
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <ArchaLogo size={40} className="w-8 h-8 md:w-10 md:h-10 rounded-full" />
            <div className="flex flex-col">
              <span
                className="text-lg md:text-xl font-bold tracking-wider text-gray-900 transition-colors duration-300"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                ARCHA
              </span>
              <span
                className="text-[9px] md:text-[10px] font-medium tracking-wider text-green-600 transition-colors duration-300"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                Arisan Onchain
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative text-sm transition-all duration-300 group py-1 ${
                  isActive(item.href)
                    ? "font-semibold text-gray-900"
                    : "font-medium text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.label}
                <span 
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-orange-500 transition-all duration-300 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`} 
                />
              </Link>
            ))}
          </div>

          {/* Language Switcher & Connect Wallet */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLanguageDropdown(!languageDropdown)}
                className="flex items-center justify-center w-20 h-11 rounded-full border-2 border-gray-600 text-gray-900 font-semibold text-sm hover:bg-gray-50 transition-all duration-300"
                aria-label="Change language"
              >
                <span className="uppercase">{language}</span>
              </button>

              {/* Dropdown Menu */}
              {languageDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[210]">
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${
                      language === "en" ? "text-green-600 font-semibold" : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>English</span>
                      {language === "en" && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => handleLanguageChange("id")}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${
                      language === "id" ? "text-green-600 font-semibold" : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Indonesia</span>
                      {language === "id" && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Connect Wallet Button */}
            <ConnectWallet variant="header" scrolled={scrolled} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-11 h-11 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`w-6 h-0.5 transition-all duration-300 origin-center bg-gray-900 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 transition-all duration-300 bg-gray-900 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 transition-all duration-300 origin-center bg-gray-900 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-4">
            <div className="flex flex-col gap-3 text-gray-900">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-base py-2.5 px-3 rounded-lg transition-all ${
                    isActive(item.href)
                      ? "font-semibold bg-gradient-to-r from-green-50 to-blue-50 text-gray-900"
                      : "font-medium hover:bg-gray-50"
                  }`}
                  onClick={() => handleNavClick(item.href)}
                >
                  <span className="flex items-center justify-between">
                    {item.label}
                    {isActive(item.href) && (
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-orange-500" />
                    )}
                  </span>
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2 px-3">Language</p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      handleLanguageChange("en");
                      setMenuOpen(false);
                    }}
                    className={`px-3 py-2.5 text-left text-sm rounded-lg transition-colors ${
                      language === "en"
                        ? "bg-green-50 text-green-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>English</span>
                      {language === "en" && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      handleLanguageChange("id");
                      setMenuOpen(false);
                    }}
                    className={`px-3 py-2.5 text-left text-sm rounded-lg transition-colors ${
                      language === "id"
                        ? "bg-green-50 text-green-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Indonesia</span>
                      {language === "id" && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Mobile Connect Wallet */}
              <div className="pt-3 border-t border-gray-100">
                <ConnectWallet variant="mobile" scrolled={scrolled} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
