# 🏗️ Architecture

Technical architecture of the Archa platform.

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         ARCHA PLATFORM                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐         ┌─────────────────┐               │
│  │   Frontend      │         │   AI Backend    │               │
│  │   (Next.js)     │◄───────►│   (FastAPI)     │               │
│  └────────┬────────┘         └────────┬────────┘               │
│           │                           │                         │
│           │    ┌──────────────────────┘                        │
│           │    │                                                │
│           ▼    ▼                                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   MANTLE NETWORK                         │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │                                                         │   │
│  │  ┌──────────────┐    ┌──────────────┐   ┌────────────┐ │   │
│  │  │ ArisanFactory│───►│  ArisanPool  │──►│  USDC      │ │   │
│  │  │              │    │  (multiple)  │   │  Token     │ │   │
│  │  └──────────────┘    └──────────────┘   └────────────┘ │   │
│  │                              │                         │   │
│  │                              ▼                         │   │
│  │                   ┌──────────────────┐                 │   │
│  │                   │ Yield Optimizer  │                 │   │
│  │                   │ (DeFi Protocols) │                 │   │
│  │                   └──────────────────┘                 │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Stack

### Frontend

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | Next.js 14 | React-based web application |
| Styling | Tailwind CSS | Utility-first CSS |
| Web3 | RainbowKit + wagmi | Wallet connection |
| State | React Context | Global state management |
| Language | TypeScript | Type safety |

### Backend (AI Service)

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | FastAPI | Python async API |
| AI/ML | Custom models | Yield prediction |
| Data Source | DefiLlama API | Protocol data |
| Caching | Redis | Performance optimization |

### Blockchain

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Network | Mantle | L2 Ethereum |
| Language | Solidity | Smart contracts |
| Standards | ERC-20 | Token standard |
| Randomness | VRF | Fair winner selection |

## Frontend Architecture

### Directory Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── pools/
│       └── page.tsx        # Pools page
├── components/
│   ├── Header.tsx          # Navigation
│   ├── Footer.tsx          # Footer
│   ├── HeroSection.tsx     # Landing hero
│   ├── PoolCard.tsx        # Pool display card
│   └── ...
├── context/
│   ├── LanguageContext.tsx # i18n
│   └── Web3Context.tsx     # Web3 provider
├── hooks/
│   ├── usePool.ts          # Pool interactions
│   └── useYield.ts         # Yield data
├── lib/
│   ├── contracts.ts        # Contract ABIs & addresses
│   └── utils.ts            # Helper functions
└── types/
    └── index.ts            # TypeScript types
```

### Component Hierarchy

```
App
├── Providers (Web3, Language)
│   ├── Header
│   ├── Main Content
│   │   ├── HeroSection
│   │   ├── FeaturesSection
│   │   ├── HowItWorks
│   │   └── PoolsSection
│   │       └── PoolCard (multiple)
│   └── Footer
```

### State Management

```
┌─────────────────────────────────────────┐
│           Context Providers              │
├─────────────────────────────────────────┤
│                                         │
│  LanguageContext                        │
│  ├─ language: 'id' | 'en'               │
│  ├─ t: translation function             │
│  └─ setLanguage: setter                 │
│                                         │
│  Web3Context (RainbowKit)               │
│  ├─ address: connected wallet           │
│  ├─ chain: current network              │
│  ├─ isConnected: boolean                │
│  └─ connectors: wallet options          │
│                                         │
└─────────────────────────────────────────┘
```

## Smart Contract Architecture

### Contract Relationships

```
┌─────────────────────────────────────────────────────────┐
│                    FACTORY PATTERN                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ArisanFactory                                          │
│  ├─ createPool() ──► Deploys new ArisanPool            │
│  ├─ getPools() ──► Returns all pool addresses          │
│  └─ Stores: USDC address, YieldOptimizer address       │
│                                                         │
│       │                                                 │
│       │ creates                                         │
│       ▼                                                 │
│                                                         │
│  ArisanPool #1    ArisanPool #2    ArisanPool #N       │
│  ├─ Participants  ├─ Participants  ├─ Participants     │
│  ├─ Collateral    ├─ Collateral    ├─ Collateral       │
│  ├─ Deposits      ├─ Deposits      ├─ Deposits         │
│  └─ Winner Logic  └─ Winner Logic  └─ Winner Logic     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → Frontend → Smart Contract → Blockchain → Events → Frontend Update

Example: Join Pool
1. User clicks "Join Pool"
2. Frontend calls pool.joinPool()
3. Transaction sent to Mantle
4. Contract validates & transfers USDC
5. ParticipantJoined event emitted
6. Frontend listens & updates UI
```

## AI Yield Optimizer Architecture

### Overview

```
┌─────────────────────────────────────────────────────────┐
│                  AI YIELD OPTIMIZER                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Data Layer                                             │
│  ├─ DefiLlama API ──► Protocol TVL, APY data           │
│  ├─ On-chain data ──► Transaction history              │
│  └─ Historical DB ──► Past performance                 │
│                                                         │
│  Analysis Layer                                         │
│  ├─ Yield Prophet ──► APY trend prediction             │
│  ├─ Liquidity Pulse ──► TVL monitoring, whale alerts   │
│  └─ Risk Scorer ──► Protocol risk assessment           │
│                                                         │
│  Strategy Layer                                         │
│  ├─ Meta-Strategy ──► Optimal allocation               │
│  └─ Rebalancer ──► Auto-rebalance triggers             │
│                                                         │
│  Execution Layer                                        │
│  ├─ Smart Contract ──► On-chain execution              │
│  └─ Keeper/Relayer ──► Automated triggers              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### AI Pipeline

```
Raw Data ──► Preprocessing ──► Feature Extraction ──► ML Model ──► Prediction ──► Action

Example: Yield Prediction
1. Fetch 30-day APY history from DefiLlama
2. Normalize and clean data
3. Extract features (trend, volatility, seasonality)
4. Feed to prediction model
5. Output: 7-day APY forecast
6. Action: Recommend allocation changes
```

### Supported Protocols (Mantle)

| Protocol | Type | Integration Status |
|----------|------|-------------------|
| Lendle | Lending | Active |
| Merchant Moe | DEX | Active |
| Agni Finance | DEX | Active |
| Minterest | Lending | Planned |
| KTX Finance | Perps | Planned |

## Security Architecture

### Multi-Layer Security

```
┌─────────────────────────────────────────────────────────┐
│                   SECURITY LAYERS                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Layer 1: Smart Contract Security                       │
│  ├─ Reentrancy guards                                   │
│  ├─ Access control                                      │
│  ├─ Input validation                                    │
│  └─ Pausable functionality                              │
│                                                         │
│  Layer 2: Protocol Security                             │
│  ├─ Timelock for admin actions                          │
│  ├─ Multi-sig for emergency functions                   │
│  └─ Rate limiting                                       │
│                                                         │
│  Layer 3: Frontend Security                             │
│  ├─ Transaction simulation                              │
│  ├─ Approval management                                 │
│  └─ Phishing protection                                 │
│                                                         │
│  Layer 4: AI Security                                   │
│  ├─ Strategy constraints                                │
│  ├─ Risk limits                                         │
│  └─ Human oversight                                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Deployment Architecture

### Infrastructure

```
┌─────────────────────────────────────────────────────────┐
│                   DEPLOYMENT                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Frontend                                               │
│  └─ Vercel                                              │
│     ├─ Auto-deploy from GitHub                          │
│     ├─ Edge CDN                                         │
│     └─ URL: arisanonchain.vercel.app                    │
│                                                         │
│  Smart Contracts                                        │
│  └─ Mantle Sepolia (Testnet)                           │
│     ├─ Factory: 0x...                                   │
│     └─ Future: Mantle Mainnet                           │
│                                                         │
│  AI Backend                                             │
│  └─ Cloud Provider (TBD)                               │
│     ├─ API endpoint                                     │
│     └─ Scheduled jobs (yield optimization)              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### CI/CD Pipeline

```
GitHub Push ──► Tests ──► Build ──► Deploy

1. Push to main branch
2. Run unit tests & linting
3. Build production bundle
4. Deploy to Vercel (frontend)
5. Hardhat deploy (contracts, if changed)
```

## Scalability Considerations

### Current Limitations

- Single network (Mantle only)
- Limited protocol integrations
- Centralized AI backend

### Future Scaling

```
Scaling Roadmap:
├─ Phase 1: Optimize current architecture
├─ Phase 2: Multi-chain support
├─ Phase 3: Decentralized AI (oracle network)
└─ Phase 4: Cross-chain yield strategies
```

## API Endpoints (AI Backend)

### Public Endpoints

```
GET  /api/protocols          # List supported protocols
GET  /api/yields/:protocol   # Get yield data
GET  /api/predict/:protocol  # Get yield prediction
POST /api/strategy           # Get recommended strategy
```

### Response Format

```json
{
  "success": true,
  "data": {
    "protocol": "lendle",
    "currentAPY": 8.2,
    "prediction": {
      "7day": 9.5,
      "confidence": 0.87,
      "trend": "SUNNY"
    }
  },
  "timestamp": 1704067200
}
```

## Monitoring & Analytics

### Metrics Tracked

| Category | Metrics |
|----------|---------|
| Pools | Total pools, TVL, active participants |
| Users | Unique wallets, transactions |
| Yield | APY performance, optimizer efficiency |
| System | Uptime, response time, error rate |

### Tools

- Block explorer monitoring
- Custom dashboard (coming soon)
- Alerting for anomalies
