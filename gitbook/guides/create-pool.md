# 🎯 Membuat Pool Baru

Panduan lengkap untuk membuat pool arisan baru di Archa.

## Siapa yang Bisa Membuat Pool?

Siapa saja! Tidak perlu izin khusus untuk membuat pool. Yang Anda butuhkan:
- Wallet yang terkoneksi
- MNT untuk gas fees
- USDC untuk deposit pertama + collateral (jika langsung join)

## Parameter Pool

Saat membuat pool, Anda perlu menentukan parameter berikut:

### 1. Deposit Amount

Jumlah USDC yang harus disetor setiap cycle.

```
Rekomendasi:
├─ Pemula: 10-50 USDC
├─ Menengah: 50-200 USDC
└─ Advanced: 200-1000 USDC
```

**Tips:** Sesuaikan dengan target audience. Pool deposit kecil lebih mudah terisi.

### 2. Total Participants

Jumlah maksimum peserta dalam pool.

```
Pertimbangan:
├─ 5 peserta: Pool cepat selesai, pot kecil
├─ 10 peserta: Balance antara durasi dan pot
├─ 20 peserta: Pot besar, tapi komitmen panjang
└─ Max: 50 peserta
```

**Formula Pot:**
```
Pot Size = Deposit × Participants + Yield
Contoh: 50 USDC × 10 orang = 500 USDC + yield
```

### 3. Cycle Duration

Durasi setiap cycle (berapa lama antara rotasi).

```
Opsi standar:
├─ 7 hari (mingguan)
├─ 14 hari (bi-weekly)
├─ 30 hari (bulanan) ← Paling umum
└─ 60 hari (bi-monthly)
```

### 4. Pool Name (Opsional)

Nama pool untuk identifikasi mudah.

```
Contoh nama:
├─ "Arisan Keluarga"
├─ "Crypto Enthusiasts Pool"
├─ "Mantle Builders"
└─ "Diamond Hands Club"
```

## Langkah-langkah Membuat Pool

### Step 1: Buka Create Pool

1. Navigasi ke halaman **Pools**
2. Klik tombol **"Create Pool"**
3. Form pembuatan pool akan muncul

### Step 2: Isi Parameter

```
Create New Pool Form:
├─ Pool Name: [opsional]
├─ Deposit Amount: [input USDC]
├─ Number of Participants: [dropdown 5-50]
├─ Cycle Duration: [dropdown]
└─ Join as Creator: [checkbox]
```

### Step 3: Review Summary

```
Pool Summary:
├─ Deposit per Cycle: 50 USDC
├─ Total Participants: 10
├─ Total Duration: 10 months
├─ Max Pot Size: 500+ USDC
├─ Collateral Required: 450 USDC (per participant)
└─ Estimated Creation Gas: ~0.05 MNT
```

### Step 4: Create Pool

1. Klik **"Create Pool"**
2. Approve transaction di wallet
3. Tunggu confirmation

### Step 5: Pool Created!

```
Pool Created Successfully:
├─ Pool ID: #142
├─ Contract Address: 0x...
├─ Status: WAITING (0/10 participants)
└─ Share Link: https://archa.xyz/pool/142
```

## Join Sebagai Creator

### Opsi 1: Create Only

- Anda hanya membuat pool
- Tidak otomatis menjadi participant
- Tidak perlu deposit/collateral saat create

### Opsi 2: Create & Join

- Anda membuat dan langsung join
- Perlu deposit + collateral
- Anda adalah participant pertama

```
Create & Join:
├─ Creation Gas: ~0.05 MNT
├─ First Deposit: 50 USDC
├─ Collateral: 450 USDC
└─ Total: 500 USDC + gas
```

## Mengundang Peserta

### Share Pool Link

Setelah pool dibuat, bagikan link ke calon peserta:

```
https://arisanonchain.vercel.app/pool/[POOL_ID]
```

### Social Sharing

Gunakan media sosial:
- Twitter/X
- Telegram group
- Discord
- WhatsApp

### Pool Discovery

Pool Anda juga akan muncul di:
- Halaman Explore Pools
- Pencarian berdasarkan parameter

## Pool Lifecycle

```
CREATED ──► WAITING ──► ACTIVE ──► COMPLETED
    │           │          │           │
    │           │          │           └─ Semua sudah dapat pot
    │           │          └─ Pool full, cycles berjalan
    │           └─ Menunggu participants
    └─ Pool baru dibuat
```

### Status Transitions

| From | To | Trigger |
|------|-----|---------|
| Created | Waiting | Pool deployed |
| Waiting | Active | All slots filled |
| Active | Completed | All cycles done |

## Best Practices

### Untuk Pool yang Sukses

✅ **DO:**
- Pilih deposit amount yang reasonable
- Set participant count yang realistis
- Punya komunitas/grup yang siap join
- Jelaskan aturan arisan ke calon peserta

❌ **DON'T:**
- Jangan set deposit terlalu tinggi
- Jangan set participants terlalu banyak
- Jangan buat pool tanpa rencana distribusi link

### Strategi Filling Pool

```
Tips mengisi pool:
├─ Mulai dari inner circle (teman/keluarga)
├─ Share di komunitas crypto
├─ Jelaskan benefit Archa vs arisan tradisional
├─ Berikan edukasi tentang collateral
└─ Jadilah participant pertama (build trust)
```

## Cancel Pool

### Bisa Cancel?

```
Cancel Rules:
├─ Status WAITING: Bisa cancel jika belum ada participant
├─ Status ACTIVE: TIDAK bisa cancel
└─ Refund: Semua deposits dikembalikan
```

### Cara Cancel

1. Buka pool yang Anda buat
2. Klik **"Cancel Pool"** (jika eligible)
3. Confirm transaction
4. Semua participant di-refund

## FAQ

### "Apakah creator dapat keuntungan khusus?"

Tidak. Creator diperlakukan sama dengan participant lain. Tidak ada fee atau privilege khusus.

### "Bagaimana jika pool tidak terisi?"

Pool akan tetap dalam status WAITING. Participant yang sudah join bisa withdraw. Tidak ada batas waktu untuk filling pool.

### "Bisa ubah parameter setelah create?"

Tidak. Parameter pool tidak bisa diubah setelah creation. Jika perlu perubahan, cancel dan buat pool baru.

### "Berapa gas fee untuk create pool?"

Sekitar 0.05-0.1 MNT di Mantle Network (sangat murah).

### "Pool saya tidak muncul di Explore?"

Pastikan pool sudah ter-confirm di blockchain. Refresh halaman setelah beberapa detik.
