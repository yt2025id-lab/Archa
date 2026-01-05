# 💰 Get USDC on Mantle

Panduan untuk mendapatkan USDC di Mantle Network.

## Apa itu USDC?

USDC (USD Coin) adalah stablecoin yang dipatok 1:1 dengan US Dollar. Archa menggunakan USDC sebagai mata uang untuk semua transaksi karena:

- **Stabil:** Nilai tidak fluktuatif seperti crypto lain
- **Trusted:** Diterbitkan oleh Circle, fully backed
- **Widely adopted:** Tersedia di hampir semua exchange

## Methods

### Method 1: Bridge dari Ethereum/Other Chains

Cara paling umum untuk mendapatkan USDC di Mantle adalah bridge dari chain lain.

#### Menggunakan Mantle Bridge

1. Kunjungi [bridge.mantle.xyz](https://bridge.mantle.xyz)
2. Connect wallet Anda
3. Pilih:
   - From: Ethereum (atau chain lain)
   - To: Mantle
   - Asset: USDC
4. Masukkan jumlah yang ingin di-bridge
5. Klik **"Bridge"**
6. Confirm transaction
7. Tunggu ~10-15 menit untuk finalisasi

{% hint style="info" %}
Bridge dari Ethereum memerlukan gas fee ETH. Pastikan ada cukup ETH di wallet Anda.
{% endhint %}

#### Bridge Alternatif

| Bridge | URL | Supported Chains |
|--------|-----|------------------|
| Stargate | [stargate.finance](https://stargate.finance) | ETH, Arbitrum, Optimism, dll |
| Across | [across.to](https://across.to) | ETH, Arbitrum, Optimism, dll |
| Orbiter | [orbiter.finance](https://orbiter.finance) | ETH, Arbitrum, zkSync, dll |

### Method 2: Buy dari CEX lalu Withdraw

1. Beli USDC di exchange favorit Anda:
   - Binance
   - Bybit
   - OKX
   - KuCoin

2. Withdraw ke Mantle Network:
   - Pilih USDC
   - Network: **Mantle**
   - Paste address wallet Anda
   - Confirm withdrawal

{% hint style="warning" %}
Pastikan exchange Anda support withdrawal ke Mantle Network. Jika tidak, bridge dari Ethereum.
{% endhint %}

### Method 3: Swap di Mantle DEX

Jika Anda sudah punya token lain di Mantle (misal: MNT, WETH), Anda bisa swap ke USDC.

#### Menggunakan Merchant Moe

1. Kunjungi [merchantmoe.com](https://merchantmoe.com)
2. Connect wallet
3. Pilih:
   - From: MNT (atau token lain)
   - To: USDC
4. Masukkan jumlah
5. Klik **"Swap"**
6. Confirm transaction

#### DEX Alternatif

| DEX | URL |
|-----|-----|
| Merchant Moe | [merchantmoe.com](https://merchantmoe.com) |
| Agni Finance | [agni.finance](https://agni.finance) |
| FusionX | [fusionx.finance](https://fusionx.finance) |

## Get MNT for Gas

Anda memerlukan MNT (native token Mantle) untuk membayar gas fee.

### Method 1: Faucet (Testnet Only)

Untuk testnet (Mantle Sepolia):
1. Kunjungi [faucet.sepolia.mantle.xyz](https://faucet.sepolia.mantle.xyz)
2. Connect wallet
3. Request MNT
4. Tunggu beberapa detik

### Method 2: Buy MNT

Untuk mainnet, beli MNT dari:
- Binance
- Bybit
- OKX
- Gate.io

Lalu withdraw ke Mantle Network.

### Method 3: Bridge ETH lalu Swap

1. Bridge ETH ke Mantle via [bridge.mantle.xyz](https://bridge.mantle.xyz)
2. Swap sebagian ETH ke MNT di DEX

## USDC Contract Address

Jika perlu menambahkan USDC ke wallet secara manual:

**Mantle Mainnet:**
```
USDC: 0x09Bc4E0D10e52467B7e7b1bB0467eB27d93c1C7e
```

**Mantle Sepolia (Testnet):**
```
MockUSDC: [Check contract addresses page]
```

## How Much USDC Do I Need?

Untuk ikut Archa, Anda memerlukan:

```
Required = Collateral + First Deposit + Buffer for Gas

Contoh Pool 50 USDC/bulan, 10 peserta:
- Collateral: 450 USDC
- First deposit: 50 USDC
- Recommended buffer: 10 USDC
- TOTAL: ~510 USDC
```

| Pool Type | Monthly | Collateral | Min. USDC |
|-----------|---------|------------|-----------|
| Starter | 10 USDC | 40 USDC | ~55 USDC |
| Standard | 50 USDC | 450 USDC | ~510 USDC |
| Premium | 100 USDC | 1,900 USDC | ~2,010 USDC |

## Troubleshooting

### USDC tidak muncul di wallet
- Pastikan sudah switch ke Mantle Network
- Add token manually dengan contract address di atas
- Refresh wallet / reconnect

### Bridge stuck
- Tunggu beberapa menit (bisa sampai 30 menit)
- Check status di bridge website
- Jika lebih dari 1 jam, contact support bridge

### Swap failed
- Pastikan ada cukup MNT untuk gas
- Coba naikkan slippage tolerance
- Coba jumlah yang lebih kecil

## Next Steps

Setelah punya USDC dan MNT:
- [🚀 Quickstart](quickstart.md)
- [📝 Join Pool](../guides/join-pool.md)
