# 🚀 Quickstart

Ikuti panduan ini untuk mulai menggunakan Archa dalam 5 menit.

## Prerequisites

Sebelum mulai, pastikan Anda memiliki:

- [ ] Wallet (MetaMask, WalletConnect, atau wallet EVM lainnya)
- [ ] USDC di Mantle Network
- [ ] Sedikit MNT untuk gas fee

## Step 1: Connect Wallet

1. Kunjungi [arisanonchain.vercel.app](https://arisanonchain.vercel.app)
2. Klik tombol **"Connect Wallet"** di pojok kanan atas
3. Pilih wallet Anda (MetaMask atau WalletConnect)
4. Approve connection di wallet Anda
5. Pastikan network sudah di **Mantle Mainnet**

<figure><img src="../.gitbook/assets/connect-wallet.png" alt=""><figcaption><p>Connect Wallet</p></figcaption></figure>

{% hint style="info" %}
Jika wallet belum ada Mantle Network, Archa akan otomatis menambahkan network untuk Anda.
{% endhint %}

## Step 2: Explore Pools

1. Klik menu **"Pools"** di navigation
2. Anda akan melihat daftar pool yang tersedia
3. Filter berdasarkan status: All, Open, Active, Completed
4. Perhatikan informasi setiap pool:
   - Deposit amount (setoran bulanan)
   - Jumlah peserta (current/max)
   - APY estimasi
   - Status pool

<figure><img src="../.gitbook/assets/explore-pools.png" alt=""><figcaption><p>Explore Pools</p></figcaption></figure>

## Step 3: Join a Pool

1. Pilih pool dengan status **"Open"**
2. Klik tombol **"Join Pool"**
3. Modal akan muncul menunjukkan:
   - Monthly deposit amount
   - Required collateral
   - Estimated APY
4. Klik **"Approve USDC"** untuk approve spending
5. Setelah approve, klik **"Join Pool"**
6. Confirm transaction di wallet Anda

<figure><img src="../.gitbook/assets/join-pool.png" alt=""><figcaption><p>Join Pool Modal</p></figcaption></figure>

{% hint style="warning" %}
Pastikan Anda memiliki cukup USDC untuk collateral + setoran pertama.
{% endhint %}

## Step 4: Wait for Pool to Start

1. Pool akan start ketika semua slot terisi
2. Anda akan menerima notifikasi
3. Setoran bulan pertama akan otomatis dipotong dari balance

## Step 5: Make Monthly Deposits

1. Setiap bulan, Anda perlu deposit sesuai jadwal
2. Kunjungi halaman **"My Pools"**
3. Klik **"Make Deposit"** sebelum deadline
4. Jika tidak deposit tepat waktu, collateral akan dipotong

## Step 6: Get Your Turn

1. Setiap bulan, 1 peserta akan menerima pot
2. Pemenang ditentukan secara random oleh smart contract
3. Jika Anda menang, pot + yield otomatis masuk wallet
4. Anda tetap harus deposit bulan-bulan berikutnya

## Step 7: Arisan Complete

1. Setelah semua peserta dapat giliran, arisan selesai
2. Collateral Anda + yield dikembalikan
3. Selamat! Anda telah menyelesaikan arisan onchain pertama Anda

---

## Quick Reference

| Action | Requirement |
|--------|-------------|
| Join Pool | USDC (collateral + 1st deposit) |
| Monthly Deposit | USDC (deposit amount) |
| Claim Winnings | Automatic to wallet |
| Reclaim Collateral | Automatic after completion |

## Next Steps

- [📖 Pelajari cara kerja Archa lebih detail](../concepts/how-it-works.md)
- [🔒 Pahami Collateral System](../concepts/collateral-system.md)
- [🤖 Pelajari AI Yield Optimizer](../concepts/ai-yield-optimizer.md)
- [➕ Buat pool sendiri](../guides/create-pool.md)

## Need Help?

- **Telegram:** [t.me/archaonchain](https://t.me/archaonchain)
- **Twitter:** [@archaonchain](https://twitter.com/archaonchain)
- **FAQ:** [Pertanyaan yang sering ditanyakan](../resources/faq.md)
