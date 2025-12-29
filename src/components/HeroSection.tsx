"use client";

import { useEffect, useState } from "react";
import HeroSlideshow from "./HeroSlideshow";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <HeroSlideshow />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span
            className="block text-2xl md:text-3xl lg:text-4xl font-light text-white/50 mb-4 tracking-wide"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {t("hero.preTitle1")}
          </span>
          <span
            className="block text-2xl md:text-3xl lg:text-4xl font-light text-white/50 mb-2 tracking-wide"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {t("hero.preTitle2")}
          </span>
          <span
            className="block text-6xl md:text-8xl lg:text-9xl bg-gradient-to-r from-green-400 via-blue-400 to-orange-400 bg-clip-text text-transparent italic font-bold mt-4"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {t("hero.title")}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed tracking-wide transition-all duration-1000 delay-400 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          {t("hero.description")}
        </p>

        {/* Trust Indicators */}
        <div
          className={`mt-16 transition-all duration-1000 delay-[800ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-white/50 text-sm mb-6">
            {t("hero.techLabel")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {/* Base */}
            <a
              href="https://base.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 111 111" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="55.5" cy="55.5" r="55.5" fill="#0052FF"/>
                <path d="M55.4 93.5C76.2 93.5 93.1 76.6 93.1 55.8C93.1 35 76.2 18.1 55.4 18.1C35.8 18.1 19.7 33.1 17.9 52.2H68.8V59.4H17.9C19.7 78.5 35.8 93.5 55.4 93.5Z" fill="white"/>
              </svg>
              <span className="text-white/80 text-sm font-medium">Base</span>
            </a>

            {/* IDRX */}
            <a
              href="https://idrx.co"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill="#2563EB"/>
                <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="3"/>
                <text x="50" y="62" textAnchor="middle" fill="white" fontSize="42" fontWeight="bold" fontFamily="Arial">X</text>
              </svg>
              <span className="text-white/80 text-sm font-medium">IDRX Stablecoin</span>
            </a>

            {/* Thetanuts */}
            <a
              href="https://thetanuts.finance"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill="#10B981"/>
                <path d="M50 15L65 45H55V75H45V45H35L50 15Z" fill="white"/>
                <circle cx="50" cy="32" r="5" fill="#10B981"/>
              </svg>
              <span className="text-white/80 text-sm font-medium">Thetanuts Finance</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 delay-[1000ms] ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs tracking-widest uppercase">{t("hero.scroll")}</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
