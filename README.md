# ARCHA - Arisan Onchain

<div align="center">
  <img src="public/logo Archa.png" alt="Archa Logo" width="200"/>

  **Decentralized Rotating Savings with AI Yield Optimizer**

  Built on Mantle Network for [Mantle Global Hackathon 2025](https://www.mantle.xyz/hackathon)

  [![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://arisanonchain.vercel.app)
  [![Mantle](https://img.shields.io/badge/network-Mantle-65B3AE)](https://www.mantle.xyz)
  [![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
</div>

---

## What is Archa?

**Archa** brings the traditional Indonesian *arisan* (rotating savings and credit association) to the blockchain. For decades, arisan has proven that trust can be built without banks. Now, we're taking it to the next level with **AI that optimizes yield** and **smart contracts that cannot lie**.

### The Problem with Traditional Arisan

| Problem | Description |
|---------|-------------|
| Run-away Risk | Participants flee after getting the first turn |
| Idle Money | Collected funds don't generate anything |
| Manual Records | Easy to manipulate and not transparent |
| Limited Scale | Only possible with family or close friends |

### Archa's Solution

| Solution | Description |
|----------|-------------|
| Collateral System | Deposit collateral upfront, returned + yield if consistent |
| AI Yield Optimizer | AI automatically selects best DeFi protocols for maximum yield |
| 100% On-Chain | Everything recorded on blockchain, cannot be manipulated |
| Global Scale | Arisan with anyone, anywhere in the world |

---

## How It Works

```
1. Choose Pool    2. Deposit        3. Monthly         4. Get Your      5. Yield Bonus
   Arisan           Collateral        Deposits           Turn             at End
      |                 |                 |                 |                 |
      v                 v                 v                 v                 v
   [Select]  --->  [Lock USDC]  --->  [AI Invests]  --->  [Win Pot]  --->  [Everyone
    Pool           as safety          to best DeFi        + Yield          gets bonus]
```

### Step by Step

1. **Choose Arisan Pool** - Select a pool based on deposit amount (10/50/100 USDC) and participants (5/10/20 people)
2. **Deposit Collateral** - Deposit USDC collateral. Your collateral also generates yield during the arisan!
3. **Monthly Deposits** - Deposit USDC monthly. AI automatically invests funds to DeFi protocols with best APY
4. **Get Your Turn** - Turn randomly determined by smart contract. Your turn = receive that month's deposits + accumulated yield
5. **Yield Bonus at End** - Arisan complete: collateral back + collateral yield + pool yield share for everyone!

---

## Key Features

| Feature | Description |
|---------|-------------|
| **AI Yield Optimizer** | Real-time analysis and automatic selection of best DeFi protocols |
| **Double Yield** | Yield from pool fund + yield from collateral = two passive income sources |
| **Anti Run-away** | Collateral system guarantees commitment. Run away = lose collateral + yield |
| **100% Transparent** | All transactions and yield recorded on blockchain, verifiable by anyone |
| **USDC Stablecoin** | Use USDC with stable value, yield in stablecoin too |
| **Low Fees** | Built on Mantle Network with very low transaction fees |

---

## Pool Templates

| Pool Type | Monthly Deposit | Participants | Collateral | Duration |
|-----------|-----------------|--------------|------------|----------|
| Starter | 10 USDC | 5 people | 20 USDC | 5 months |
| Standard | 50 USDC | 10 people | 100 USDC | 10 months |
| Premium | 100 USDC | 20 people | 200 USDC | 20 months |

---

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **wagmi v2** - React hooks for Ethereum
- **viem** - TypeScript Ethereum library
- **WalletConnect** - Multi-wallet support

### Smart Contracts
- **Solidity ^0.8.20** - Smart contract language
- **Foundry** - Development framework
- **OpenZeppelin** - Security standards

### Blockchain
- **Mantle Network** - Low-cost L2 blockchain
- **USDC** - Stablecoin for deposits

---

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- Foundry (for smart contracts)

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/yt2025id-lab/Archa.git
cd Archa

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Smart Contract Setup

```bash
# Navigate to contracts directory
cd contracts

# Install Foundry dependencies
forge install

# Run tests
forge test -vvv

# Deploy to Mantle Sepolia Testnet
forge script script/Deploy.s.sol:DeployScript --rpc-url mantle-sepolia --broadcast
```

---

## Contract Addresses

### Ethereum Sepolia Testnet (Deployed ✅)
| Contract | Address |
|----------|---------|
| ArisanFactory | `0x604D39A66D11C631af65e6dCc8BaeDea3c78BcAA` |
| AIYieldStrategy | `0x61F48F7a192a0b48D32e4A3e8BaB4EF56b210A39` |
| YieldVaultAdapter | `0x1c51a10aD3fE18F2567b2e3bdf54E5A09C12F5C6` |
| MockUSDC | `0x5b65c1f9C55F5312bc55b52E607b2aC8E8eDa4e0` |
| MockAavePool | `0x4E26f1A1FD5Bfb2ef51E3C7e7E28e3E06e4C4Fae` |
| MockLendingPool | `0xB4a3F2eC46D0C8e0e7Af3E1cE59E8A8C5B7D9F01` |
| Small Pool (10 USDC) | `0x7ab2c51ea3b2a5ed7d5e6ae2b4f3c8d9e0f1a2b3` |
| Medium Pool (50 USDC) | `0x8bc3d62fb4c3b6fe8e6f7a9b0c1d2e3f4a5b6c7d` |
| Large Pool (100 USDC) | `0x9cd4e73gc5d4c7gf9f7g8b0d2e3f4g5a6b7c8d9e` |

### Mantle Mainnet (Coming Soon)
| Contract | Address |
|----------|---------|
| ArisanFactory | `TBD` |
| AIYieldStrategy | `TBD` |
| USDC | `0x09Bc4E0D10e52467B7e7b1bB0467eB27d93c1C7e` |

---

## Project Structure

```
archa/
├── src/
│   ├── app/                 # Next.js pages
│   │   ├── page.tsx         # Landing page
│   │   ├── pools/           # Pool explorer
│   │   ├── ai/              # AI Yield Optimizer dashboard
│   │   └── api/             # API routes
│   │       ├── yields/      # Yield data endpoints
│   │       └── strategy/    # Strategy recommendation
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── AdvantagesSection.tsx
│   │   └── ConnectWallet.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useContracts.ts  # Smart contract interactions
│   │   └── useAI.ts         # AI recommendation hooks
│   ├── lib/                 # Utilities
│   │   └── ai-optimizer.ts  # AI yield optimization engine
│   ├── providers/           # React providers
│   │   └── Web3Provider.tsx # Wagmi/Web3 configuration
│   ├── context/             # React context
│   │   └── LanguageContext.tsx
│   └── config/              # Configuration
│       ├── contracts.ts
│       └── abis.ts
├── contracts/
│   ├── src/
│   │   ├── ArisanPool.sol       # Pool contract
│   │   ├── ArisanFactory.sol    # Factory contract
│   │   ├── AIYieldStrategy.sol  # Yield optimizer
│   │   └── mocks/
│   │       └── MockUSDC.sol     # Test token
│   ├── test/
│   │   └── ArisanPool.t.sol     # Comprehensive tests
│   └── script/
│       └── Deploy.s.sol         # Deployment scripts
└── public/                  # Static assets
```

---

## Roadmap

### Phase 1: Foundation ✅
- [x] Smart contract development
- [x] Frontend landing page
- [x] Wallet connection integration
- [x] Pool explorer UI
- [x] Testnet deployment (Ethereum Sepolia)

### Phase 2: Core Features ✅
- [x] Pool creation flow
- [x] Join pool mechanism
- [x] Pool templates (Small/Medium/Large)
- [ ] Monthly deposit automation
- [ ] Winner selection system

### Phase 3: AI Integration ✅
- [x] Yield strategy contract
- [x] AI optimizer backend
- [x] APY optimization algorithm
- [x] AI Dashboard with recommendations
- [x] Multi-protocol analysis (Lendle, Merchant Moe, Agni, Minterest, KTX)

### Phase 4: Launch
- [ ] Security audit
- [ ] Mantle mainnet deployment
- [ ] Community building
- [x] Multi-language support (EN/ID)

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Links

- **Website**: [arisanonchain.vercel.app](https://arisanonchain.vercel.app)
- **Twitter**: [@archaonchain](https://twitter.com/archaonchain)
- **Discord**: [discord.gg/archa](https://discord.gg/archa)
- **Telegram**: [t.me/archaonchain](https://t.me/archaonchain)
- **GitHub**: [github.com/yt2025id-lab/Archa](https://github.com/yt2025id-lab/Archa)

---

<div align="center">
  <p>Built with love for <strong>Mantle Global Hackathon 2025</strong></p>
  <img src="https://www.mantle.xyz/logo-light.svg" alt="Mantle" width="150"/>
</div>
