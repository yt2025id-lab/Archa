# AI Yield Optimizer

The heart of Archa's value proposition - automated yield optimization powered by AI.

## Overview

The AI Yield Optimizer continuously analyzes the DeFi ecosystem on Mantle Network to find the best yield opportunities while managing risk. It uses real-time data from DeFiLlama to make informed allocation decisions.

## How It Works

### 1. Data Collection

The AI fetches real-time data from DeFiLlama API including:
- **APY** (Annual Percentage Yield) - How much yield the protocol offers
- **TVL** (Total Value Locked) - How much money is in the protocol
- **Risk Score** - Based on TVL, track record, and audits

### 2. Analysis

For each protocol, the AI evaluates:

```
Score = (APY Weight × Normalized APY) +
        (TVL Weight × Normalized TVL) +
        (Risk Weight × Risk Score)
```

Default weights:
- APY: 40%
- TVL: 30%
- Risk: 30%

### 3. Allocation

Based on scores and market conditions, the AI determines optimal allocation:

| Market Condition | Strategy |
|-----------------|----------|
| Bullish | Higher risk tolerance, chase APY |
| Neutral | Balanced approach |
| Bearish | Conservative, prioritize safety |

### 4. Execution

The smart contract executes the recommended allocation by:
1. Withdrawing from underperforming protocols
2. Depositing into recommended protocols
3. Rebalancing as needed

## Supported Protocols

Current protocols analyzed on Mantle Network:

| Protocol | Type | Description |
|----------|------|-------------|
| **Lendle** | Lending | Borrow/lend platform |
| **Merchant Moe** | DEX | Liquidity providing |
| **Agni Finance** | DEX | Concentrated liquidity |
| **Minterest** | Lending | Cross-chain lending |
| **KTX Finance** | Perps | Perpetual trading |

## Risk Management

The AI incorporates multiple risk factors:

### TVL Threshold
Only considers protocols with TVL > $1M for stability.

### Diversification
Never allocates more than 40% to a single protocol.

### Volatility Check
Monitors APY stability - avoids protocols with erratic yields.

### Audit Status
Prioritizes protocols with completed security audits.

## Dashboard

View real-time AI recommendations on the [AI Optimizer Dashboard](https://arisanonchain.vercel.app/ai):

- Current market sentiment
- Top protocol recommendations
- Suggested allocation percentages
- Expected combined APY

## Data Source

All yield data is sourced from [DeFiLlama](https://defillama.com), the largest TVL aggregator in DeFi. Data is refreshed every 5 minutes with a fallback to cached data if the API is unavailable.

{% hint style="info" %}
The AI provides recommendations. Actual execution depends on pool configuration and smart contract parameters.
{% endhint %}
