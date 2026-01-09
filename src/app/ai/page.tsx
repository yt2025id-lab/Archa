"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAIDashboard } from "@/hooks/useAI";

export default function AIOptimizerPage() {
  const {
    riskTolerance,
    setRiskTolerance,
    yields,
    strategy,
    recommendation,
    isLoading,
    refetchAll,
  } = useAIDashboard();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600 bg-green-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "high":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "bullish":
        return "↗";
      case "bearish":
        return "↘";
      default:
        return "→";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-purple-900 via-gray-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>
                <span className="text-purple-300 text-sm font-medium">AI-Powered</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-green-300 text-sm font-medium">DeFiLlama Live Data</span>
              </div>
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-space), sans-serif" }}
            >
              AI Yield{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Optimizer
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Advanced AI analyzes 5+ DeFi protocols to maximize your yield while managing risk
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Risk Tolerance Selector */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Risk Tolerance</h2>
                <p className="text-sm text-gray-500">Select your preferred risk level for AI recommendations</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                {(["conservative", "moderate", "aggressive"] as const).map((risk) => (
                  <button
                    key={risk}
                    onClick={() => setRiskTolerance(risk)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      riskTolerance === risk
                        ? risk === "conservative"
                          ? "bg-green-500 text-white"
                          : risk === "moderate"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {risk.charAt(0).toUpperCase() + risk.slice(1)}
                  </button>
                ))}
              </div>
              <button
                onClick={refetchAll}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
              >
                Refresh Data
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              <span className="ml-4 text-gray-600">AI is analyzing protocols...</span>
            </div>
          )}

          {/* Main Dashboard */}
          {!isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* AI Recommendation Card */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">AI Recommendation</h3>
                      <p className="text-sm text-gray-500">Optimal strategy for {riskTolerance} risk</p>
                    </div>
                  </div>
                </div>

                {recommendation && (
                  <div className="p-6 space-y-6">
                    {/* Top Protocol */}
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                      <div>
                        <p className="text-sm text-purple-600 font-medium">Recommended Protocol</p>
                        <p className="text-2xl font-bold text-purple-900">{recommendation.recommendedProtocol}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-purple-600">Expected APY</p>
                        <p className="text-3xl font-bold text-purple-700">
                          {recommendation.expectedApy.toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    {/* Confidence & Risk */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">AI Confidence</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              style={{ width: `${recommendation.confidence}%` }}
                            />
                          </div>
                          <span className="text-lg font-bold text-gray-900">{recommendation.confidence}%</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">Risk Level</p>
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(
                            recommendation.riskLevel
                          )}`}
                        >
                          {recommendation.riskLevel.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Allocation Strategy */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Allocation Strategy</h4>
                      <div className="space-y-2">
                        {recommendation.allocation.map((alloc, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">{alloc.protocol}</span>
                                <span className="text-sm text-gray-500">{alloc.percentage}%</span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                                  style={{ width: `${alloc.percentage}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-green-600">
                              +{alloc.expectedYield.toFixed(2)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Reasoning */}
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <h4 className="text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        AI Reasoning
                      </h4>
                      <ul className="space-y-1">
                        {recommendation.reasoning.map((reason, idx) => (
                          <li key={idx} className="text-sm text-blue-600 flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Protocol List & Market Stats */}
              <div className="space-y-6">
                {/* Market Conditions */}
                {yields?.market && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Market Conditions</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Volatility Index</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                yields.market.volatilityIndex > 60
                                  ? "bg-red-500"
                                  : yields.market.volatilityIndex > 40
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${yields.market.volatilityIndex}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold">{yields.market.volatilityIndex}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Market Trend</span>
                        <span
                          className={`text-sm font-semibold ${
                            yields.market.trendDirection === "bullish"
                              ? "text-green-600"
                              : yields.market.trendDirection === "bearish"
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          {getTrendIcon(yields.market.trendDirection)} {yields.market.trendDirection}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Gas Price</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {yields.market.gasPrice} gwei
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Protocol Stats */}
                {yields?.stats && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Protocol Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 rounded-xl">
                        <p className="text-xs text-green-600">Max APY</p>
                        <p className="text-xl font-bold text-green-700">{yields.stats.maxApy}%</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <p className="text-xs text-blue-600">Avg APY</p>
                        <p className="text-xl font-bold text-blue-700">{yields.stats.avgApy}%</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-xl">
                        <p className="text-xs text-purple-600">Total TVL</p>
                        <p className="text-xl font-bold text-purple-700">
                          ${(yields.stats.totalTvl / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl">
                        <p className="text-xs text-gray-600">Protocols</p>
                        <p className="text-xl font-bold text-gray-700">{yields.stats.protocolCount}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Protocol List */}
                {yields?.protocols && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">All Protocols</h3>
                    <div className="space-y-3">
                      {yields.protocols
                        .sort((a, b) => b.apy - a.apy)
                        .map((protocol, idx) => (
                          <div
                            key={protocol.address}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                  idx === 0
                                    ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                                    : idx === 1
                                    ? "bg-gradient-to-br from-gray-300 to-gray-400"
                                    : idx === 2
                                    ? "bg-gradient-to-br from-orange-300 to-orange-400"
                                    : "bg-gray-300"
                                }`}
                              >
                                {idx + 1}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{protocol.name}</p>
                                <p className="text-xs text-gray-500">Risk: {protocol.riskScore}/10</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">{protocol.apy.toFixed(2)}%</p>
                              <p className="text-xs text-gray-500">
                                ${(protocol.tvl / 1000000).toFixed(1)}M TVL
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Advantage Section */}
          {strategy?.aiAdvantage && (
            <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">AI Optimization Advantage</h3>
                  <p className="text-purple-100">
                    {strategy.aiAdvantage.riskReduction}
                  </p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-sm text-purple-200">Single Protocol</p>
                    <p className="text-3xl font-bold">{strategy.aiAdvantage.singleProtocolApy}%</p>
                  </div>
                  <div className="text-4xl">→</div>
                  <div className="text-center">
                    <p className="text-sm text-purple-200">AI Optimized</p>
                    <p className="text-3xl font-bold text-green-300">
                      {strategy.aiAdvantage.diversifiedApy}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
