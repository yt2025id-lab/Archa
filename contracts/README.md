# Archa Smart Contracts

Decentralized rotating savings (arisan) pools with AI yield optimization on Mantle Network.

Built for **Mantle Global Hackathon 2025**.

## Contracts

- **ArisanFactory.sol** - Factory contract to create and manage Arisan pools
- **ArisanPool.sol** - Main arisan pool contract with collateral system
- **AIYieldStrategy.sol** - Mock yield strategy for AI optimization demonstration
- **MockUSDC.sol** - Mock USDC token for testing

## Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- Private key with MNT tokens (for gas)

## Setup

```bash
# Install dependencies
forge install

# Build contracts
forge build

# Run tests
forge test -vv
```

## Deploy to Mantle Sepolia Testnet

1. Get MNT testnet tokens from [Mantle Sepolia Faucet](https://faucet.sepolia.mantle.xyz/)

2. Create `.env` file:
```bash
cp .env.example .env
# Edit .env and add your private key (without 0x prefix)
```

3. Deploy:
```bash
# Load environment variables
source .env

# Deploy to Mantle Sepolia
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url https://rpc.sepolia.mantle.xyz \
  --broadcast \
  --verify
```

## Deploy to Mantle Mainnet

```bash
forge script script/Deploy.s.sol:DeployMainnetScript \
  --rpc-url https://rpc.mantle.xyz \
  --broadcast \
  --verify
```

## Contract Addresses

### Mantle Sepolia (Testnet)
| Contract | Address |
|----------|---------|
| MockUSDC | TBD |
| AIYieldStrategy | TBD |
| ArisanFactory | TBD |

### Mantle Mainnet
| Contract | Address |
|----------|---------|
| USDC | 0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9 |
| AIYieldStrategy | TBD |
| ArisanFactory | TBD |

## Pool Templates

| Template | Deposit | Participants | Cycle |
|----------|---------|--------------|-------|
| Small Pool | 10 USDC | 5 | 30 days |
| Medium Pool | 50 USDC | 10 | 30 days |
| Large Pool | 100 USDC | 20 | 30 days |

## Architecture

```
ArisanFactory
    ├── Creates ArisanPool instances
    ├── Manages pool templates
    └── Sets AI optimizer

ArisanPool
    ├── Manages participants & collateral
    ├── Handles deposits & payouts
    ├── Integrates with IYieldStrategy
    └── Slashes collateral for missed payments

AIYieldStrategy
    ├── Mock yield protocol integration
    ├── Simulates APY accrual
    └── Allows protocol switching (AI optimization)
```

## Security

- Collateral system prevents defaults
- Only pool owner can select winners
- Only AI optimizer can update yield strategy
- Proper access control with modifiers

## License

MIT
