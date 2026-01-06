import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { Web3Provider } from "@/providers/Web3Provider";
import OnboardingTutorial from "@/components/OnboardingTutorial";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Archa - Arisan On-Chain",
  description: "Platform arisan terdesentralisasi yang membawa tradisi keuangan komunal Indonesia ke Mantle Network",
  keywords: ["arisan", "blockchain", "DeFi", "Indonesia", "Mantle", "MNT"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <Web3Provider>
          <LanguageProvider>
            {children}
            <OnboardingTutorial />
          </LanguageProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
