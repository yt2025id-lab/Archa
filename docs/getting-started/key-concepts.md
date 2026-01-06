# Key Concepts

Understanding the core concepts behind Archa.

## Arisan (Rotating Savings)

**Arisan** is a traditional Indonesian community savings system where:
- A group of people agree to contribute a fixed amount regularly
- Each period, one member receives the entire pot
- The process continues until everyone has received the pot once

### Example
10 people contribute $100/month:
- Month 1: Person A receives $1,000
- Month 2: Person B receives $1,000
- ...
- Month 10: Person J receives $1,000

Everyone contributes the same, everyone receives the same. It's a zero-interest loan system built on trust.

## Collateral

Collateral is a deposit made upfront when joining a pool. It serves as:

1. **Commitment Guarantee** - Ensures participants stay until completion
2. **Default Protection** - Compensates other members if someone leaves
3. **Yield Source** - Generates additional income during the arisan

{% hint style="success" %}
If you complete the arisan successfully, you get your collateral back PLUS the yield it generated!
{% endhint %}

## Pool

A pool is a single arisan group with specific parameters:
- **Monthly Deposit** - Amount each member contributes per period
- **Max Participants** - Total number of members allowed
- **Collateral Amount** - Required upfront deposit
- **Status** - Pending, Active, or Completed

## Yield

Yield is the profit generated from investing deposited funds into DeFi protocols. Archa generates yield from:

### Pool Yield
Monthly deposits are invested by the AI into various DeFi protocols on Mantle Network. The yield is distributed when members receive their turn.

### Collateral Yield
Collateral is also invested and generates yield throughout the arisan duration. This is returned with the collateral at completion.

## AI Yield Optimizer

Our AI system that:
1. Analyzes real-time data from DeFiLlama
2. Evaluates risk, APY, and TVL of protocols
3. Allocates funds optimally across protocols
4. Rebalances as market conditions change

## Smart Contracts

Self-executing code on the blockchain that:
- Manages all pool operations
- Enforces rules automatically
- Cannot be modified or cheated
- Provides complete transparency

## Stablecoin (USDC)

Archa uses USDC (USD Coin) because:
- Value is stable (pegged 1:1 to USD)
- No crypto price volatility risk
- Widely accepted and liquid
- Easy to understand for newcomers
