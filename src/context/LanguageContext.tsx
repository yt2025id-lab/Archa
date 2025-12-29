"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations: Record<Language, Record<string, string>> = {
  id: {
    // Header
    "nav.about": "Tentang",
    "nav.howItWorks": "Cara Kerja",
    "nav.advantages": "Keunggulan",
    "nav.faq": "FAQ",
    "nav.connectWallet": "Connect Wallet",

    // Hero Section
    "hero.preTitle1": "270 Juta Orang Sudah Paham DeFi",
    "hero.preTitle2": "Mereka Menyebutnya",
    "hero.title": "Arisan",
    "hero.description": "Selama puluhan tahun, arisan membuktikan bahwa kepercayaan bisa dibangun tanpa bank. Sekarang, kami membawanya ke level berikutnya dengan AI yang mengoptimalkan yield dan smart contract yang tidak bisa berbohong.",
    "hero.techLabel": "Powered by AI & Blockchain",
    "hero.scroll": "Scroll",

    // About Section
    "about.badge": "Apa itu Archa?",
    "about.title": "Arisan On-Chain dengan",
    "about.titleHighlight": "AI Yield Optimizer",
    "about.description": "<strong>Archa</strong> adalah protokol arisan terdesentralisasi yang dibangun di atas <strong>Mantle Network</strong>. Setiap peserta menyetorkan <strong>USDC</strong> secara berkala, dan giliran penerima ditentukan secara adil melalui smart contract. Yang membuat Archa berbeda: <strong>AI Yield Optimizer</strong> secara otomatis memutar dana ke protokol DeFi terbaik untuk menghasilkan yield optimal. Di akhir arisan, <strong>semua peserta dapat bonus dari yield yang dihasilkan!</strong>",
    "about.problemTitle": "Masalah Arisan Tradisional",
    "about.problemSubtitle": "Kendala yang sering terjadi",
    "about.solutionTitle": "Solusi dari Archa",
    "about.solutionSubtitle": "AI + Blockchain untuk arisan",
    "about.problem1.title": "Risiko Kabur",
    "about.problem1.desc": "Peserta kabur setelah dapat giliran pertama",
    "about.problem2.title": "Uang Nganggur",
    "about.problem2.desc": "Dana terkumpul tidak menghasilkan apa-apa",
    "about.problem3.title": "Catatan Manual",
    "about.problem3.desc": "Mudah dimanipulasi dan tidak transparan",
    "about.problem4.title": "Skala Terbatas",
    "about.problem4.desc": "Hanya bisa dengan keluarga atau teman dekat",
    "about.solution1.title": "Sistem Collateral",
    "about.solution1.desc": "Setor jaminan di awal, dikembalikan + yield jika konsisten",
    "about.solution2.title": "AI Yield Optimizer",
    "about.solution2.desc": "AI otomatis pilih protokol DeFi terbaik untuk yield maksimal",
    "about.solution3.title": "100% On-Chain",
    "about.solution3.desc": "Semua tercatat di blockchain, tidak bisa dimanipulasi",
    "about.solution4.title": "Global Scale",
    "about.solution4.desc": "Arisan dengan siapa saja, dimana saja di dunia",
    "about.quote": "Gotong royong menghasilkan tradisi arisan, yang sudah mengalir dalam darah Indonesia.",
    "about.quoteBrand": "Archa",
    "about.quoteEnd": "hadir untuk membuatnya lebih menguntungkan dengan AI.",
    "about.cta": "Lihat Cara Kerja",

    // How It Works Section
    "howItWorks.badge": "Cara Kerja",
    "howItWorks.title": "Semudah",
    "howItWorks.titleHighlight": "5 Langkah",
    "howItWorks.description": "Dari gabung hingga dapat bonus yield, semuanya otomatis dengan AI dan transparan di blockchain",
    "howItWorks.step1.title": "Pilih Pool Arisan",
    "howItWorks.step1.desc": "Pilih pool sesuai jumlah setoran (10/50/100 USDC) dan jumlah peserta (5/10/20 orang)",
    "howItWorks.step2.title": "Setor Collateral",
    "howItWorks.step2.desc": "Setor jaminan USDC. Collateral juga generate yield selama arisan berlangsung!",
    "howItWorks.step3.title": "Setoran Bulanan",
    "howItWorks.step3.desc": "Setor USDC tiap bulan. AI otomatis putar dana ke protokol DeFi dengan APY terbaik",
    "howItWorks.step4.title": "Dapat Giliran",
    "howItWorks.step4.desc": "Giliran random by smart contract. Dapat giliran = terima setoran bulan itu + accumulated yield",
    "howItWorks.step5.title": "Bonus Yield di Akhir",
    "howItWorks.step5.desc": "Arisan selesai: collateral kembali + yield dari collateral + share yield pool untuk semua!",
    "howItWorks.bottomText": "Siap untuk arisan yang lebih menguntungkan?",
    "howItWorks.cta": "Lihat Keunggulan",

    // Advantages Section
    "advantages.badge": "Keunggulan",
    "advantages.title": "Mengapa Memilih",
    "advantages.titleHighlight": "Archa?",
    "advantages.description": "AI + Blockchain membuat arisan lebih aman, transparan, dan menguntungkan",
    "advantages.adv1.title": "AI Yield Optimizer",
    "advantages.adv1.desc": "AI analisis real-time dan otomatis pilih protokol DeFi terbaik untuk yield maksimal.",
    "advantages.adv2.title": "Double Yield",
    "advantages.adv2.desc": "Yield dari pool fund + yield dari collateral. Dua sumber passive income!",
    "advantages.adv3.title": "Anti Kabur",
    "advantages.adv3.desc": "Sistem collateral menjamin komitmen. Kabur = kehilangan jaminan + yield.",
    "advantages.adv4.title": "100% Transparan",
    "advantages.adv4.desc": "Semua transaksi dan yield tercatat di blockchain, dapat diverifikasi siapa saja.",
    "advantages.adv5.title": "Stablecoin USDC",
    "advantages.adv5.desc": "Pakai USDC yang nilainya stabil, yield dalam stablecoin juga.",
    "advantages.adv6.title": "Biaya Murah",
    "advantages.adv6.desc": "Dibangun di Mantle Network dengan biaya transaksi sangat rendah.",
    "advantages.stat1.value": "AI",
    "advantages.stat1.label": "Powered",
    "advantages.stat2.value": "2x",
    "advantages.stat2.label": "Yield Source",
    "advantages.stat3.value": "24/7",
    "advantages.stat3.label": "Auto-Optimize",
    "advantages.stat4.value": "∞",
    "advantages.stat4.label": "Tanpa Batas",
  },
  en: {
    // Header
    "nav.about": "About",
    "nav.howItWorks": "How It Works",
    "nav.advantages": "Advantages",
    "nav.faq": "FAQ",
    "nav.connectWallet": "Connect Wallet",

    // Hero Section
    "hero.preTitle1": "270 Million People Already Understand DeFi",
    "hero.preTitle2": "They Call It",
    "hero.title": "Arisan",
    "hero.description": "For decades, arisan has proven that trust can be built without banks. Now, we're taking it to the next level with AI that optimizes yield and smart contracts that cannot lie.",
    "hero.techLabel": "Powered by AI & Blockchain",
    "hero.scroll": "Scroll",

    // About Section
    "about.badge": "What is Archa?",
    "about.title": "On-Chain Arisan with",
    "about.titleHighlight": "AI Yield Optimizer",
    "about.description": "<strong>Archa</strong> is a decentralized arisan (rotating savings) protocol built on <strong>Mantle Network</strong>. Each participant deposits <strong>USDC</strong> periodically, and the recipient's turn is determined fairly through smart contracts. What makes Archa different: <strong>AI Yield Optimizer</strong> automatically invests funds into the best DeFi protocols for optimal yield. At the end of the arisan, <strong>all participants receive bonus from the generated yield!</strong>",
    "about.problemTitle": "Traditional Arisan Problems",
    "about.problemSubtitle": "Common issues that occur",
    "about.solutionTitle": "Archa's Solution",
    "about.solutionSubtitle": "AI + Blockchain for arisan",
    "about.problem1.title": "Run-away Risk",
    "about.problem1.desc": "Participants flee after getting the first turn",
    "about.problem2.title": "Idle Money",
    "about.problem2.desc": "Collected funds don't generate anything",
    "about.problem3.title": "Manual Records",
    "about.problem3.desc": "Easy to manipulate and not transparent",
    "about.problem4.title": "Limited Scale",
    "about.problem4.desc": "Only possible with family or close friends",
    "about.solution1.title": "Collateral System",
    "about.solution1.desc": "Deposit collateral upfront, returned + yield if consistent",
    "about.solution2.title": "AI Yield Optimizer",
    "about.solution2.desc": "AI automatically selects best DeFi protocols for maximum yield",
    "about.solution3.title": "100% On-Chain",
    "about.solution3.desc": "Everything recorded on blockchain, cannot be manipulated",
    "about.solution4.title": "Global Scale",
    "about.solution4.desc": "Arisan with anyone, anywhere in the world",
    "about.quote": "Gotong royong (mutual cooperation) created the arisan tradition, which flows in the blood of Indonesians.",
    "about.quoteBrand": "Archa",
    "about.quoteEnd": "is here to make it more profitable with AI.",
    "about.cta": "See How It Works",

    // How It Works Section
    "howItWorks.badge": "How It Works",
    "howItWorks.title": "As Easy as",
    "howItWorks.titleHighlight": "5 Steps",
    "howItWorks.description": "From joining to earning yield bonus, everything is automatic with AI and transparent on blockchain",
    "howItWorks.step1.title": "Choose Arisan Pool",
    "howItWorks.step1.desc": "Select a pool based on deposit amount (10/50/100 USDC) and participants (5/10/20 people)",
    "howItWorks.step2.title": "Deposit Collateral",
    "howItWorks.step2.desc": "Deposit USDC collateral. Your collateral also generates yield during the arisan!",
    "howItWorks.step3.title": "Monthly Deposits",
    "howItWorks.step3.desc": "Deposit USDC monthly. AI automatically invests funds to DeFi protocols with best APY",
    "howItWorks.step4.title": "Get Your Turn",
    "howItWorks.step4.desc": "Turn randomly by smart contract. Your turn = receive that month's deposits + accumulated yield",
    "howItWorks.step5.title": "Yield Bonus at End",
    "howItWorks.step5.desc": "Arisan complete: collateral back + collateral yield + pool yield share for everyone!",
    "howItWorks.bottomText": "Ready for a more profitable arisan?",
    "howItWorks.cta": "See Advantages",

    // Advantages Section
    "advantages.badge": "Advantages",
    "advantages.title": "Why Choose",
    "advantages.titleHighlight": "Archa?",
    "advantages.description": "AI + Blockchain makes arisan safer, more transparent, and more profitable",
    "advantages.adv1.title": "AI Yield Optimizer",
    "advantages.adv1.desc": "AI analyzes real-time and automatically selects best DeFi protocols for maximum yield.",
    "advantages.adv2.title": "Double Yield",
    "advantages.adv2.desc": "Yield from pool fund + yield from collateral. Two sources of passive income!",
    "advantages.adv3.title": "Anti Run-away",
    "advantages.adv3.desc": "Collateral system guarantees commitment. Run away = lose collateral + yield.",
    "advantages.adv4.title": "100% Transparent",
    "advantages.adv4.desc": "All transactions and yield recorded on blockchain, verifiable by anyone.",
    "advantages.adv5.title": "USDC Stablecoin",
    "advantages.adv5.desc": "Use USDC with stable value, yield in stablecoin too.",
    "advantages.adv6.title": "Low Fees",
    "advantages.adv6.desc": "Built on Mantle Network with very low transaction fees.",
    "advantages.stat1.value": "AI",
    "advantages.stat1.label": "Powered",
    "advantages.stat2.value": "2x",
    "advantages.stat2.label": "Yield Source",
    "advantages.stat3.value": "24/7",
    "advantages.stat3.label": "Auto-Optimize",
    "advantages.stat4.value": "∞",
    "advantages.stat4.label": "Borderless",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("id");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("archa-language") as Language;
    if (savedLang && (savedLang === "id" || savedLang === "en")) {
      setLanguage(savedLang);
    }
  }, []);

  // Save language to localStorage when changed
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("archa-language", lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
