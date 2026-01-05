# 🏆 Klaim Kemenangan

Panduan lengkap tentang proses penerimaan pot arisan di Archa.

## Bagaimana Pemenang Ditentukan?

Setiap cycle, satu pemenang dipilih secara random menggunakan VRF (Verifiable Random Function).

```
Selection Process:
├─ Cycle berakhir
├─ Smart contract identify eligible participants
├─ VRF generate random number
├─ Random number → winner index
├─ Winner menerima pot
└─ Winner marked as "hasReceivedPot"
```

### Siapa yang Eligible?

```
Eligible Requirements:
├─ ✅ Participant aktif
├─ ✅ Belum pernah menerima pot
├─ ✅ Tidak default (deposit terpenuhi)
└─ ✅ Deposit cycle ini sudah masuk
```

## Menerima Kemenangan

### Automatic Distribution

Kabar baik! Di Archa, kemenangan **otomatis ditransfer** ke wallet Anda.

```
Winner Notification:
├─ Cycle 5 Winner Selection
├─ 🎉 Congratulations! You WON!
├─ Pot Amount: 542 USDC
├─ Transaction: 0x...
└─ Funds sent to: 0xYourWallet...
```

### Apa yang Anda Terima?

```
Pot Breakdown:
├─ Base Deposits: 500 USDC (10 × 50)
├─ Cycle Yield: +42 USDC (dari AI optimizer)
└─ TOTAL POT: 542 USDC

✅ Langsung masuk ke wallet Anda!
```

## Lifecycle Setelah Menang

### Status Berubah

```
Before Winning:
├─ hasReceivedPot: false
├─ Eligible for selection: YES
└─ Must deposit: YES

After Winning:
├─ hasReceivedPot: true
├─ Eligible for selection: NO (excluded)
└─ Must deposit: YES (sampai pool selesai)
```

### Kewajiban Setelah Menang

⚠️ **Penting:** Menang TIDAK berarti selesai!

```
Post-Win Obligations:
├─ Continue depositing every cycle
├─ Collateral masih terkunci
├─ Sampai pool COMPLETED
└─ Failure = slashing from collateral
```

### Contoh Timeline

```
Pool 10 Participants (10 Cycles):

Anda menang Cycle 3:
├─ Cycle 1: Deposit ✅
├─ Cycle 2: Deposit ✅
├─ Cycle 3: Deposit ✅ → MENANG! 🎉 (+542 USDC)
├─ Cycle 4: Deposit ✅ (wajib)
├─ Cycle 5: Deposit ✅ (wajib)
├─ ...
├─ Cycle 10: Deposit ✅ (wajib)
└─ Pool Completed → Collateral returned!
```

## Collateral Return

### Kapan Collateral Dikembalikan?

```
Collateral Return Conditions:
├─ Pool status = COMPLETED
├─ All cycles finished
├─ All your deposits fulfilled
└─ Automatic return to wallet
```

### Final Settlement

Di akhir pool:

```
Final Settlement:
├─ Original Collateral: 450 USDC
├─ Collateral Yield: +38 USDC
├─ Slashing (if any): -0 USDC
└─ YOU RECEIVE: 488 USDC

Total Earnings Summary:
├─ Pot Won (Cycle 3): 542 USDC
├─ Collateral Returned: 488 USDC
├─ Total Deposits Made: -500 USDC
└─ NET PROFIT: +530 USDC
```

## Verifikasi Kemenangan

### On-Chain Proof

Semua hasil bisa diverifikasi:

1. **VRF Transaction**
   - Hash VRF request
   - Random number generated
   - Verifiable on block explorer

2. **Winner Selection**
   - Eligible participants list
   - Random number applied
   - Winner address

3. **Distribution**
   - Transfer transaction
   - Amount
   - Recipient

### Cara Verifikasi

```
Steps to Verify:
1. Go to: explorer.mantle.xyz
2. Enter pool contract address
3. Find VRF fulfillment transaction
4. Check random number in event logs
5. Apply: randomNumber % eligibleCount = winnerIndex
6. Confirm winner matches
```

## Edge Cases

### Menang di Cycle Terakhir

```
Last Cycle Scenario:
├─ Only 1 eligible participant left
├─ Random selection still runs
├─ That person wins with 100% probability
├─ Pool marked COMPLETED
└─ All collateral returned
```

### Menang Tapi Collateral Habis

```
Scenario: Won Cycle 3, defaulted Cycle 6

├─ Cycle 6 deposit: Missed
├─ Collateral check: Insufficient
├─ Consequence: Remaining collateral slashed
├─ Status: Still won Cycle 3 (cannot be revoked)
└─ Reputation: Marked as defaulter
```

### VRF Delay

```
If VRF takes longer than expected:
├─ Winner selection delayed
├─ All participants wait
├─ No action required from you
└─ Distribution happens when VRF completes
```

## Probabilitas Menang

### Setiap Orang Pasti Menang Sekali

```
Guarantee:
├─ 10 participants = 10 cycles
├─ 1 winner per cycle
├─ Winners excluded from future selection
└─ Result: Everyone wins exactly once
```

### Probability Each Cycle

```
Cycle Probabilities:
├─ Cycle 1 (10 eligible): 10% chance
├─ Cycle 2 (9 eligible): 11.1% chance
├─ Cycle 3 (8 eligible): 12.5% chance
├─ ...
├─ Cycle 9 (2 eligible): 50% chance
└─ Cycle 10 (1 eligible): 100% chance
```

### Menang Awal vs Akhir

| Timing | Pros | Cons |
|--------|------|------|
| **Menang Awal** | Dapat pot lebih cepat, bisa re-invest | Harus tetap deposit sampai akhir |
| **Menang Akhir** | Pot mungkin lebih besar (more yield) | Tunggu lebih lama |

**Expected value sama** - tidak ada yang lebih untung.

## Notifications

### Winner Announcement

```
Notification Types:
├─ 🎉 Push notification (if enabled)
├─ 📧 Email (if registered)
├─ 🔔 In-app notification
└─ 📱 Telegram bot (coming soon)
```

### Check Your Status

Di dashboard:
```
My Pool Status:
├─ Pool #42
├─ Your Status: WON CYCLE 3 🏆
├─ Pot Received: 542 USDC
├─ Cycles Remaining: 7
└─ Next Deposit Due: Feb 1
```

## FAQ

### "Apakah kemenangan bisa dibatalkan?"

Tidak. Setelah pot ditransfer, tidak bisa diambil kembali. Bahkan jika Anda default setelahnya.

### "Kenapa saya belum menang padahal sudah lama?"

Pemilihan 100% random. Jika Anda eligible, Anda PASTI akan menang di suatu cycle sebelum pool selesai.

### "Bisa pilih kapan mau menang?"

Tidak. Randomness menjamin fairness - tidak ada yang bisa memilih atau memprediksi.

### "Bagaimana jika ada tie?"

Tidak mungkin tie. Random number selalu menghasilkan 1 pemenang.

### "Apakah pot sudah include tax?"

Pot adalah gross amount. Tax compliance adalah tanggung jawab masing-masing participant sesuai jurisdiksi masing-masing.

### "Kalau wallet saya di-hack setelah menang?"

Dana yang sudah diterima adalah tanggung jawab Anda. Archa tidak bisa recover funds yang sudah ditransfer. Selalu jaga keamanan wallet Anda.
