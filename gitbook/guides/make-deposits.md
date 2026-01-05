# 💳 Melakukan Deposit

Panduan lengkap untuk melakukan deposit bulanan di pool Archa.

## Overview

Setiap cycle, semua participant wajib deposit. Deposit ini akan dikumpulkan dan diberikan ke pemenang cycle tersebut.

```
Flow Deposit:
├─ Cycle dimulai
├─ Deposit window terbuka (25 hari)
├─ Grace period (3 hari)
├─ Deadline
├─ Slashing (jika tidak deposit)
└─ Winner selection + distribution
```

## Kapan Harus Deposit?

### Timeline Setiap Cycle

```
30-Day Cycle Example:
├─ Day 1-25: Regular deposit window
├─ Day 26-28: Grace period (masih bisa deposit)
├─ Day 29: Final check
└─ Day 30: Winner selection
```

### Status Deposit Anda

Di dashboard, cek status deposit:

```
My Deposit Status:
├─ Current Cycle: 5
├─ This Cycle Deposit: ❌ NOT DEPOSITED
├─ Deadline: Jan 28, 2025 23:59 UTC
├─ Days Left: 7 days
└─ Collateral Buffer: Available (auto-deposit if missed)
```

## Cara Deposit

### Step 1: Buka Pool

1. Navigasi ke dashboard atau **My Pools**
2. Pilih pool yang ingin Anda deposit
3. Klik **"View Pool"**

### Step 2: Deposit Section

```
Deposit This Cycle:
├─ Amount Due: 50 USDC
├─ Your Balance: 234 USDC
├─ Status: Ready to Deposit
└─ [DEPOSIT NOW] button
```

### Step 3: Execute Deposit

1. Klik **"Deposit Now"**
2. Review transaction:
   ```
   Deposit Confirmation:
   ├─ Pool: #42
   ├─ Cycle: 5 of 10
   ├─ Amount: 50 USDC
   └─ Gas: ~0.01 MNT
   ```
3. Confirm di wallet
4. Tunggu confirmation

### Step 4: Deposit Complete

```
✅ Deposit Successful!
├─ Transaction: 0x...
├─ Amount: 50 USDC
├─ New Status: DEPOSITED for Cycle 5
└─ Eligible for winner selection: YES
```

## Auto-Deposit dari Collateral

### Bagaimana Cara Kerjanya?

Jika Anda lupa atau tidak bisa deposit:

```
Auto-Deposit Flow:
├─ Deadline passed
├─ System checks your deposit status
├─ If NOT deposited:
│   ├─ Collateral balance checked
│   ├─ If sufficient: Auto-deduct from collateral
│   └─ If insufficient: Slashing + potential exclusion
└─ You remain eligible (if collateral covered)
```

### Contoh Skenario

```
Scenario: Lupa deposit cycle 5

Your status:
├─ Deposit due: 50 USDC
├─ Collateral balance: 250 USDC
├─ Auto-deposit: 50 USDC deducted from collateral
├─ New collateral: 200 USDC
└─ Status: Still eligible for winner selection
```

### Warning!

⚠️ **Collateral auto-deposit adalah safety net, bukan solusi utama!**

Risiko mengandalkan collateral:
- Collateral yield berkurang
- Collateral bisa habis
- Jika habis, Anda di-slash dan excluded

## Notifikasi

### Reminder System

Archa akan mengingatkan Anda:

| Waktu | Notifikasi |
|-------|-----------|
| Day 1 | "Cycle X dimulai, deposit window open" |
| Day 20 | "5 hari lagi deadline deposit" |
| Day 25 | "Besok masuk grace period" |
| Day 28 | "HARI TERAKHIR untuk deposit!" |

### Cara Aktifkan Notifikasi

1. Connect wallet
2. Buka Settings
3. Enable notifications:
   - Browser push notifications
   - Email (jika tersedia)
   - Telegram bot (coming soon)

## Batch Deposit

### Multiple Pools

Jika Anda bergabung di beberapa pool:

```
My Pending Deposits:
├─ Pool #42: 50 USDC (Due: Jan 28)
├─ Pool #67: 100 USDC (Due: Jan 30)
└─ Pool #103: 25 USDC (Due: Feb 2)

[DEPOSIT ALL] - Total: 175 USDC
```

### Single Transaction

Fitur batch deposit memungkinkan Anda deposit ke semua pool dalam satu transaction, menghemat gas.

## Deposit History

### View Past Deposits

```
Deposit History - Pool #42:
├─ Cycle 1: ✅ 50 USDC (Jan 1)
├─ Cycle 2: ✅ 50 USDC (Feb 1)
├─ Cycle 3: ✅ 50 USDC (Mar 1)
├─ Cycle 4: ⚠️ 50 USDC (from collateral)
└─ Cycle 5: ⏳ Pending...
```

### Export Records

Untuk keperluan tax atau tracking:
- Download CSV deposit history
- View on-chain transactions

## Troubleshooting

### "Insufficient Balance"

```
Problem: USDC balance tidak cukup

Solutions:
├─ Bridge more USDC ke Mantle
├─ Swap MNT/other tokens ke USDC
└─ Collateral akan cover (jika tersedia)
```

### "Transaction Failed"

```
Problem: Deposit transaction failed

Solutions:
├─ Cek gas balance (MNT)
├─ Cek USDC approval
├─ Retry dengan gas lebih tinggi
└─ Cek network congestion
```

### "Already Deposited"

```
Problem: Trying to deposit twice

Note:
├─ Anda hanya perlu deposit 1x per cycle
├─ Double deposit tidak dimungkinkan
└─ Excess akan di-reject
```

### "Pool Not Active"

```
Problem: Cannot deposit

Possible reasons:
├─ Pool masih WAITING (belum full)
├─ Pool sudah COMPLETED
├─ Cycle belum dimulai
└─ Deposit window belum open
```

## Best Practices

### Deposit Tepat Waktu

✅ **DO:**
- Set calendar reminder
- Deposit di awal cycle
- Maintain USDC buffer
- Enable notifications

❌ **DON'T:**
- Jangan tunggu last minute
- Jangan rely on collateral
- Jangan abaikan notifications

### Financial Planning

```
Monthly Planning:
├─ Pool A deposit: 50 USDC (tanggal 1)
├─ Pool B deposit: 100 USDC (tanggal 15)
├─ Total monthly: 150 USDC
└─ Buffer: Always keep extra 50 USDC
```

## FAQ

### "Bisa deposit lebih awal?"

Ya! Anda bisa deposit kapan saja selama deposit window. Tidak perlu tunggu mendekati deadline.

### "Kalau deposit telat gimana?"

Selama masih dalam grace period, deposit masih diterima. Setelah deadline, collateral akan digunakan (jika ada).

### "Bisa deposit partial?"

Tidak. Deposit harus full amount sesuai pool requirement.

### "Deposit kemana uangnya?"

Deposit masuk ke smart contract pool dan langsung di-deploy ke AI yield optimizer. Di akhir cycle, pot + yield diberikan ke pemenang.

### "Apakah deposit bisa di-refund?"

Tidak. Deposit untuk cycle yang sedang berjalan tidak bisa di-refund. Ini masuk ke pot pemenang.
