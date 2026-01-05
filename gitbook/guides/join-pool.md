# 🏊 Bergabung ke Pool

Panduan lengkap untuk bergabung ke pool arisan di Archa.

## Sebelum Bergabung

### Persiapan

Pastikan Anda sudah:
- ✅ Connect wallet ke Archa
- ✅ Punya USDC di Mantle Network
- ✅ Punya MNT untuk gas fees
- ✅ Memahami konsep arisan dan collateral

### Berapa USDC yang Dibutuhkan?

```
Total USDC Dibutuhkan:
├─ Deposit bulanan pertama
└─ Collateral (deposit × sisa cycle)

Contoh Pool 50 USDC × 10 bulan:
├─ Deposit: 50 USDC
├─ Collateral: 50 × 9 = 450 USDC
└─ TOTAL: 500 USDC
```

## Cara Bergabung

### Step 1: Browse Available Pools

1. Buka halaman **Explore Pools**
2. Lihat daftar pool yang tersedia
3. Filter berdasarkan:
   - Jumlah deposit
   - Durasi
   - Jumlah peserta
   - Status pool

### Step 2: Pilih Pool

Pertimbangkan faktor-faktor ini:

| Faktor | Pertimbangan |
|--------|-------------|
| **Deposit Amount** | Sesuaikan dengan kemampuan finansial |
| **Duration** | Pool panjang = komitmen lebih lama |
| **Participants** | Lebih banyak = pot lebih besar |
| **Slots Left** | Pastikan masih ada slot kosong |
| **Expected Yield** | Perkiraan APY dari AI optimizer |

### Step 3: Review Pool Details

Klik pool untuk melihat detail:

```
Pool Details:
├─ Creator Address
├─ Deposit per Cycle: 50 USDC
├─ Total Cycles: 10
├─ Participants: 7/10
├─ Current Cycle: 0 (belum mulai)
├─ Collateral Required: 450 USDC
├─ Estimated Total Pot: 500+ USDC
└─ AI Strategy: Active
```

### Step 4: Join Pool

1. Klik tombol **"Join Pool"**
2. Review transaction details:
   ```
   Transaction Summary:
   ├─ First Deposit: 50 USDC
   ├─ Collateral Lock: 450 USDC
   ├─ Total Transfer: 500 USDC
   └─ Estimated Gas: ~0.01 MNT
   ```
3. Klik **"Approve USDC"** (jika pertama kali)
4. Klik **"Confirm Join"**
5. Approve transaction di wallet

### Step 5: Konfirmasi

Setelah transaction confirmed:
- ✅ Anda terdaftar sebagai participant
- ✅ Deposit pertama sudah masuk
- ✅ Collateral sudah terkunci
- ✅ Eligible untuk menerima pot

## Setelah Bergabung

### Dashboard Anda

Di dashboard, Anda bisa melihat:

```
My Pool Status:
├─ Pool Name: Pool #42
├─ My Position: Participant #7
├─ Deposits Made: 1/10
├─ Has Received Pot: No
├─ Collateral Locked: 450 USDC
├─ Collateral Yield: 0 USDC (accruing)
└─ Next Deposit Due: Jan 15, 2025
```

### Notifikasi

Anda akan menerima notifikasi untuk:
- 🔔 Reminder deposit sebelum deadline
- 🎉 Pengumuman pemenang
- 💰 Jika Anda menang
- ⚠️ Warning jika hampir terlambat

## Edge Cases

### Pool Belum Mulai

```
Jika pool belum full:
├─ Tunggu sampai semua slot terisi
├─ Pool akan mulai setelah full
└─ Deposit & collateral sudah terkunci
```

### Slot Habis

```
Jika pool sudah penuh:
├─ Anda tidak bisa join pool ini
├─ Cari pool lain yang masih tersedia
└─ Atau buat pool sendiri
```

### Transaction Failed

```
Jika transaction gagal:
├─ Cek balance USDC Anda
├─ Cek balance MNT untuk gas
├─ Pastikan allowance sudah di-approve
└─ Coba lagi dengan gas price lebih tinggi
```

## Tips Memilih Pool

### Untuk Pemula

✅ **DO:**
- Pilih pool dengan deposit kecil dulu (10-50 USDC)
- Pilih durasi pendek (3-6 bulan)
- Cek apakah creator terpercaya

❌ **DON'T:**
- Jangan langsung join pool besar
- Jangan abaikan collateral requirement
- Jangan join jika tidak siap komitmen

### Untuk Advanced Users

- Diversifikasi ke beberapa pool berbeda
- Perhatikan expected yield dari AI
- Hitung opportunity cost dari collateral lock

## Keluar dari Pool

### Bisa Keluar?

```
Aturan keluar:
├─ SEBELUM pool mulai: Bisa withdraw full
├─ SETELAH pool mulai: TIDAK bisa keluar
└─ Collateral terkunci sampai pool selesai
```

### Emergency Exit

Tidak ada emergency exit setelah pool aktif. Ini untuk melindungi semua participant dari:
- Peserta yang kabur setelah menang
- Manipulasi pool
- Ketidakadilan bagi peserta lain

## FAQ

### "Berapa lama proses join?"

Transaction biasanya selesai dalam 2-5 detik di Mantle.

### "Apakah bisa join multiple pools?"

Ya, Anda bisa join sebanyak mungkin pool selama punya USDC yang cukup.

### "Collateral aman?"

Collateral dikelola oleh smart contract yang sudah diaudit. Tidak ada yang bisa mengambil collateral Anda kecuali:
- Anda tidak deposit (slashing)
- Pool selesai (dikembalikan)

### "Kapan pool mulai?"

Pool mulai ketika semua slot terisi. Setelah itu, cycle pertama langsung dimulai.
