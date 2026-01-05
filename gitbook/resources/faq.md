# ❓ FAQ

Pertanyaan yang sering diajukan tentang Archa.

## Umum

### Apa itu Archa?

Archa adalah platform arisan terdesentralisasi di blockchain Mantle. Kami membawa tradisi keuangan komunal Indonesia (arisan) ke era modern dengan:
- Smart contracts untuk keamanan dan transparansi
- Collateral system untuk mencegah peserta kabur
- AI Yield Optimizer untuk menghasilkan yield tambahan
- VRF untuk pemilihan pemenang yang fair

### Apa bedanya dengan arisan tradisional?

| Aspek | Arisan Tradisional | Archa |
|-------|-------------------|-------|
| Kepercayaan | Bergantung pada ketua | Trustless (smart contract) |
| Transparansi | Tertutup | Fully on-chain |
| Risiko kabur | Tinggi | Minimal (collateral) |
| Yield | Tidak ada | Ada (AI optimized) |
| Pemilihan pemenang | Manual/bias | Random (VRF) |

### Apakah Archa aman?

Ya, Archa didesain dengan keamanan sebagai prioritas:
- Smart contract open source
- Collateral melindungi dari peserta kabur
- Non-custodial (Anda kontrol wallet sendiri)
- VRF menjamin fairness
- Audit direncanakan sebelum mainnet

## Bergabung & Pool

### Bagaimana cara mulai menggunakan Archa?

1. Siapkan wallet (MetaMask, Rainbow, dll)
2. Tambahkan Mantle network ke wallet
3. Dapatkan USDC di Mantle
4. Connect wallet ke Archa
5. Pilih pool dan klik "Join"

### Berapa minimum untuk join?

Tergantung pool yang Anda pilih. Setiap pool memiliki deposit amount berbeda:
- Pool kecil: 10-50 USDC
- Pool menengah: 50-200 USDC
- Pool besar: 200-1000 USDC

Yang perlu disiapkan: **Deposit pertama + Collateral**

### Apa itu collateral?

Collateral adalah jaminan yang dikunci saat Anda join pool. Ini mencegah peserta kabur setelah menang.

**Formula:**
```
Collateral = Deposit × (Total Cycles - 1)

Contoh: Pool 50 USDC × 10 orang
Collateral = 50 × 9 = 450 USDC
```

Collateral dikembalikan penuh + yield saat pool selesai.

### Bisa join lebih dari satu pool?

Ya! Anda bisa join sebanyak mungkin pool selama punya USDC yang cukup.

## Deposit & Pembayaran

### Kapan harus deposit?

Setiap cycle (biasanya bulanan), Anda wajib deposit. Ada deposit window selama ~25 hari.

### Bagaimana jika lupa deposit?

Jika lupa deposit:
1. Grace period 3 hari
2. Jika tetap tidak deposit, collateral auto-deduct
3. Jika collateral habis, Anda di-slash

**Tips:** Aktifkan notifikasi agar tidak lupa!

### Bisa deposit lebih dari yang diminta?

Tidak. Deposit harus sesuai jumlah yang ditentukan pool, tidak kurang tidak lebih.

## Pemenang & Klaim

### Bagaimana pemenang dipilih?

Pemenang dipilih menggunakan VRF (Verifiable Random Function):
1. Semua eligible participant diidentifikasi
2. Random number di-generate on-chain
3. Random number digunakan untuk memilih pemenang
4. Hasil bisa diverifikasi siapapun

### Apakah semua orang pasti menang?

Ya! Setiap participant pasti menang tepat 1 kali selama pool berlangsung.

```
10 peserta = 10 cycle = Semua dapat giliran menang
```

### Kapan menerima pot?

Pot otomatis ditransfer ke wallet Anda saat menang. Tidak perlu claim manual.

### Berapa yang saya terima saat menang?

```
Pot = (Deposit × Participants) + Yield

Contoh: 50 USDC × 10 orang + 40 USDC yield = 540 USDC
```

### Setelah menang, apakah selesai?

Tidak! Setelah menang, Anda tetap wajib deposit sampai pool selesai. Ini untuk menjaga fairness bagi peserta lain.

## Collateral & Yield

### Apakah collateral menghasilkan yield?

Ya! Collateral yang dikunci juga di-deploy ke DeFi protocols oleh AI Yield Optimizer. Anda mendapat yield dari collateral ini.

### Kapan collateral dikembalikan?

Collateral dikembalikan saat pool COMPLETED (semua cycle selesai) + semua deposit Anda terpenuhi.

### Bagaimana jika saya tidak bisa deposit?

Jika tidak deposit:
1. Collateral akan digunakan untuk cover deposit
2. Jika collateral habis, sisa di-slash
3. Anda mungkin excluded dari pool

**Solusi:** Pastikan selalu punya buffer USDC atau collateral yang cukup.

## AI Yield Optimizer

### Bagaimana AI menghasilkan yield?

AI Yield Optimizer:
1. Menganalisis 500+ DeFi protocols
2. Memprediksi APY 7 hari ke depan
3. Mengalokasikan dana ke protocols terbaik
4. Auto-rebalance saat kondisi berubah

### Protocol apa yang digunakan?

Saat ini di Mantle:
- Lendle (lending)
- Merchant Moe (DEX)
- Agni Finance (DEX)

Akan bertambah seiring development.

### Apakah yield dijamin?

Yield tidak dijamin karena tergantung kondisi market. Namun, AI berusaha mengoptimalkan dengan:
- Diversifikasi ke multiple protocols
- Risk scoring untuk setiap protocol
- Auto-rebalance saat ada anomali

## Keamanan

### Apakah uang saya aman?

Dana Anda diamankan oleh:
- Smart contract yang audited (planned)
- Non-custodial (Anda kontrol wallet)
- Collateral system mencegah peserta kabur
- Open source code

### Bagaimana jika ada bug?

Archa memiliki:
- Pausable mechanism untuk emergency
- Bug bounty program (planned)
- Security response team

### Apakah saya bisa kehilangan uang?

Risiko potensial:
- Smart contract bug (mitigated by audits)
- DeFi protocol risk (mitigated by diversification)
- Anda tidak deposit → collateral di-slash

Archa TIDAK memiliki risiko:
- Admin kabur (non-custodial)
- Peserta kabur (collateral system)
- Pemenang tidak fair (VRF)

## Teknis

### Network apa yang digunakan?

Archa berjalan di **Mantle Network**, sebuah L2 Ethereum dengan:
- Gas fees sangat rendah
- Transaksi cepat
- EVM compatible

### Token apa yang digunakan?

- **USDC** untuk deposit dan pot
- **MNT** untuk gas fees

### Bagaimana cara dapat MNT?

1. Bridge dari Ethereum
2. Beli di exchange (Bybit, KuCoin)
3. Faucet (testnet only)

### Wallet apa yang didukung?

- MetaMask
- Rainbow
- WalletConnect compatible wallets
- Coinbase Wallet
- Dan lainnya

## Lainnya

### Apakah ada biaya platform?

Saat ini (hackathon phase): **Gratis**

Kedepannya mungkin ada small fee untuk:
- Sustainability
- AI infrastructure
- Development

### Bagaimana jika pool tidak terisi penuh?

Pool akan tetap dalam status WAITING. Participant yang sudah join bisa withdraw jika pool belum mulai.

### Bisa keluar dari pool yang sudah aktif?

Tidak. Setelah pool aktif, Anda tidak bisa keluar. Ini untuk melindungi peserta lain.

### Apakah ada mobile app?

Belum. Saat ini Archa bisa diakses via mobile browser. Mobile app direncanakan untuk masa depan.

### Bagaimana cara memberi feedback?

- Twitter: @archaonchain
- Discord: discord.gg/archa
- Telegram: t.me/archaonchain
- GitHub Issues

### Dimana saya bisa belajar lebih lanjut?

- Dokumentasi ini (GitBook)
- Blog (coming soon)
- YouTube tutorials (coming soon)
- Community channels
