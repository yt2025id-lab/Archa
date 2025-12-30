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

### Mantle Sepolia Testnet
| Contract | Address |
|----------|---------|
| ArisanFactory | `TBD` |
| AIYieldStrategy | `TBD` |
| MockUSDC | `TBD` |

### Mantle Mainnet
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
│   │   └── pools/           # Pool explorer
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── AdvantagesSection.tsx
│   │   └── ConnectWallet.tsx
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

### Phase 1: Foundation
- [x] Smart contract development
- [x] Frontend landing page
- [x] Wallet connection integration
- [x] Pool explorer UI
- [ ] Testnet deployment

### Phase 2: Core Features
- [ ] Pool creation flow
- [ ] Join pool mechanism
- [ ] Monthly deposit automation
- [ ] Winner selection system

### Phase 3: AI Integration
- [ ] Yield strategy integration
- [ ] Protocol switching logic
- [ ] APY optimization algorithm
- [ ] Performance dashboard

### Phase 4: Launch
- [ ] Security audit
- [ ] Mainnet deployment
- [ ] Community building
- [ ] Multi-language support

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
