"use client";

import { useEffect, useState } from "react";

interface LoadingAnimationProps {
  onComplete?: () => void;
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      if (onComplete) {
        onComplete();
      }
    }, 2500); // 2.5 seconds animation

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isAnimating) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black animate-fadeIn">
      {/* Animated circles with gradient colors matching Archa brand */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer circle - expanding animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 opacity-20 animate-expandCircle" />

        {/* Middle circle - expanding with delay */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 opacity-30 animate-expandCircleDelay1" />

        {/* Inner circle - expanding with more delay */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-r from-green-600 via-blue-600 to-purple-700 opacity-40 animate-expandCircleDelay2" />

        {/* Core circle with logo */}
        <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-green-500/50 animate-pulse">
          {/* Logo text */}
          <div className="text-center">
            <h1
              className="text-4xl font-bold text-white mb-1 animate-fadeInScale"
              style={{ fontFamily: "var(--font-space), sans-serif" }}
            >
              ARCHA
            </h1>
            <p className="text-xs text-white/80 tracking-widest animate-fadeInScale">
              WEB3 ARISAN
            </p>
          </div>
        </div>

        {/* Rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-400 border-r-blue-400 animate-spin"
             style={{ animationDuration: "1.5s" }}
        />

        {/* Counter-rotating ring */}
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-purple-400 border-l-blue-400 animate-spinReverse"
             style={{ animationDuration: "2s" }}
        />
      </div>

      {/* Particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-floatParticle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-fadeInScale">
        <p className="text-white/60 text-sm tracking-wider flex items-center gap-2">
          Initializing
          <span className="flex gap-1">
            <span className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
            <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
          </span>
        </p>
      </div>
    </div>
  );
}
