"use client";

import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface ConnectWalletProps {
  variant?: "header" | "mobile";
  scrolled?: boolean;
}

export default function ConnectWallet({ variant = "header", scrolled = false }: ConnectWalletProps) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (value: bigint | undefined, decimals: number = 18) => {
    if (!value) return "0.00";
    const formatted = Number(value) / Math.pow(10, decimals);
    return formatted.toFixed(4);
  };

  // Connected state
  if (isConnected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            variant === "mobile"
              ? scrolled
                ? "bg-gradient-to-r from-green-500 to-blue-500 text-white w-full justify-center"
                : "bg-white text-gray-900 w-full justify-center"
              : scrolled
                ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                : "bg-white text-gray-900 hover:bg-white/90"
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>{formatAddress(address)}</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowDropdown(false)}
            />
            <div className={`absolute ${variant === "mobile" ? "left-0 right-0" : "right-0"} mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50`}>
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Connected Wallet</p>
                <p className="text-sm font-mono text-gray-900 break-all">{address}</p>
              </div>
              <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Balance</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatBalance(balance?.value, balance?.decimals)} {balance?.symbol || "MNT"}
                </p>
              </div>
              <button
                onClick={() => {
                  disconnect();
                  setShowDropdown(false);
                }}
                className="w-full py-2.5 px-4 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
              >
                Disconnect
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Not connected state
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          variant === "mobile"
            ? `py-3 rounded-full justify-center ${
                scrolled
                  ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                  : "bg-white text-gray-900"
              }`
            : `px-5 py-2.5 rounded-full ${
                scrolled
                  ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                  : "bg-white text-gray-900 hover:bg-white/90"
              }`
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {t("nav.connectWallet")}
      </button>

      {/* Connect Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Connect Wallet</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Connectors */}
            <div className="space-y-3">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => {
                    connect({ connector });
                    setShowModal(false);
                  }}
                  disabled={isPending}
                  className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-200 group disabled:opacity-50"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    {connector.name === "MetaMask" && (
                      <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
                        <path d="M36.5 3.5L22 14l2.7-6.4L36.5 3.5z" fill="#E17726"/>
                        <path d="M3.5 3.5l14.3 10.6L15.3 7.6 3.5 3.5z" fill="#E27625"/>
                        <path d="M31.3 27.7l-3.8 5.9 8.2 2.3 2.4-8-6.8-.2zm-26.8.2l2.3 8 8.2-2.3-3.8-5.9-6.7.2z" fill="#E27625"/>
                        <path d="M14.6 17.3L12.3 21l8.1.4-.3-8.7-5.5 4.6zm10.8 0l-5.6-4.7-.2 8.8 8-.4-2.2-3.7z" fill="#E27625"/>
                        <path d="M15 33.6l4.9-2.4-4.2-3.3-.7 5.7zm10-2.4l4.9 2.4-.6-5.7-4.3 3.3z" fill="#E27625"/>
                        <path d="M29.9 33.6l-4.9-2.4.4 3.2-.1 1.3 4.6-2.1zm-14.8 0l4.6 2.1-.1-1.3.4-3.2-4.9 2.4z" fill="#D5BFB2"/>
                        <path d="M19.8 25.8l-4-1.2 2.9-1.3 1.1 2.5zm.4 0l1.2-2.5 2.8 1.3-4 1.2z" fill="#233447"/>
                        <path d="M15 33.6l.7-5.9-4.5.1 3.8 5.8zm9.2-5.9l.8 5.9 3.8-5.8-4.6-.1zm3.1-6.7l-8 .4.8 4.4 1.1-2.5 2.8 1.3 3.3-3.6zm-11.5 3.6l2.8-1.3 1.1 2.5.8-4.4-8-.4 3.3 3.6z" fill="#CC6228"/>
                        <path d="M12.3 21l3.5 6.9-.1-3.4-3.4-3.5zm15.4 3.5l-.2 3.4 3.5-6.9-3.3 3.5zm-7.3-3.1l-.8 4.4 1 5-.2-6.6-.8-2.8h.8zm.4 0l.8 2.8-.2 6.6 1-5-.8-4.4h-.8z" fill="#E27625"/>
                        <path d="M20.8 25.8l-1 5 .7.5 4.3-3.3.2-3.4-4.2 1.2zm-5-1.2l.1 3.4 4.3 3.3.7-.5-1-5-4.1-1.2z" fill="#F5841F"/>
                        <path d="M20.9 35.7l.1-1.3-.4-.3h-5.2l-.3.3.1 1.3-4.7-2.1 1.6 1.3 3.3 2.3h5.3l3.3-2.3 1.6-1.3-4.7 2.1z" fill="#C0AC9D"/>
                        <path d="M25 31.2l-.7-.5h-4.6l-.7.5-.4 3.2.3-.3h5.2l.4.3-.5-3.2z" fill="#161616"/>
                        <path d="M37.2 14.8l1.2-6-1.9-5.3-12.5 9.3 4.8 4.1 6.8 2 1.5-1.8-.7-.5 1.1-.9-.8-.6 1-1-.6-.4zM1.6 8.8l1.2 6-.8.5 1.1 1-.8.6 1 1-.6.4 1.5 1.8 6.8-2 4.8-4-12.5-9.3-1.7 5z" fill="#763E1A"/>
                        <path d="M35.6 18.9l-6.8-2 2.1 3.1-3.1 6 4.1-.1h6.1l-2.4-7zm-21.2-2l-6.8 2-2.3 7h6l4.1.1-3.1-6 2.1-3.1zm9.6 3.5l.4-7.4 2-5.4h-9l2 5.4.4 7.4.2 2.9v6.5h4.6l.1-6.5.3-2.9z" fill="#F5841F"/>
                      </svg>
                    )}
                    {connector.name === "WalletConnect" && (
                      <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="8" fill="#3B99FC"/>
                        <path d="M12.5 15.5c4.1-4 10.9-4 15 0l.5.5c.2.2.2.5 0 .7l-1.7 1.7c-.1.1-.3.1-.4 0l-.7-.7c-2.9-2.8-7.5-2.8-10.4 0l-.8.7c-.1.1-.3.1-.4 0L12 16.7c-.2-.2-.2-.5 0-.7l.5-.5zm18.5 3.4l1.5 1.5c.2.2.2.5 0 .7L26 27.6c-.2.2-.5.2-.7 0l-4.6-4.5c-.1 0-.1 0-.2 0l-4.6 4.5c-.2.2-.5.2-.7 0l-6.5-6.5c-.2-.2-.2-.5 0-.7l1.5-1.5c.2-.2.5-.2.7 0l4.6 4.5c.1 0 .1 0 .2 0l4.6-4.5c.2-.2.5-.2.7 0l4.6 4.5c.1 0 .1 0 .2 0l4.6-4.5c.2-.2.5-.2.7 0z" fill="white"/>
                      </svg>
                    )}
                    {connector.name !== "MetaMask" && connector.name !== "WalletConnect" && (
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">{connector.name}</p>
                    <p className="text-sm text-gray-500">
                      {connector.name === "MetaMask" && "Browser Extension"}
                      {connector.name === "WalletConnect" && "Mobile & Desktop"}
                      {connector.name !== "MetaMask" && connector.name !== "WalletConnect" && "Connect"}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-gray-500">
              By connecting, you agree to our Terms of Service
            </p>
          </div>
        </div>
      )}
    </>
  );
}
