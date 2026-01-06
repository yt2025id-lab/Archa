# 💰 Get USDC on Mantle

Guide to getting USDC on Mantle Network.

## What is USDC?

USDC (USD Coin) is a stablecoin pegged 1:1 with the US Dollar. Archa uses USDC as the currency for all transactions because:

- **Stable:** Value doesn't fluctuate like other crypto
- **Trusted:** Issued by Circle, fully backed
- **Widely adopted:** Available on almost all exchanges

## Methods

### Method 1: Bridge from Ethereum/Other Chains

The most common way to get USDC on Mantle is to bridge from another chain.

#### Using Mantle Bridge

1. Visit [bridge.mantle.xyz](https://bridge.mantle.xyz)
2. Connect your wallet
3. Select:
   - From: Ethereum (or other chain)
   - To: Mantle
   - Asset: USDC
4. Enter the amount you want to bridge
5. Click **"Bridge"**
6. Confirm the transaction
7. Wait ~10-15 minutes for finalization

{% hint style="info" %}
Bridging from Ethereum requires ETH gas fees. Make sure you have enough ETH in your wallet.
{% endhint %}

#### Alternative Bridges

| Bridge | URL | Supported Chains |
|--------|-----|------------------|
| Stargate | [stargate.finance](https://stargate.finance) | ETH, Arbitrum, Optimism, etc. |
| Across | [across.to](https://across.to) | ETH, Arbitrum, Optimism, etc. |
| Orbiter | [orbiter.finance](https://orbiter.finance) | ETH, Arbitrum, zkSync, etc. |

### Method 2: Buy from CEX then Withdraw

1. Buy USDC on your favorite exchange:
   - Binance
   - Bybit
   - OKX
   - KuCoin

2. Withdraw to Mantle Network:
   - Select USDC
   - Network: **Mantle**
   - Paste your wallet address
   - Confirm withdrawal

{% hint style="warning" %}
Make sure your exchange supports withdrawal to Mantle Network. If not, bridge from Ethereum.
{% endhint %}

### Method 3: Swap on Mantle DEX

If you already have other tokens on Mantle (e.g., MNT, WETH), you can swap to USDC.

#### Using Merchant Moe

1. Visit [merchantmoe.com](https://merchantmoe.com)
2. Connect wallet
3. Select:
   - From: MNT (or other token)
   - To: USDC
4. Enter amount
5. Click **"Swap"**
6. Confirm transaction

#### Alternative DEXs

| DEX | URL |
|-----|-----|
| Merchant Moe | [merchantmoe.com](https://merchantmoe.com) |
| Agni Finance | [agni.finance](https://agni.finance) |
| FusionX | [fusionx.finance](https://fusionx.finance) |

## Get MNT for Gas

You need MNT (Mantle's native token) to pay for gas fees.

### Method 1: Faucet (Testnet Only)

For testnet (Mantle Sepolia):
1. Visit [faucet.sepolia.mantle.xyz](https://faucet.sepolia.mantle.xyz)
2. Connect wallet
3. Request MNT
4. Wait a few seconds

### Method 2: Buy MNT

For mainnet, buy MNT from:
- Binance
- Bybit
- OKX
- Gate.io

Then withdraw to Mantle Network.

### Method 3: Bridge ETH then Swap

1. Bridge ETH to Mantle via [bridge.mantle.xyz](https://bridge.mantle.xyz)
2. Swap some ETH to MNT on a DEX

## USDC Contract Address

If you need to add USDC to your wallet manually:

**Mantle Mainnet:**
```
USDC: 0x09Bc4E0D10e52467B7e7b1bB0467eB27d93c1C7e
```

**Mantle Sepolia (Testnet):**
```
MockUSDC: 0xb52fF96A29262BD8dC9a0Fc56CcA5a9EC9Ddbc9D
```

## How Much USDC Do I Need?

To join Archa, you need:

```
Required = Collateral + First Deposit + Buffer for Gas

Example Pool 50 USDC/month, 10 participants:
- Collateral: 562.5 USDC (125% × 50 × 9)
- First deposit: 50 USDC
- Recommended buffer: 10 USDC
- TOTAL: ~623 USDC
```

| Pool Type | Monthly | Collateral (125%) | Min. USDC |
|-----------|---------|-------------------|-----------|
| Starter | 10 USDC | 50 USDC | ~65 USDC |
| Standard | 50 USDC | 562.5 USDC | ~625 USDC |
| Premium | 100 USDC | 2,375 USDC | ~2,485 USDC |

## Troubleshooting

### USDC not showing in wallet
- Make sure you've switched to Mantle Network
- Add token manually with the contract address above
- Refresh wallet / reconnect

### Bridge stuck
- Wait a few minutes (can take up to 30 minutes)
- Check status on the bridge website
- If more than 1 hour, contact bridge support

### Swap failed
- Make sure you have enough MNT for gas
- Try increasing slippage tolerance
- Try a smaller amount

## Next Steps

After you have USDC and MNT:
- [🚀 Quickstart](quickstart.md)
- [📝 Join Pool](../guides/join-pool.md)
