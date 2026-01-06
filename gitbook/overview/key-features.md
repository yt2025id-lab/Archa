# 🔑 Key Features

## 1. Collateral System

### Apa itu Collateral?
Collateral adalah deposit jaminan yang wajib dibayar setiap peserta sebelum ikut arisan. Collateral berfungsi sebagai "jaminan komitmen" - jika peserta tidak konsisten, collateral akan disita.

### Cara Perhitungan
```
Collateral = 125% × Setoran Bulanan × (Jumlah Peserta - 1)
```

**Contoh:**
- Pool dengan 10 peserta
- Setoran bulanan: 50 USDC
- Collateral = 1.25 × 50 × 9 = **562.5 USDC**

### Kenapa 125%?
Multiplier 125% memastikan tidak ada keuntungan ekonomi dari kabur setelah menang pertama. Dengan collateral lebih besar dari pot pertama, peserta yang kabur akan RUGI - bukan untung.

### Kapan Collateral Dikembalikan?
- **Arisan selesai:** Collateral + yield dikembalikan penuh
- **Peserta kabur:** Collateral disita untuk menutupi kewajiban

---

## 2. AI Yield Optimizer

### Bagaimana Cara Kerjanya?
AI menganalisis semua DeFi protocols di Mantle Network dan secara otomatis mengalokasikan dana ke protocol dengan risk-adjusted yield terbaik.

### Protocol yang Dianalisis
- Lendle (Lending)
- Merchant Moe (DEX/AMM)
- Agni Finance (Lending)
- Dan protocol lainnya di Mantle

### Strategi
```
┌─────────────────────────────────────────┐
│ AI YIELD OPTIMIZER                      │
├─────────────────────────────────────────┤
│                                         │
│ Input: Dana Pool + Collateral           │
│                                         │
│ Analysis:                               │
│ ├─ APY comparison                       │
│ ├─ TVL & liquidity depth                │
│ ├─ Historical volatility                │
│ ├─ Smart contract risk                  │
│ └─ Whale activity detection             │
│                                         │
│ Output: Optimal allocation              │
│                                         │
└─────────────────────────────────────────┘
```

### Risk Profiles
| Profile | Description | Expected APY |
|---------|-------------|--------------|
| Conservative | Stablecoin lending only | 5-8% |
| Moderate | Mixed strategies | 8-12% |
| Aggressive | Higher risk protocols | 12-20% |

---

## 3. Double Yield

### Dua Sumber Passive Income
Peserta Archa mendapat yield dari dua tempat:

#### 1. Pool Yield
Dana yang terkumpul setiap bulan tidak didiamkan. AI menginvestasikan ke DeFi dan yield dibagikan ke pemenang setiap bulan.

#### 2. Collateral Yield
Collateral yang dikunci juga diinvestasikan. Yield dari collateral dikembalikan bersama collateral di akhir arisan.

### Simulasi Keuntungan
```
Pool: 10 orang × 50 USDC/bulan × 10 bulan

Total Pool: 5,000 USDC
Collateral per orang: 562.5 USDC (125% × 50 × 9)
Total Collateral: 5,625 USDC

Asumsi APY 10%:
- Pool yield (10 bulan): ~420 USDC
- Collateral yield (10 bulan): ~470 USDC
- Total extra yield: ~890 USDC
- Per person extra: ~89 USDC

Tanpa Archa: 0 USDC yield
Dengan Archa: +89 USDC per orang
```

---

## 4. Fair Winner Selection

### Transparent Randomness
Pemenang setiap bulan ditentukan oleh smart contract menggunakan verifiable random function (VRF). Tidak ada yang bisa memanipulasi siapa yang dapat giliran.

### Mekanisme
1. Setiap peserta mendapat "nomor urut" saat join
2. Di akhir setiap cycle, VRF generate random number
3. Random number menentukan pemenang dari eligible participants
4. Pemenang menerima pot + yield bulan itu
5. Pemenang marked sebagai "sudah dapat giliran"

### Fairness Guarantee
- Semua peserta pasti dapat giliran tepat 1x
- Urutan tidak bisa diprediksi atau dimanipulasi
- Hasil random bisa diverifikasi on-chain

---

## 5. Anti-Kabur System

### Skenario: Peserta Tidak Bayar
```
Peserta X tidak bayar setoran bulan ke-5?

1. Grace period 3 hari
2. Jika tidak bayar: Collateral dipotong
3. Setoran diambil dari collateral
4. Arisan tetap berjalan normal
5. Peserta lain tidak dirugikan
```

### Skenario: Peserta Kabur Setelah Dapat Giliran
```
Peserta Y dapat giliran bulan ke-2, lalu kabur?

1. Bulan ke-3: Tidak bayar setoran
2. Collateral dipotong untuk menutupi setoran
3. Bulan ke-4 dst: Sama
4. Jika collateral habis: Peserta auto-removed
5. Peserta lain tidak dirugikan
```

### Kenapa Sistem Ini Efektif?
- **Insentif ekonomi:** Kabur = rugi collateral + yield
- **Automatic enforcement:** Smart contract eksekusi tanpa kompromi
- **No human intervention:** Tidak ada "maaf-maafan"

---

## 6. Transparency

### On-Chain Data
Semua data arisan tercatat di blockchain:
- Siapa saja peserta
- Berapa collateral masing-masing
- History setoran
- Siapa yang sudah dapat giliran
- Yield yang dihasilkan
- Alokasi AI ke protocols

### Verifiable
Siapapun bisa verify:
- Pool balance
- Collateral status
- Yield accrual
- Winner history
- Smart contract logic

---

## Comparison Table

| Feature | Archa | Traditional Arisan | Other DeFi |
|---------|-------|-------------------|------------|
| Rotating Savings | ✅ | ✅ | ❌ |
| Anti-Kabur | ✅ Collateral | ❌ Trust only | N/A |
| Yield | ✅ AI Optimized | ❌ 0% | ✅ Manual |
| Transparency | ✅ On-chain | ❌ Manual | ✅ On-chain |
| Cultural Fit | ✅ Indonesian | ✅ Indonesian | ❌ Foreign |
| Low Fees | ✅ Mantle | N/A | ❌ ETH gas |
| Easy to Use | ✅ | ✅ | ❌ Complex |
