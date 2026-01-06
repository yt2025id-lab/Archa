# 🔒 Collateral System

Panduan lengkap tentang sistem collateral di Archa.

## Apa itu Collateral?

Collateral adalah deposit jaminan yang wajib dibayar oleh setiap peserta sebelum bergabung dengan pool arisan. Collateral berfungsi sebagai:

1. **Jaminan Komitmen:** Memastikan peserta akan konsisten membayar setoran
2. **Perlindungan Pool:** Jika ada yang default, pool tetap berjalan
3. **Sumber Yield Tambahan:** Collateral juga diinvestasikan ke DeFi

## Mengapa Perlu Collateral?

### Masalah Arisan Tradisional

```
Tanpa Collateral:
├─ Peserta A dapat giliran bulan ke-2
├─ Peserta A menerima 500 USDC
├─ Bulan ke-3: Peserta A kabur
├─ Bulan ke-4 dst: Peserta A tidak bayar
└─ Peserta lain RUGI karena pot tidak penuh
```

### Dengan Collateral System

```
Dengan Collateral:
├─ Peserta A deposit collateral 450 USDC
├─ Peserta A dapat giliran bulan ke-2
├─ Peserta A menerima 500 USDC
├─ Bulan ke-3: Peserta A tidak bayar
├─ Smart contract potong collateral 50 USDC
├─ Pot tetap penuh untuk pemenang bulan itu
└─ Peserta lain TIDAK RUGI
```

## Formula Collateral

```
Collateral = 125% × Deposit Amount × (Number of Participants - 1)
```

### Penjelasan Formula

**Kenapa dikurangi 1?**

Karena setiap peserta akan menerima pot tepat 1 kali. Saat menerima pot, mereka tidak perlu deposit bulan itu (pot sudah menutupi). Jadi kewajiban maksimal adalah `(N-1)` deposits.

**Kenapa 125%?**

Multiplier 125% memastikan tidak ada keuntungan ekonomi dari kabur setelah menang. Jika seseorang menang di giliran pertama dan kabur, mereka akan kehilangan lebih banyak collateral daripada yang mereka terima dari pot.

### Contoh Perhitungan

**Pool 5 orang × 10 USDC:**
```
Collateral = 1.25 × 10 × (5-1) = 1.25 × 10 × 4 = 50 USDC
```

**Pool 10 orang × 50 USDC:**
```
Collateral = 1.25 × 50 × (10-1) = 1.25 × 50 × 9 = 562.5 USDC
```

**Pool 20 orang × 100 USDC:**
```
Collateral = 1.25 × 100 × (20-1) = 1.25 × 100 × 19 = 2,375 USDC
```

## Skenario Collateral

### Skenario 1: Peserta Konsisten

```
Timeline Peserta yang Konsisten:
├─ Bulan 0: Deposit collateral 562.5 USDC + setoran 50 USDC
├─ Bulan 1-9: Deposit 50 USDC setiap bulan
├─ Bulan X: Dapat giliran, terima pot + yield
├─ Bulan 10: Arisan selesai
└─ Terima: Collateral 562.5 USDC + yield collateral ~34 USDC
```

**Hasil:** Peserta mendapat semua uang kembali plus yield bonus.

### Skenario 2: Peserta Default Sebelum Dapat Giliran

```
Peserta B default di bulan ke-4 (belum dapat giliran):
├─ Bulan 0-3: Deposit normal
├─ Bulan 4: TIDAK deposit
├─ Grace period 3 hari: Tidak bayar
├─ Collateral dipotong: 562.5 - 50 = 512.5 USDC
├─ Bulan 5: TIDAK deposit
├─ Collateral dipotong: 512.5 - 50 = 462.5 USDC
├─ ... (berlanjut sampai collateral habis)
└─ Peserta B di-remove dari pool
```

**Hasil:** Peserta B kehilangan collateral, tidak dapat giliran.

### Skenario 3: Peserta Default Setelah Dapat Giliran (Dengan 125%)

```
Peserta C dapat giliran bulan ke-1 (pertama), lalu default:
├─ Bulan 1: DAPAT GILIRAN, terima pot 500 USDC
├─ Bulan 2-10: Tidak deposit (9 bulan)
├─ Collateral awal: 562.5 USDC
├─ Collateral dipotong: 9 × 50 = 450 USDC
├─ Sisa collateral: 562.5 - 450 = 112.5 USDC (hangus)
└─ Net position: 500 - 562.5 = -62.5 USDC (RUGI!)
```

**Hasil:** Dengan multiplier 125%, peserta yang kabur setelah menang tetap RUGI!

{% hint style="success" %}
Sistem 125% collateral memastikan tidak ada keuntungan ekonomi dari kabur:
- Pot pertama = N × deposit = 500 USDC
- Collateral = 1.25 × deposit × (N-1) = 562.5 USDC
- Kabur setelah menang pertama = RUGI 62.5 USDC
{% endhint %}

## Mekanisme Slashing

### Trigger Slashing

Collateral di-slash jika:
1. Peserta tidak deposit dalam deadline
2. Grace period (3 hari) terlewati
3. Tidak ada action dari peserta

### Slashing Process

```solidity
// Pseudocode
function checkAndSlash(participant) {
    if (block.timestamp > depositDeadline + gracePeriod) {
        if (!hasDeposited[participant]) {
            uint256 slashAmount = depositAmount;
            collateral[participant] -= slashAmount;
            poolBalance += slashAmount;

            if (collateral[participant] == 0) {
                removeParticipant(participant);
            }
        }
    }
}
```

### Auto-Slash vs Manual Trigger

- **Auto-slash:** Smart contract otomatis cek di setiap block
- **Keeper trigger:** External service trigger slash function
- **User trigger:** Siapapun bisa trigger slash untuk gas reward

## Collateral dan Yield

### Collateral Juga Menghasilkan

Collateral tidak hanya didiamkan - AI Yield Optimizer juga menginvestasikan collateral ke DeFi protocols.

```
Total investable funds:
├─ Pool deposits: Rolling (changes each month)
├─ All collateral: Locked for duration
└─ Combined: Larger pool = better yields
```

### Yield Distribution

```
Collateral Yield Distribution:
├─ Accrued during pool lifetime
├─ Calculated per participant based on duration
└─ Distributed at pool completion

Example:
├─ Your collateral: 562.5 USDC
├─ Pool duration: 10 months
├─ Average APY: 8%
├─ Your yield: 562.5 × 8% × (10/12) = ~37.5 USDC
```

## Collateral vs Trust

### Perbandingan

| Aspek | Trust-based (Traditional) | Collateral-based (Archa) |
|-------|--------------------------|--------------------------|
| **Siapa bisa ikut** | Kenal baik saja | Siapapun |
| **Risiko kabur** | Tinggi | Minimal |
| **Perlindungan** | Tidak ada | Automatic |
| **Scale** | Terbatas | Unlimited |
| **Enforcement** | Sosial | Smart contract |

### Kenapa Collateral Lebih Baik?

1. **Objective:** Tidak ada judgment subjektif
2. **Automatic:** Tidak perlu negosiasi atau minta maaf
3. **Fair:** Semua peserta diperlakukan sama
4. **Scalable:** Bisa arisan dengan stranger

## FAQ Collateral

### "Collateral terlalu besar, gimana dong?"

**Opsi 1:** Join pool dengan deposit amount lebih kecil
```
Pool 10 USDC/bulan → Collateral hanya 50-238 USDC (tergantung jumlah peserta)
```

**Opsi 2:** Join pool dengan peserta lebih sedikit
```
Pool 5 orang → Collateral = 1.25 × 4 × deposit = 5× deposit
Pool 20 orang → Collateral = 1.25 × 19 × deposit = 23.75× deposit
```

### "Kapan collateral dikembalikan?"

Collateral dikembalikan saat:
- Pool selesai (semua dapat giliran)
- Pool di-cancel (sebelum start)

Tidak dikembalikan jika:
- Anda default selama pool berlangsung
- Pool emergency shutdown (case-by-case)

### "Apa yang terjadi jika saya butuh uang mendadak?"

{% hint style="danger" %}
Collateral TIDAK bisa ditarik di tengah pool. Ini by design untuk menjamin pool integrity.
{% endhint %}

Jika butuh uang mendadak, opsi:
1. Tetap deposit sampai dapat giliran
2. Biarkan collateral cover sisa kewajiban (akan rugi)
3. Cari external funding untuk deposit

### "Bagaimana jika semua orang default?"

Extremely unlikely karena:
- Semua punya collateral at stake
- Slashing otomatis cover pot
- Insentif ekonomi untuk konsisten

Worst case: Pool ends early, remaining collateral distributed proportionally.
