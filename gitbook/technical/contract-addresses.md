# 📍 Contract Addresses

List of Archa smart contract addresses on various networks.

## Mantle Sepolia Testnet

Network for development and testing.

### Core Contracts

| Contract | Address | Status |
|----------|---------|--------|
| ArisanFactory | `0x15078CaEC56D393F8966999E12e1C03d34D27C16` | ✅ Deployed |
| AIYieldStrategy | `0x09beBF7c34b05234c0c2462DCCC9A828B595de12` | ✅ Deployed |
| Mock USDC | `0xb52fF96A29262BD8dC9a0Fc56CcA5a9EC9Ddbc9D` | ✅ Deployed |

### Verified Contracts

All contracts will be verified on Mantle Block Explorer:
- https://explorer.sepolia.mantle.xyz

### Network Details

```
Network Name: Mantle Sepolia Testnet
RPC URL: https://rpc.sepolia.mantle.xyz
Chain ID: 5003
Currency: MNT
Explorer: https://explorer.sepolia.mantle.xyz
```

## Mantle Mainnet (Coming Soon)

Production network for real users.

### Core Contracts

| Contract | Address | Status |
|----------|---------|--------|
| ArisanFactory | TBD | ⏳ Post-Hackathon |
| USDC | `0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9` | ✅ Official |

### Network Details

```
Network Name: Mantle
RPC URL: https://rpc.mantle.xyz
Chain ID: 5000
Currency: MNT
Explorer: https://explorer.mantle.xyz
```

## Token Addresses

### Mantle Mainnet

| Token | Address | Decimals |
|-------|---------|----------|
| USDC | `0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9` | 6 |
| USDT | `0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE` | 6 |
| WETH | `0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111` | 18 |
| WMNT | `0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8` | 18 |

### Mantle Sepolia Testnet

| Token | Address | Notes |
|-------|---------|-------|
| Mock USDC | `0xb52fF96A29262BD8dC9a0Fc56CcA5a9EC9Ddbc9D` | Test token for hackathon |
| MNT | Native | Gas token |

## DeFi Protocol Addresses (Mantle)

Protocols integrated with AI Yield Optimizer:

### Lendle

| Contract | Address |
|----------|---------|
| LendingPool | `0xCFa5aE7c2CE8Fadc6426C1ff872cA45378Fb7cF3` |
| USDC aToken | `0xF36AFb467D1f05541d998BBBcd5F7167D67bd8fC` |

### Merchant Moe

| Contract | Address |
|----------|---------|
| Router | `0x...` |
| Factory | `0x...` |

### Agni Finance

| Contract | Address |
|----------|---------|
| Router | `0x319B69888b0d11cEC22caA5034e25FfFBDc88421` |
| Factory | `0x25780dc8Fc3cfBD75F33bFDAB65e969b603b2035` |

## Adding Network to MetaMask

### Mantle Mainnet

```
1. Open MetaMask
2. Click network dropdown
3. Select "Add Network"
4. Enter details:
   - Network Name: Mantle
   - RPC URL: https://rpc.mantle.xyz
   - Chain ID: 5000
   - Currency Symbol: MNT
   - Explorer: https://explorer.mantle.xyz
5. Save
```

### Mantle Sepolia Testnet

```
1. Open MetaMask
2. Click network dropdown
3. Select "Add Network"
4. Enter details:
   - Network Name: Mantle Sepolia
   - RPC URL: https://rpc.sepolia.mantle.xyz
   - Chain ID: 5003
   - Currency Symbol: MNT
   - Explorer: https://explorer.sepolia.mantle.xyz
5. Save
```

## Import Custom Tokens

### Adding USDC to MetaMask

```
1. Open MetaMask on Mantle network
2. Click "Import tokens"
3. Enter USDC address:
   0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9
4. Token symbol: USDC
5. Decimals: 6
6. Import
```

## Contract Verification

### Verification Status

| Network | Contract | Verified |
|---------|----------|----------|
| Mantle Sepolia | ArisanFactory | ✅ Deployed |
| Mantle Sepolia | AIYieldStrategy | ✅ Deployed |
| Mantle Sepolia | MockUSDC | ✅ Deployed |
| Mantle Mainnet | All | ⏳ Post-Hackathon |

### How to Verify

Using Hardhat:

```bash
npx hardhat verify --network mantleSepolia DEPLOYED_CONTRACT_ADDRESS "Constructor Arg 1" "Constructor Arg 2"
```

### Explorer Links

- Mainnet: https://explorer.mantle.xyz/address/CONTRACT_ADDRESS
- Testnet: https://explorer.sepolia.mantle.xyz/address/CONTRACT_ADDRESS

## Contract ABIs

### ArisanFactory ABI

```json
{
  "abi": [
    {
      "inputs": [
        {"name": "_usdcToken", "type": "address"},
        {"name": "_yieldOptimizer", "type": "address"}
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {"name": "_depositAmount", "type": "uint256"},
        {"name": "_totalParticipants", "type": "uint256"},
        {"name": "_cycleDuration", "type": "uint256"}
      ],
      "name": "createPool",
      "outputs": [{"name": "", "type": "address"}],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPools",
      "outputs": [{"name": "", "type": "address[]"}],
      "stateMutability": "view",
      "type": "function"
    }
  ]
}
```

### ArisanPool ABI (Partial)

```json
{
  "abi": [
    {
      "inputs": [],
      "name": "joinPool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "selectWinner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPoolInfo",
      "outputs": [
        {"name": "state", "type": "uint8"},
        {"name": "currentCycle", "type": "uint256"},
        {"name": "depositAmount", "type": "uint256"},
        {"name": "totalParticipants", "type": "uint256"},
        {"name": "currentParticipants", "type": "uint256"}
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
}
```

## Updates

This page will be updated when:
- New contracts are deployed
- Migration to mainnet
- Protocol integrations are added

**Last Updated:** January 2025
