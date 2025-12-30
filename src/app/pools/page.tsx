"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useAccount } from "wagmi";
import ConnectWallet from "@/components/ConnectWallet";

// Mock pool data - akan diganti dengan data dari smart contract
const mockPools = [
  {
    id: 1,
    name: "Small Pool",
    depositAmount: 10,
    maxParticipants: 5,
    currentParticipants: 3,
    cycleDuration: 30,
    totalFunds: 30,
    status: "open",
    apy: 5.2,
  },
  {
    id: 2,
    name: "Medium Pool",
    depositAmount: 50,
    maxParticipants: 10,
    currentParticipants: 10,
    cycleDuration: 30,
    totalFunds: 500,
    currentCycle: 3,
    status: "active",
    apy: 6.8,
  },
  {
    id: 3,
    name: "Large Pool",
    depositAmount: 100,
    maxParticipants: 20,
    currentParticipants: 15,
    cycleDuration: 30,
    totalFunds: 1500,
    status: "open",
    apy: 7.5,
  },
];

type PoolStatus = "all" | "open" | "active" | "completed";

export default function PoolsPage() {
  const { t } = useLanguage();
  const { isConnected } = useAccount();
  const [filter, setFilter] = useState<PoolStatus>("all");
  const [selectedPool, setSelectedPool] = useState<typeof mockPools[0] | null>(null);

  const filteredPools = filter === "all"
    ? mockPools
    : mockPools.filter(pool => pool.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-green-100 text-green-700";
      case "active": return "bg-blue-100 text-blue-700";
      case "completed": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open": return "Open";
      case "active": return "Active";
      case "completed": return "Completed";
      default: return status;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Explore <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Arisan Pools</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Join an arisan pool and start earning yield with AI optimization
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filters & Create */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm">
              {(["all", "open", "active", "completed"] as PoolStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    filter === status
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {/* Create Pool Button */}
            {isConnected ? (
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                + Create Custom Pool
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Connect wallet to create pool</span>
                <ConnectWallet variant="header" scrolled={true} />
              </div>
            )}
          </div>

          {/* Pool Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPools.map((pool) => (
              <div
                key={pool.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Pool Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{pool.name}</h3>
                      <p className="text-sm text-gray-500">Pool #{pool.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(pool.status)}`}>
                      {getStatusText(pool.status)}
                    </span>
                  </div>

                  {/* APY Badge */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-xl w-fit">
                    <svg className="w-4 h-4 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm font-semibold text-purple-700">{pool.apy}% APY</span>
                    <span className="text-xs text-purple-500">(AI Optimized)</span>
                  </div>
                </div>

                {/* Pool Stats */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Deposit</p>
                      <p className="text-lg font-bold text-gray-900">{pool.depositAmount} USDC</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Cycle</p>
                      <p className="text-lg font-bold text-gray-900">{pool.cycleDuration} days</p>
                    </div>
                  </div>

                  {/* Participants Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Participants</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {pool.currentParticipants}/{pool.maxParticipants}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${(pool.currentParticipants / pool.maxParticipants) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Total Funds */}
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Pool Funds</span>
                      <span className="text-lg font-bold text-gray-900">${pool.totalFunds}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {pool.status === "open" ? (
                    <button
                      onClick={() => setSelectedPool(pool)}
                      disabled={!isConnected}
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                        isConnected
                          ? "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg hover:shadow-green-500/25"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isConnected ? "Join Pool" : "Connect Wallet to Join"}
                    </button>
                  ) : pool.status === "active" ? (
                    <button className="w-full py-3 bg-blue-50 text-blue-700 rounded-xl font-semibold">
                      View Details
                    </button>
                  ) : (
                    <button className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold">
                      View History
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPools.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No pools found</h3>
              <p className="text-gray-500">There are no {filter} pools at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Join Pool Modal */}
      {selectedPool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPool(null)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Join {selectedPool.name}</h3>
              <button
                onClick={() => setSelectedPool(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Monthly Deposit</p>
                <p className="text-2xl font-bold text-gray-900">{selectedPool.depositAmount} USDC</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-600 mb-1">Required Collateral</p>
                <p className="text-2xl font-bold text-blue-700">
                  {selectedPool.depositAmount * (selectedPool.maxParticipants - 1)} USDC
                </p>
                <p className="text-xs text-blue-500 mt-1">
                  Returned at end of arisan + yield bonus
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl">
                <p className="text-sm text-purple-600 mb-1">Estimated APY</p>
                <p className="text-2xl font-bold text-purple-700">{selectedPool.apy}%</p>
                <p className="text-xs text-purple-500 mt-1">
                  AI Yield Optimizer active
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                Approve USDC
              </button>
              <button
                disabled
                className="w-full py-3 bg-gray-100 text-gray-400 rounded-xl font-semibold cursor-not-allowed"
              >
                Join Pool (Approve First)
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-gray-500">
              By joining, you agree to make monthly deposits for {selectedPool.maxParticipants} months
            </p>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
