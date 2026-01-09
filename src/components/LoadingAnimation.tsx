"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
      {/* Main container */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Swipe/Wipe Circle Animation - menggunakan SVG circle dengan stroke-dasharray */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="8"
            opacity="0.3"
          />

          {/* Animated swipe circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="url(#gradient2)"
            strokeWidth="12"
            strokeLinecap="round"
            className="animate-swipeCircle"
            style={{
              strokeDasharray: "565",
              strokeDashoffset: "565",
            }}
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Logo Archa di tengah */}
        <div className="relative z-10 w-40 h-40 flex items-center justify-center animate-fadeInScale">
          <div className="relative w-32 h-32">
            <Image
              src="/logo Archa.png"
              alt="Archa Logo"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 blur-3xl animate-pulse" />
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
