# 👛 Connect Wallet

Panduan lengkap untuk menghubungkan wallet ke Archa.

## Supported Wallets

Archa mendukung wallet berikut:

| Wallet | Platform | Recommended |
|--------|----------|-------------|
| MetaMask | Browser, Mobile | ✅ Yes |
| WalletConnect | Mobile | ✅ Yes |
| Coinbase Wallet | Browser, Mobile | ✅ Yes |
| Rainbow | Mobile | ✅ Yes |
| Trust Wallet | Mobile | ✅ Yes |

## MetaMask Setup

### 1. Install MetaMask

Jika belum punya MetaMask:
1. Kunjungi [metamask.io](https://metamask.io)
2. Download extension untuk browser Anda
3. Ikuti setup wizard untuk membuat wallet baru
4. **PENTING:** Simpan seed phrase dengan aman!

### 2. Add Mantle Network

Archa akan otomatis menambahkan Mantle Network ke MetaMask Anda. Jika perlu menambahkan manual:

**Mantle Mainnet:**
```
Network Name: Mantle
RPC URL: https://rpc.mantle.xyz
Chain ID: 5000
Currency Symbol: MNT
Block Explorer: https://explorer.mantle.xyz
```

**Mantle Sepolia (Testnet):**
```
Network Name: Mantle Sepolia
RPC URL: https://rpc.sepolia.mantle.xyz
Chain ID: 5003
Currency Symbol: MNT
Block Explorer: https://explorer.sepolia.mantle.xyz
```

### 3. Connect to Archa

1. Kunjungi [arisanonchain.vercel.app](https://arisanonchain.vercel.app)
2. Klik **"Connect Wallet"**
3. Pilih **"MetaMask"**
4. MetaMask popup akan muncul
5. Pilih account yang ingin digunakan
6. Klik **"Connect"**
7. Jika diminta switch network, klik **"Switch Network"**

<figure><img src="../.gitbook/assets/metamask-connect.png" alt=""><figcaption><p>MetaMask Connection</p></figcaption></figure>

## WalletConnect Setup

### 1. Open Archa

1. Kunjungi [arisanonchain.vercel.app](https://arisanonchain.vercel.app)
2. Klik **"Connect Wallet"**
3. Pilih **"WalletConnect"**

### 2. Scan QR Code

1. QR code akan muncul
2. Buka wallet app di HP Anda
3. Cari fitur "WalletConnect" atau "Scan"
4. Scan QR code
5. Approve connection di wallet app

### 3. Confirm Connection

1. Wallet app akan meminta konfirmasi
2. Review permissions
3. Klik **"Approve"** atau **"Connect"**
4. Anda sekarang terhubung ke Archa

## Troubleshooting

### Wallet tidak terdeteksi
- Pastikan MetaMask extension sudah ter-install
- Refresh halaman browser
- Coba disable ad blocker

### Network salah
- Pastikan wallet di Mantle Network
- Klik icon network di MetaMask
- Pilih "Mantle" atau tambahkan manual

### Transaction gagal
- Pastikan ada cukup MNT untuk gas
- Coba naikkan gas limit
- Tunggu beberapa saat dan coba lagi

### Connection terputus
- Refresh halaman
- Re-connect wallet
- Clear browser cache jika masih bermasalah

## Security Tips

{% hint style="danger" %}
**JANGAN PERNAH:**
- Share seed phrase / private key
- Approve unlimited spending ke contract yang tidak dipercaya
- Connect wallet ke situs yang mencurigakan
{% endhint %}

{% hint style="success" %}
**SELALU:**
- Verify URL situs (arisanonchain.vercel.app)
- Review transaction sebelum approve
- Disconnect wallet setelah selesai menggunakan
{% endhint %}

## Disconnect Wallet

Untuk memutus koneksi wallet:

1. Klik address Anda di pojok kanan atas
2. Klik **"Disconnect"**
3. Wallet Anda sekarang tidak terhubung

Atau dari MetaMask:
1. Klik icon MetaMask
2. Klik tiga titik di pojok kanan atas
3. Pilih **"Connected sites"**
4. Disconnect Archa

## Next Steps

Setelah wallet terhubung:
- [💰 Dapatkan USDC di Mantle](get-usdc.md)
- [📝 Join pool pertama Anda](../guides/join-pool.md)
