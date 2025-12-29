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
    "hero.description": "Selama puluhan tahun, arisan membuktikan bahwa kepercayaan bisa dibangun tanpa bank. Sekarang, kami membawanya ke level berikutnya, dimana kepercayaan bukan lagi tentang kenal siapa, tapi dijamin oleh kode yang tidak bisa berbohong.",
    "hero.techLabel": "Dibangun dengan teknologi terbaik",
    "hero.scroll": "Scroll",

    // About Section
    "about.badge": "Apa itu Archa?",
    "about.title": "Arisan On-Chain untuk",
    "about.titleHighlight": "Semua Orang",
    "about.description": "<strong>Archa</strong> adalah protokol arisan terdesentralisasi yang dibangun di atas <strong>Mantle Network</strong>. Setiap peserta menyetorkan <strong>USDC</strong> secara berkala, dan giliran penerima ditentukan secara adil melalui smart contract. Tidak ada yang bisa kabur karena sistem collateral, tidak ada yang bisa curang karena semua tercatat di blockchain. <strong>Arisan tradisional Indonesia, kini tanpa batas geografis.</strong>",
    "about.problemTitle": "Masalah Arisan Tradisional",
    "about.problemSubtitle": "Kendala yang sering terjadi",
    "about.solutionTitle": "Solusi dari Archa",
    "about.solutionSubtitle": "Teknologi blockchain untuk arisan",
    "about.problem1.title": "Risiko Kabur",
    "about.problem1.desc": "Peserta kabur setelah dapat giliran pertama",
    "about.problem2.title": "Catatan Manual",
    "about.problem2.desc": "Mudah dimanipulasi dan tidak transparan",
    "about.problem3.title": "Kepercayaan Terbatas",
    "about.problem3.desc": "Hanya bisa dengan orang yang sudah dikenal",
    "about.problem4.title": "Skala Terbatas",
    "about.problem4.desc": "Hanya bisa dengan keluarga atau teman dekat",
    "about.solution1.title": "Sistem Collateral",
    "about.solution1.desc": "Setor jaminan di awal, dikembalikan jika konsisten",
    "about.solution2.title": "100% On-Chain",
    "about.solution2.desc": "Semua tercatat di blockchain, tidak bisa dimanipulasi",
    "about.solution3.title": "Trustless System",
    "about.solution3.desc": "Tidak perlu kenal, smart contract yang menjamin",
    "about.solution4.title": "Global Scale",
    "about.solution4.desc": "Arisan dengan siapa saja, dimana saja di dunia",
    "about.quote": "Gotong royong menghasilkan tradisi arisan, yang sudah mengalir dalam darah Indonesia.",
    "about.quoteBrand": "Archa",
    "about.quoteEnd": "hadir untuk membuatnya abadi di blockchain.",
    "about.cta": "Lihat Cara Kerja",

    // How It Works Section
    "howItWorks.badge": "Cara Kerja",
    "howItWorks.title": "Semudah",
    "howItWorks.titleHighlight": "4 Langkah",
    "howItWorks.description": "Dari gabung hingga dapat giliran, semuanya otomatis dan transparan di blockchain",
    "howItWorks.step1.title": "Pilih Pool Arisan",
    "howItWorks.step1.desc": "Pilih pool sesuai jumlah setoran (10/50/100 USDC) dan jumlah peserta (5/10/20 orang)",
    "howItWorks.step2.title": "Setor Collateral",
    "howItWorks.step2.desc": "Setor jaminan USDC sebesar total kewajiban. Dikembalikan 100% jika konsisten sampai akhir",
    "howItWorks.step3.title": "Setoran Bulanan",
    "howItWorks.step3.desc": "Setor USDC setiap bulan sesuai jadwal. Telat atau miss? Collateral dipotong otomatis",
    "howItWorks.step4.title": "Dapat Giliran",
    "howItWorks.step4.desc": "Giliran ditentukan random oleh smart contract. Dapat giliran = terima total setoran bulan itu",
    "howItWorks.step5.title": "Selesai & Collateral Kembali",
    "howItWorks.step5.desc": "Arisan selesai, collateral dikembalikan penuh untuk peserta yang konsisten",
    "howItWorks.bottomText": "Siap untuk memulai perjalanan arisan on-chain kamu?",
    "howItWorks.cta": "Lihat Keunggulan",

    // Advantages Section
    "advantages.badge": "Keunggulan",
    "advantages.title": "Mengapa Memilih",
    "advantages.titleHighlight": "Archa?",
    "advantages.description": "Teknologi blockchain membuat arisan lebih aman, adil, dan tanpa batas",
    "advantages.adv1.title": "Anti Kabur",
    "advantages.adv1.desc": "Sistem collateral menjamin komitmen. Kabur = kehilangan jaminan.",
    "advantages.adv2.title": "100% Transparan",
    "advantages.adv2.desc": "Semua transaksi tercatat di blockchain dan dapat diverifikasi siapa saja.",
    "advantages.adv3.title": "Stablecoin USDC",
    "advantages.adv3.desc": "Pakai USDC yang nilainya stabil, tidak terpengaruh volatilitas crypto.",
    "advantages.adv4.title": "Tanpa Batas",
    "advantages.adv4.desc": "Arisan dengan siapa saja di seluruh dunia. Tidak perlu kenal langsung.",
    "advantages.adv5.title": "Biaya Murah",
    "advantages.adv5.desc": "Dibangun di Mantle Network dengan biaya transaksi sangat rendah.",
    "advantages.adv6.title": "Giliran Adil",
    "advantages.adv6.desc": "Random selection yang tidak bisa dimanipulasi oleh siapapun.",
    "advantages.stat1.value": "100%",
    "advantages.stat1.label": "On-Chain",
    "advantages.stat2.value": "0%",
    "advantages.stat2.label": "Risiko Kabur",
    "advantages.stat3.value": "24/7",
    "advantages.stat3.label": "Tersedia",
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
    "hero.description": "For decades, arisan has proven that trust can be built without banks. Now, we're taking it to the next level, where trust is no longer about who you know, but guaranteed by code that cannot lie.",
    "hero.techLabel": "Built with the best technology",
    "hero.scroll": "Scroll",

    // About Section
    "about.badge": "What is Archa?",
    "about.title": "On-Chain Arisan for",
    "about.titleHighlight": "Everyone",
    "about.description": "<strong>Archa</strong> is a decentralized arisan (rotating savings) protocol built on <strong>Mantle Network</strong>. Each participant deposits <strong>USDC</strong> periodically, and the recipient's turn is determined fairly through smart contracts. No one can run away due to the collateral system, no one can cheat because everything is recorded on blockchain. <strong>Traditional Indonesian arisan, now without geographical boundaries.</strong>",
    "about.problemTitle": "Traditional Arisan Problems",
    "about.problemSubtitle": "Common issues that occur",
    "about.solutionTitle": "Archa's Solution",
    "about.solutionSubtitle": "Blockchain technology for arisan",
    "about.problem1.title": "Run-away Risk",
    "about.problem1.desc": "Participants flee after getting the first turn",
    "about.problem2.title": "Manual Records",
    "about.problem2.desc": "Easy to manipulate and not transparent",
    "about.problem3.title": "Limited Trust",
    "about.problem3.desc": "Only possible with people you already know",
    "about.problem4.title": "Limited Scale",
    "about.problem4.desc": "Only possible with family or close friends",
    "about.solution1.title": "Collateral System",
    "about.solution1.desc": "Deposit collateral upfront, returned if consistent",
    "about.solution2.title": "100% On-Chain",
    "about.solution2.desc": "Everything recorded on blockchain, cannot be manipulated",
    "about.solution3.title": "Trustless System",
    "about.solution3.desc": "No need to know each other, smart contract guarantees",
    "about.solution4.title": "Global Scale",
    "about.solution4.desc": "Arisan with anyone, anywhere in the world",
    "about.quote": "Gotong royong (mutual cooperation) created the arisan tradition, which flows in the blood of Indonesians.",
    "about.quoteBrand": "Archa",
    "about.quoteEnd": "is here to make it eternal on the blockchain.",
    "about.cta": "See How It Works",

    // How It Works Section
    "howItWorks.badge": "How It Works",
    "howItWorks.title": "As Easy as",
    "howItWorks.titleHighlight": "4 Steps",
    "howItWorks.description": "From joining to getting your turn, everything is automatic and transparent on the blockchain",
    "howItWorks.step1.title": "Choose Arisan Pool",
    "howItWorks.step1.desc": "Select a pool based on deposit amount (10/50/100 USDC) and participants (5/10/20 people)",
    "howItWorks.step2.title": "Deposit Collateral",
    "howItWorks.step2.desc": "Deposit USDC collateral equal to total obligation. Returned 100% if consistent until the end",
    "howItWorks.step3.title": "Monthly Deposits",
    "howItWorks.step3.desc": "Deposit USDC every month on schedule. Late or miss? Collateral is automatically deducted",
    "howItWorks.step4.title": "Get Your Turn",
    "howItWorks.step4.desc": "Turn is randomly determined by smart contract. Your turn = receive that month's total deposits",
    "howItWorks.step5.title": "Finish & Collateral Returned",
    "howItWorks.step5.desc": "Arisan complete, collateral fully returned for consistent participants",
    "howItWorks.bottomText": "Ready to start your on-chain arisan journey?",
    "howItWorks.cta": "See Advantages",

    // Advantages Section
    "advantages.badge": "Advantages",
    "advantages.title": "Why Choose",
    "advantages.titleHighlight": "Archa?",
    "advantages.description": "Blockchain technology makes arisan safer, fairer, and borderless",
    "advantages.adv1.title": "Anti Run-away",
    "advantages.adv1.desc": "Collateral system guarantees commitment. Run away = lose your collateral.",
    "advantages.adv2.title": "100% Transparent",
    "advantages.adv2.desc": "All transactions are recorded on the blockchain and can be verified by anyone.",
    "advantages.adv3.title": "USDC Stablecoin",
    "advantages.adv3.desc": "Use USDC with stable value, not affected by crypto volatility.",
    "advantages.adv4.title": "Borderless",
    "advantages.adv4.desc": "Arisan with anyone around the world. No need to know them directly.",
    "advantages.adv5.title": "Low Fees",
    "advantages.adv5.desc": "Built on Mantle Network with very low transaction fees.",
    "advantages.adv6.title": "Fair Turns",
    "advantages.adv6.desc": "Random selection that cannot be manipulated by anyone.",
    "advantages.stat1.value": "100%",
    "advantages.stat1.label": "On-Chain",
    "advantages.stat2.value": "0%",
    "advantages.stat2.label": "Run-away Risk",
    "advantages.stat3.value": "24/7",
    "advantages.stat3.label": "Available",
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
