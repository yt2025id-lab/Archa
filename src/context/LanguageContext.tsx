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
    "about.titleHighlight": "Indonesia",
    "about.description": "<strong>Archa</strong> adalah protokol arisan terdesentralisasi yang dibangun di atas <strong>Mantle Network</strong>. Setiap peserta menyetorkan <strong>MNT</strong> atau stablecoin secara berkala, dan giliran penerima ditentukan secara adil melalui smart contract. Yang membuat Archa berbeda: selama periode arisan berlangsung, dana yang terkumpul tidak diam begitu saja. Dana tersebut diputar ke protokol DeFi untuk menghasilkan yield. Di akhir arisan, <strong>seluruh keuntungan yield dibagikan rata kepada semua peserta</strong>, jadi bukan hanya dapat giliran, tapi juga dapat bonus!",
    "about.problemTitle": "Masalah Arisan Tradisional",
    "about.problemSubtitle": "Kendala yang sering terjadi",
    "about.solutionTitle": "Solusi dari Archa",
    "about.solutionSubtitle": "Teknologi blockchain untuk arisan",
    "about.problem1.title": "Risiko Kabur",
    "about.problem1.desc": "Peserta kabur setelah dapat giliran pertama",
    "about.problem2.title": "Catatan Manual",
    "about.problem2.desc": "Mudah dimanipulasi dan tidak transparan",
    "about.problem3.title": "Uang Nganggur",
    "about.problem3.desc": "Dana terkumpul tidak menghasilkan apa-apa",
    "about.problem4.title": "Skala Terbatas",
    "about.problem4.desc": "Hanya bisa dengan keluarga atau teman dekat",
    "about.solution1.title": "Smart Contract",
    "about.solution1.desc": "Tidak bisa kabur, collateral dijamin blockchain",
    "about.solution2.title": "100% On-Chain",
    "about.solution2.desc": "Semua tercatat, tidak bisa dimanipulasi",
    "about.solution3.title": "Yield + Bonus Akhir",
    "about.solution3.desc": "Dana menghasilkan yield, dibagikan rata di akhir arisan",
    "about.solution4.title": "Global Scale",
    "about.solution4.desc": "Arisan dengan siapa saja, dimana saja",
    "about.quote": "Gotong royong menghasilkan tradisi arisan, yang sudah mengalir dalam darah Indonesia.",
    "about.quoteBrand": "Archa",
    "about.quoteEnd": "hadir untuk membuatnya abadi di blockchain.",
    "about.cta": "Lihat Cara Kerja",

    // How It Works Section
    "howItWorks.badge": "Cara Kerja",
    "howItWorks.title": "Semudah",
    "howItWorks.titleHighlight": "5 Langkah",
    "howItWorks.description": "Dari gabung hingga dapat bonus, semuanya otomatis dan transparan di blockchain",
    "howItWorks.step1.title": "Pilih Grup",
    "howItWorks.step1.desc": "Pilih grup arisan sesuai jumlah setoran dan durasi yang kamu inginkan",
    "howItWorks.step2.title": "Setor Collateral",
    "howItWorks.step2.desc": "Setor jaminan MNT sebagai komitmen. Akan dikembalikan di akhir arisan",
    "howItWorks.step3.title": "Setoran Berkala",
    "howItWorks.step3.desc": "Setor MNT setiap periode. Dana diputar ke protokol DeFi untuk yield",
    "howItWorks.step4.title": "Dapat Giliran",
    "howItWorks.step4.desc": "Smart contract menentukan giliran secara adil menggunakan Chainlink VRF",
    "howItWorks.step5.title": "Terima Bonus",
    "howItWorks.step5.desc": "Di akhir arisan, terima collateral + bagian yield dari seluruh dana",
    "howItWorks.bottomText": "Siap untuk memulai perjalanan arisan on-chain kamu?",
    "howItWorks.cta": "Lihat Keunggulan",

    // Advantages Section
    "advantages.badge": "Keunggulan",
    "advantages.title": "Mengapa Memilih",
    "advantages.titleHighlight": "Archa?",
    "advantages.description": "Teknologi blockchain membuat arisan lebih aman, transparan, dan menguntungkan",
    "advantages.adv1.title": "Tanpa Risiko Kabur",
    "advantages.adv1.desc": "Collateral dijamin blockchain. Peserta yang tidak konsisten akan kehilangan jaminannya.",
    "advantages.adv2.title": "100% Transparan",
    "advantages.adv2.desc": "Semua transaksi tercatat di blockchain dan dapat diverifikasi siapa saja.",
    "advantages.adv3.title": "Yield Otomatis",
    "advantages.adv3.desc": "Dana diputar ke protokol DeFi di Mantle untuk menghasilkan yield yang dibagikan rata.",
    "advantages.adv4.title": "Skala Global",
    "advantages.adv4.desc": "Arisan dengan siapa saja, dimana saja. Cukup andalkan smart contract.",
    "advantages.adv5.title": "Biaya Rendah",
    "advantages.adv5.desc": "Dibangun di Mantle Network dengan biaya transaksi yang sangat murah.",
    "advantages.adv6.title": "Giliran Adil",
    "advantages.adv6.desc": "Smart contract menentukan giliran secara adil menggunakan Chainlink VRF.",
    "advantages.stat1.value": "100%",
    "advantages.stat1.label": "On-Chain",
    "advantages.stat2.value": "0%",
    "advantages.stat2.label": "Risiko Kabur",
    "advantages.stat3.value": "24/7",
    "advantages.stat3.label": "Tersedia",
    "advantages.stat4.value": "∞",
    "advantages.stat4.label": "Skala Global",
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
    "about.titleHighlight": "Indonesia",
    "about.description": "<strong>Archa</strong> is a decentralized arisan protocol built on <strong>Mantle Network</strong>. Each participant deposits <strong>MNT</strong> or stablecoin periodically, and the recipient's turn is determined fairly through smart contracts. What makes Archa different: during the arisan period, the collected funds don't sit idle. The funds are invested in DeFi protocols to generate yield. At the end of the arisan, <strong>all yield profits are distributed equally to all participants</strong>, so you don't just get your turn, you also get a bonus!",
    "about.problemTitle": "Traditional Arisan Problems",
    "about.problemSubtitle": "Common issues that occur",
    "about.solutionTitle": "Archa's Solution",
    "about.solutionSubtitle": "Blockchain technology for arisan",
    "about.problem1.title": "Run-away Risk",
    "about.problem1.desc": "Participants flee after getting the first turn",
    "about.problem2.title": "Manual Records",
    "about.problem2.desc": "Easy to manipulate and not transparent",
    "about.problem3.title": "Idle Money",
    "about.problem3.desc": "Collected funds don't generate anything",
    "about.problem4.title": "Limited Scale",
    "about.problem4.desc": "Only possible with family or close friends",
    "about.solution1.title": "Smart Contract",
    "about.solution1.desc": "Can't run away, collateral secured by blockchain",
    "about.solution2.title": "100% On-Chain",
    "about.solution2.desc": "Everything recorded, cannot be manipulated",
    "about.solution3.title": "Yield + End Bonus",
    "about.solution3.desc": "Funds generate yield, distributed equally at the end",
    "about.solution4.title": "Global Scale",
    "about.solution4.desc": "Arisan with anyone, anywhere",
    "about.quote": "Gotong royong (mutual cooperation) created the arisan tradition, which flows in the blood of Indonesians.",
    "about.quoteBrand": "Archa",
    "about.quoteEnd": "is here to make it eternal on the blockchain.",
    "about.cta": "See How It Works",

    // How It Works Section
    "howItWorks.badge": "How It Works",
    "howItWorks.title": "As Easy as",
    "howItWorks.titleHighlight": "5 Steps",
    "howItWorks.description": "From joining to getting bonuses, everything is automatic and transparent on the blockchain",
    "howItWorks.step1.title": "Choose Group",
    "howItWorks.step1.desc": "Select an arisan group based on your preferred deposit amount and duration",
    "howItWorks.step2.title": "Deposit Collateral",
    "howItWorks.step2.desc": "Deposit MNT collateral as commitment. Will be returned at the end of arisan",
    "howItWorks.step3.title": "Periodic Deposits",
    "howItWorks.step3.desc": "Deposit MNT every period. Funds are invested in DeFi protocols for yield",
    "howItWorks.step4.title": "Get Your Turn",
    "howItWorks.step4.desc": "Smart contract determines turns fairly using Chainlink VRF",
    "howItWorks.step5.title": "Receive Bonus",
    "howItWorks.step5.desc": "At the end of arisan, receive collateral + yield share from all funds",
    "howItWorks.bottomText": "Ready to start your on-chain arisan journey?",
    "howItWorks.cta": "See Advantages",

    // Advantages Section
    "advantages.badge": "Advantages",
    "advantages.title": "Why Choose",
    "advantages.titleHighlight": "Archa?",
    "advantages.description": "Blockchain technology makes arisan safer, more transparent, and more profitable",
    "advantages.adv1.title": "No Run-away Risk",
    "advantages.adv1.desc": "Collateral secured by blockchain. Inconsistent participants will lose their collateral.",
    "advantages.adv2.title": "100% Transparent",
    "advantages.adv2.desc": "All transactions are recorded on the blockchain and can be verified by anyone.",
    "advantages.adv3.title": "Automatic Yield",
    "advantages.adv3.desc": "Funds are invested in DeFi protocols on Mantle to generate yield distributed equally.",
    "advantages.adv4.title": "Global Scale",
    "advantages.adv4.desc": "Arisan with anyone, anywhere. Just rely on smart contracts.",
    "advantages.adv5.title": "Low Fees",
    "advantages.adv5.desc": "Built on Mantle Network with very low transaction fees.",
    "advantages.adv6.title": "Fair Turns",
    "advantages.adv6.desc": "Smart contract determines turns fairly using Chainlink VRF.",
    "advantages.stat1.value": "100%",
    "advantages.stat1.label": "On-Chain",
    "advantages.stat2.value": "0%",
    "advantages.stat2.label": "Run-away Risk",
    "advantages.stat3.value": "24/7",
    "advantages.stat3.label": "Available",
    "advantages.stat4.value": "∞",
    "advantages.stat4.label": "Global Scale",
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
