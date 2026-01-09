# 🎨 Loading Animation & Logo Setup

## ✅ Fitur yang Sudah Dibuat

### 1. Loading Animation Web3 Theme
Animasi loading yang modern dengan tema Web3/blockchain telah ditambahkan dengan fitur:
- ⚡ Animated hexagon dengan rotating rings
- 🌟 Floating particles background
- 📊 Animated grid pattern
- 💫 Loading bar dengan gradient
- 🔵 Web3 status indicators (Blockchain, Smart Contract, DApp)
- 🎯 Smooth animations & transitions

### 2. Loading Pages yang Dibuat
- **Main Loading**: `/src/app/loading.tsx` - untuk root page
- **Pools Loading**: `/src/app/pools/loading.tsx` - untuk halaman pools
- **AI Loading**: `/src/app/ai/loading.tsx` - untuk halaman AI Optimizer
- **Leaderboard Loading**: `/src/app/leaderboard/loading.tsx` - untuk halaman leaderboard

### 3. Reusable Component
- **LoadingSpinner**: `/src/components/LoadingSpinner.tsx`
  - Bisa digunakan di mana saja
  - Props: `fullScreen` (boolean) dan `message` (string)
  - Contoh penggunaan:
    ```tsx
    <LoadingSpinner fullScreen={true} message="Loading..." />
    ```

---

## 📱 Setup Logo/Favicon

### Langkah Upload Logo:

1. **Siapkan file logo** dengan nama: `archa-hitam.png`
   
2. **Upload ke folder**:
   ```
   /Users/macbookpro/Documents/Archa/public/archa-hitam.png
   ```

3. **Spesifikasi Logo**:
   - Format: PNG (dengan transparent background)
   - Ukuran: Minimal 512x512px
   - Aspect Ratio: 1:1 (square)

4. **Restart server** (jika sudah running):
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

5. **Refresh browser** - Logo akan muncul di:
   - Tab browser (favicon)
   - Bookmark bar
   - Mobile home screen icon
   - Share preview

### Konfigurasi yang Sudah Dibuat:

File `/src/app/layout.tsx` sudah dikonfigurasi dengan:
```typescript
icons: {
  icon: [
    { url: "/archa-hitam.png" },
    { url: "/archa-hitam.png", sizes: "16x16", type: "image/png" },
    { url: "/archa-hitam.png", sizes: "32x32", type: "image/png" },
  ],
  apple: [{ url: "/archa-hitam.png" }],
  shortcut: ["/archa-hitam.png"],
}
```

---

## 🎬 Cara Kerja Loading Animation

### Kapan Muncul?
Loading animation akan otomatis muncul ketika:
1. User pertama kali membuka website
2. Navigasi antar halaman (jika ada delay loading)
3. Data sedang di-fetch dari blockchain
4. Component sedang di-render

### Animasi yang Termasuk:
- **Rotating Rings**: 2 ring yang berputar berlawanan arah
- **Hexagon Pulse**: Bentuk hexagon dengan efek pulse
- **Grid Background**: Pattern grid yang bergerak
- **Particles**: 20 partikel yang melayang
- **Loading Bar**: Progress bar dengan gradient animation
- **Status Dots**: 3 indikator status (Blockchain, Smart Contract, DApp)

---

## 🎨 Customization

### Mengubah Warna Loading:
Edit file `/src/components/LoadingSpinner.tsx`:
```typescript
// Ganti warna gradient
from-cyan-500 to-green-500  // → warna loading bar
border-cyan-500  // → warna hexagon
bg-cyan-400  // → warna particles
```

### Mengubah Kecepatan Animasi:
```typescript
// Di style animation
animationDuration: '3s'  // → ubah durasi rotasi
animation: float 3s      // → ubah kecepatan float
```

### Menambah/Kurangi Particles:
```typescript
{[...Array(20)].map((_, i) => (  // Ubah angka 20
```

---

## 🚀 Testing

Untuk melihat loading animation:

1. **Slow 3G Simulation** (Chrome DevTools):
   - Buka DevTools (F12)
   - Network tab
   - Pilih "Slow 3G"
   - Refresh page

2. **Force Loading State**:
   ```tsx
   // Di page component, tambah Suspense
   import { Suspense } from 'react';
   import Loading from './loading';
   
   <Suspense fallback={<Loading />}>
     {/* Component content */}
   </Suspense>
   ```

---

## ✨ Next Steps

Setelah upload logo:
1. ✅ Logo akan muncul di browser tab
2. ✅ Loading animation sudah aktif
3. ✅ Semua halaman sudah punya loading state

**Siap digunakan!** 🎉
