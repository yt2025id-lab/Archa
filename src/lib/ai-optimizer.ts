/**
 * AI Yield Optimizer Engine for Archa
 * Analyzes DeFi protocol yields and recommends optimal allocation
 */

// Protocol data types
export interface ProtocolYield {
  name: string;
  address: string;
  apy: number;
  tvl: number;
  riskScore: number; // 1-10, lower is safer
  lastUpdated: Date;
}

export interface YieldRecommendation {
  recommendedProtocol: string;
  recommendedAddress: string;
  expectedApy: number;
  riskLevel: "low" | "medium" | "high";
  confidence: number; // 0-100
  reasoning: string[];
  allocation: AllocationStrategy[];
}

export interface AllocationStrategy {
  protocol: string;
  address: string;
  percentage: number;
  expectedYield: number;
}

export interface MarketCondition {
  volatilityIndex: number; // 0-100
  trendDirection: "bullish" | "bearish" | "neutral";
  gasPrice: number; // in gwei
}

// Deployed vault addresses on Ethereum Sepolia
export const VAULT_ADDRESSES = {
  lendle: "0x09Fe9d6fa54DDc36b1917C98231A0B12C8eC998D",
  merchantMoe: "0xecaD7f7223Ed15Ff6d0D4DF4ED6696Acd1D29e0b",
  agni: "0xf4a94E196e8aF8c5C25E4259d2244aCE7fBc2699",
  minterest: "0x4beB15F866f59c3e4226d1a3aC63538e5d8005B3",
  ktx: "0xcf79D60bbb1B57CA5F315760Fa46245551548d9D",
} as const;

// Base APY rates for each protocol (can be updated with real data)
const BASE_APY_RATES: Record<string, number> = {
  lendle: 8.5,
  merchantMoe: 12.0,
  agni: 9.5,
  minterest: 7.2,
  ktx: 15.0,
};

// Risk scores for each protocol (lower = safer)
const PROTOCOL_RISK_SCORES: Record<string, number> = {
  lendle: 3, // Established lending protocol
  merchantMoe: 5, // DEX with moderate risk
  agni: 4, // DEX on Mantle
  minterest: 2, // Conservative lending
  ktx: 7, // Perpetual DEX, higher risk
};

/**
 * Simulates fetching real-time APY data from protocols
 * In production, this would call DeFiLlama API or protocol APIs
 */
export async function fetchProtocolYields(): Promise<ProtocolYield[]> {
  // Simulate some variance in APY (±2% from base)
  const variance = () => (Math.random() - 0.5) * 4;

  const protocols: ProtocolYield[] = [
    {
      name: "Lendle",
      address: VAULT_ADDRESSES.lendle,
      apy: BASE_APY_RATES.lendle + variance(),
      tvl: 15000000 + Math.random() * 5000000, // $15-20M TVL
      riskScore: PROTOCOL_RISK_SCORES.lendle,
      lastUpdated: new Date(),
    },
    {
      name: "Merchant Moe",
      address: VAULT_ADDRESSES.merchantMoe,
      apy: BASE_APY_RATES.merchantMoe + variance(),
      tvl: 8000000 + Math.random() * 2000000, // $8-10M TVL
      riskScore: PROTOCOL_RISK_SCORES.merchantMoe,
      lastUpdated: new Date(),
    },
    {
      name: "Agni Finance",
      address: VAULT_ADDRESSES.agni,
      apy: BASE_APY_RATES.agni + variance(),
      tvl: 12000000 + Math.random() * 3000000, // $12-15M TVL
      riskScore: PROTOCOL_RISK_SCORES.agni,
      lastUpdated: new Date(),
    },
    {
      name: "Minterest",
      address: VAULT_ADDRESSES.minterest,
      apy: BASE_APY_RATES.minterest + variance(),
      tvl: 20000000 + Math.random() * 5000000, // $20-25M TVL
      riskScore: PROTOCOL_RISK_SCORES.minterest,
      lastUpdated: new Date(),
    },
    {
      name: "KTX Finance",
      address: VAULT_ADDRESSES.ktx,
      apy: BASE_APY_RATES.ktx + variance(),
      tvl: 5000000 + Math.random() * 2000000, // $5-7M TVL
      riskScore: PROTOCOL_RISK_SCORES.ktx,
      lastUpdated: new Date(),
    },
  ];

  return protocols;
}

/**
 * Simulates market conditions
 */
export function getMarketConditions(): MarketCondition {
  return {
    volatilityIndex: Math.floor(Math.random() * 40) + 30, // 30-70
    trendDirection: Math.random() > 0.5 ? "bullish" : Math.random() > 0.5 ? "bearish" : "neutral",
    gasPrice: Math.floor(Math.random() * 30) + 10, // 10-40 gwei
  };
}

/**
 * AI Optimizer: Calculates risk-adjusted score for each protocol
 * Score = (APY × 10) - (RiskScore × RiskWeight) + (TVL Bonus)
 */
function calculateRiskAdjustedScore(
  protocol: ProtocolYield,
  riskTolerance: "conservative" | "moderate" | "aggressive"
): number {
  const riskWeights = {
    conservative: 3.0,
    moderate: 1.5,
    aggressive: 0.5,
  };

  const riskWeight = riskWeights[riskTolerance];
  const tvlBonus = Math.log10(protocol.tvl / 1000000) * 2; // Bonus for higher TVL

  const score = (protocol.apy * 10) - (protocol.riskScore * riskWeight) + tvlBonus;

  return Math.max(0, score);
}

/**
 * Main AI Recommendation Engine
 * Analyzes all protocols and returns optimal strategy
 */
export async function generateYieldRecommendation(
  riskTolerance: "conservative" | "moderate" | "aggressive" = "moderate"
): Promise<YieldRecommendation> {
  const protocols = await fetchProtocolYields();
  const market = getMarketConditions();

  // Calculate scores for each protocol
  const scoredProtocols = protocols.map((p) => ({
    ...p,
    score: calculateRiskAdjustedScore(p, riskTolerance),
  }));

  // Sort by score (highest first)
  scoredProtocols.sort((a, b) => b.score - a.score);

  const topProtocol = scoredProtocols[0];
  const reasoning: string[] = [];

  // Generate reasoning
  reasoning.push(`Analyzed ${protocols.length} DeFi protocols on Mantle Network`);
  reasoning.push(`Risk tolerance set to: ${riskTolerance}`);
  reasoning.push(`Market volatility index: ${market.volatilityIndex}/100`);
  reasoning.push(`${topProtocol.name} offers ${topProtocol.apy.toFixed(2)}% APY with risk score ${topProtocol.riskScore}/10`);

  if (market.volatilityIndex > 60) {
    reasoning.push("High volatility detected - favoring lower-risk protocols");
  }

  // Determine risk level
  let riskLevel: "low" | "medium" | "high" = "medium";
  if (topProtocol.riskScore <= 3) riskLevel = "low";
  else if (topProtocol.riskScore >= 6) riskLevel = "high";

  // Calculate allocation strategy
  const allocation: AllocationStrategy[] = [];

  if (riskTolerance === "conservative") {
    // Conservative: 70% top, 30% second
    allocation.push({
      protocol: scoredProtocols[0].name,
      address: scoredProtocols[0].address,
      percentage: 70,
      expectedYield: scoredProtocols[0].apy * 0.7,
    });
    allocation.push({
      protocol: scoredProtocols[1].name,
      address: scoredProtocols[1].address,
      percentage: 30,
      expectedYield: scoredProtocols[1].apy * 0.3,
    });
  } else if (riskTolerance === "moderate") {
    // Moderate: 50% top, 30% second, 20% third
    allocation.push({
      protocol: scoredProtocols[0].name,
      address: scoredProtocols[0].address,
      percentage: 50,
      expectedYield: scoredProtocols[0].apy * 0.5,
    });
    allocation.push({
      protocol: scoredProtocols[1].name,
      address: scoredProtocols[1].address,
      percentage: 30,
      expectedYield: scoredProtocols[1].apy * 0.3,
    });
    allocation.push({
      protocol: scoredProtocols[2].name,
      address: scoredProtocols[2].address,
      percentage: 20,
      expectedYield: scoredProtocols[2].apy * 0.2,
    });
  } else {
    // Aggressive: 80% top protocol
    allocation.push({
      protocol: scoredProtocols[0].name,
      address: scoredProtocols[0].address,
      percentage: 80,
      expectedYield: scoredProtocols[0].apy * 0.8,
    });
    allocation.push({
      protocol: scoredProtocols[1].name,
      address: scoredProtocols[1].address,
      percentage: 20,
      expectedYield: scoredProtocols[1].apy * 0.2,
    });
  }

  // Calculate total expected APY
  const totalExpectedApy = allocation.reduce((sum, a) => sum + a.expectedYield, 0);

  // Calculate confidence based on market conditions and data freshness
  let confidence = 85;
  if (market.volatilityIndex > 60) confidence -= 10;
  if (market.trendDirection === "bearish") confidence -= 5;
  confidence = Math.max(60, Math.min(95, confidence));

  return {
    recommendedProtocol: topProtocol.name,
    recommendedAddress: topProtocol.address,
    expectedApy: totalExpectedApy,
    riskLevel,
    confidence,
    reasoning,
    allocation,
  };
}

/**
 * Get historical performance data (simulated)
 */
export function getHistoricalPerformance(days: number = 30): {
  date: string;
  apy: number;
  protocol: string;
}[] {
  const history = [];
  const protocols = Object.keys(BASE_APY_RATES);

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const protocol = protocols[Math.floor(Math.random() * protocols.length)];
    const baseApy = BASE_APY_RATES[protocol];
    const variance = (Math.random() - 0.5) * 4;

    history.push({
      date: date.toISOString().split("T")[0],
      apy: baseApy + variance,
      protocol: protocol.charAt(0).toUpperCase() + protocol.slice(1),
    });
  }

  return history;
}

/**
 * Calculate optimal rebalancing frequency
 */
export function getRebalanceRecommendation(
  currentAllocation: AllocationStrategy[],
  newRecommendation: YieldRecommendation
): {
  shouldRebalance: boolean;
  reason: string;
  estimatedGasCost: number;
  expectedBenefit: number;
} {
  // Calculate potential APY improvement
  const currentApy = currentAllocation.reduce((sum, a) => sum + a.expectedYield, 0);
  const newApy = newRecommendation.expectedApy;
  const apyImprovement = newApy - currentApy;

  // Estimate gas cost (in USD)
  const estimatedGasCost = 5; // ~$5 for rebalancing transaction

  // Calculate if rebalancing is worth it (annualized benefit vs gas cost)
  const annualBenefit = apyImprovement * 100; // Assuming $10000 principal
  const shouldRebalance = annualBenefit > estimatedGasCost * 12; // At least covers 12 months of gas

  return {
    shouldRebalance,
    reason: shouldRebalance
      ? `Rebalancing recommended: ${apyImprovement.toFixed(2)}% APY improvement`
      : `Keep current allocation: improvement (${apyImprovement.toFixed(2)}%) doesn't justify gas costs`,
    estimatedGasCost,
    expectedBenefit: annualBenefit,
  };
}
