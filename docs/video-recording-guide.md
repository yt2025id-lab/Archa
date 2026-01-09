# Archa Demo Video Recording Guide

## Workflow: Screen Recording + Face Cam + Voice Over (Terpisah)
**Editor: CapCut**

---

## STEP 1: Persiapan

### Install Software
1. **OBS Studio** (Gratis) - untuk screen recording
   - Download: https://obsproject.com/
   - Install dan buka

2. **CapCut Desktop** (Gratis) - untuk editing
   - Download: https://www.capcut.com/
   - Install versi desktop (bukan mobile)

3. **QuickTime Player** (Sudah ada di Mac) - untuk face cam
   - Sudah built-in di macOS

### Persiapan Browser
- Buka Chrome/Safari dalam mode Clean (Cmd + Shift + N)
- Set zoom browser ke 90% (Cmd + -)
- Hide bookmark bar (Cmd + Shift + B)
- Full screen mode (Cmd + Ctrl + F)

### Persiapan Website
- Buka https://arisanonchain.vercel.app
- Test semua fitur berfungsi:
  - ✅ Pools page load
  - ✅ AI Optimizer page load
  - ✅ Wallet connect (optional - bisa di-skip)

---

## STEP 2: Record Screen Demo (Tanpa Suara)

### Setup OBS Studio

1. **Buka OBS Studio**

2. **Create Scene: "Archa Demo"**
   - Klik + di "Scenes" panel

3. **Add Source: Display Capture**
   - Klik + di "Sources"
   - Pilih "Display Capture"
   - Name: "Screen"
   - Select your main display
   - OK

4. **Settings untuk Recording**
   - File > Settings > Output
   - Output Mode: Simple
   - Recording Quality: High Quality
   - Recording Format: mp4
   - Encoder: Apple VT H264 Hardware Encoder (jika ada)

5. **Resolution Setting**
   - Settings > Video
   - Base Canvas: 1920x1080
   - Output: 1920x1080
   - FPS: 30

### Mulai Recording

1. **Checklist sebelum record:**
   - [ ] Browser full screen
   - [ ] Notifikasi di-off (Do Not Disturb mode)
   - [ ] Desktop bersih
   - [ ] Mouse cursor visible

2. **Start Recording**
   - Klik "Start Recording" di OBS
   - Atau tekan hotkey (default: Cmd + Shift + R)

3. **Follow Demo Script** (dari demo-script.md)
   - Ikuti setiap scene dengan smooth scrolling
   - Pause 2-3 detik di setiap highlight
   - Total target: 4 menit

### Scene-by-Scene Checklist:

**SCENE 1-2: Landing Page (0:00-0:45)**
- [ ] Scroll hero section slowly
- [ ] Show About section (problem/solution cards)
- [ ] Highlight badges (Mantle, USDC, AI)

**SCENE 3-4: Pools & How It Works (0:45-2:00)**
- [ ] Navigate to /pools
- [ ] Show pool cards (Small, Medium, Large)
- [ ] Click on Medium Pool
- [ ] Show pool detail modal
- [ ] Highlight collateral requirement
- [ ] Show "Join Pool" button (don't click)
- [ ] Close modal

**SCENE 5: AI Optimizer (2:00-2:45)**
- [ ] Navigate to /ai
- [ ] Show AI dashboard loading
- [ ] Switch risk tolerance (Conservative → Moderate → Aggressive)
- [ ] Scroll to protocol list
- [ ] Show AI recommendation card
- [ ] Highlight APY and allocation strategy

**SCENE 6-7: Numbers & Tech (2:45-3:35)**
- [ ] Go back to pool detail
- [ ] Show analytics/numbers
- [ ] Navigate to GitHub README (scroll to contract addresses)
- [ ] Quick scroll tech stack section

**SCENE 8-9: CTA & End (3:35-4:00)**
- [ ] Back to landing page
- [ ] Show "Explore Pools" CTA
- [ ] Scroll to footer
- [ ] Pause on Archa logo

4. **Stop Recording**
   - Klik "Stop Recording"
   - File akan tersimpan di: Videos folder (atau cek Settings > Output > Recording Path)

5. **Review Recording**
   - Play back video
   - Cek quality, smooth scrolling, no lag
   - Jika kurang bagus, rekam ulang

---

## STEP 3: Record Face Cam (Tanpa Suara)

### Menggunakan QuickTime Player

1. **Buka QuickTime Player**

2. **File > New Movie Recording**
   - Atau tekan: Option + Cmd + N

3. **Settings**
   - Klik dropdown arrow (▼) next to record button
   - Camera: Select FaceTime HD Camera (atau kamera Mac kamu)
   - Microphone: Internal Microphone (nanti kita mute)
   - Quality: Maximum

4. **Setup Framing**
   - Position wajah di center
   - Background bersih
   - Lighting bagus (cahaya dari depan, bukan dari belakang)
   - Pastikan frame stabil

5. **Record Face Cam**
   - Klik record button (merah)
   - **Act naturally while looking at camera**
   - Variants yang bisa direkam:
     - Introduction (talking head - 10 detik)
     - Reactions (nodding, smiling - 5-10 detik)
     - Outro (closing statement - 10 detik)
   - Kamu bisa buat beberapa take

6. **Stop & Save**
   - Klik stop button
   - File > Save
   - Name: `face-cam-intro.mov`, `face-cam-outro.mov`, dll
   - Save to: `~/Documents/project/FE Archa/video-assets/`

---

## STEP 4: Record Voice Over Audio

### Option A: Menggunakan QuickTime (Simple)

1. **QuickTime Player > File > New Audio Recording**

2. **Settings**
   - Klik dropdown arrow
   - Microphone: Internal Microphone (atau external mic jika ada)
   - Quality: Maximum

3. **Recording Tips**
   - Rekam di ruangan tenang
   - Jauhkan dari AC/fan yang bising
   - Microphone 15-20cm dari mulut
   - Test dulu 10 detik, play back untuk cek quality

4. **Record Voice Over**
   - Buka file: `docs/demo-script.md`
   - Klik record
   - Baca script dengan natural
   - Pace: ~150 words/minute
   - Add pauses untuk emphasis
   - Jika salah, stop, edit nanti di CapCut

5. **Save Audio**
   - File > Save
   - Name: `voice-over.m4a`
   - Save to: `~/Documents/project/FE Archa/video-assets/`

### Option B: Menggunakan Audacity (Advanced)

- Download Audacity (gratis)
- Bisa noise reduction
- Better audio editing

---

## STEP 5: Organize Files

Buat folder struktur:

```
~/Documents/project/FE Archa/video-assets/
├── screen-recording.mp4      (dari OBS)
├── face-cam-intro.mov         (dari QuickTime)
├── face-cam-outro.mov         (dari QuickTime)
├── voice-over.m4a             (dari QuickTime/Audacity)
└── background-music.mp3       (optional - download dari YouTube Audio Library)
```

---

## STEP 6: Edit di CapCut

### Import Assets

1. **Buka CapCut Desktop**

2. **Create New Project**
   - Click "New project"
   - Name: "Archa Demo Video"

3. **Import Semua Files**
   - Klik "Import" atau drag & drop
   - Import:
     - screen-recording.mp4
     - face-cam-intro.mov
     - face-cam-outro.mov
     - voice-over.m4a
     - background-music.mp3 (if any)
     - docs/demo-subtitles.srt

### Timeline Setup

1. **Drag screen-recording.mp4 ke timeline**
   - Ini akan jadi base layer

2. **Drag voice-over.m4a ke audio track**
   - Align dengan start timeline

3. **Trim & Sync**
   - Potong screen recording sesuai panjang voice over
   - Use razor tool (Cmd + B) untuk cut
   - Delete bagian yang tidak perlu

### Add Face Cam Overlay

1. **Picture-in-Picture**
   - Drag face-cam-intro.mov ke timeline (di atas screen recording)
   - Resize ke corner (biasanya bottom-right)
   - Scale down: 20-25% dari screen size
   - Position: X: 1600, Y: 850

2. **Add Border/Shadow**
   - Select face cam clip
   - Go to "Effects" > "Border"
   - Add white/black border (5px)
   - Add shadow untuk depth

3. **Placement**
   - Face cam intro: 0:00 - 0:15
   - Face cam outro: 3:35 - 4:00
   - Reactions: sesuka hati di middle sections

### Add Subtitles (AUTO - Paling Mudah)

**CapCut punya auto subtitle!**

1. **Click "Text" > "Auto captions"**
   - Pilih language: English
   - Click "Generate"
   - CapCut akan auto-detect speech dari voice over

2. **Review & Edit**
   - Cek apakah ada typo
   - Edit manual jika perlu

3. **Style Subtitles**
   - Font: Montserrat atau Inter (modern, clean)
   - Size: 48-54px
   - Color: White dengan black stroke/shadow
   - Position: Bottom center (hindari face cam)

### Alternative: Import SRT Manual

1. **Click "Text" > "Import SRT"**
   - Select: `docs/demo-subtitles.srt`
   - Subtitles akan muncul otomatis

2. **Sync Check**
   - Play video
   - Cek apakah timing subtitle pas dengan audio
   - Adjust jika perlu

### Add Background Music (Optional)

1. **Import background-music.mp3**

2. **Drag ke audio track bawah**

3. **Adjust Volume**
   - Click music clip
   - Volume: 10-20% (jangan ganggu voice over)

4. **Fade In/Out**
   - Select clip > "Fade" > Fade in 2s, Fade out 2s

### Add Transitions

1. **Between Scenes (Optional)**
   - Select cut point
   - "Transition" > "Dissolve" atau "Fade"
   - Duration: 0.5-1 second

### Add Text Overlays (Key Points)

**Scene Highlights:**

1. **0:00-0:08 - Opening Hook**
   - Text: "Millions already understand DeFi..."
   - Animation: Typewriter effect

2. **0:45 - Logo Intro**
   - Text: "ARCHA"
   - Subtitle: "Arisan On-Chain"
   - Animation: Fade in + Scale

3. **2:00 - AI Section**
   - Text: "AI Yield Optimizer"
   - Icon: 🤖 atau AI icon

4. **2:45 - Numbers**
   - Overlay math calculation (animated)
   ```
   Monthly Pot: 500 USDC
   + AI Yield: +4 USDC
   = 504 USDC per winner
   ```

5. **3:50 - End Card**
   - Text layout:
   ```
   🌐 arisanonchain.vercel.app
   📄 GitHub: github.com/yt2025id-lab/Archa
   🐦 Twitter: @archaonchain

   Built for Mantle Global Hackathon 2025
   ```

### Color Grading (Optional tapi bagus)

1. **Select all video clips**
2. **Adjustments**
   - Brightness: +5
   - Contrast: +10
   - Saturation: +5
   (Bikin warna lebih vivid)

---

## STEP 7: Export Video

### Export Settings

1. **Click "Export" (top right)**

2. **Settings:**
   - Resolution: 1080p (1920x1080)
   - Frame rate: 30 fps
   - Bitrate: 20 Mbps (high quality)
   - Format: MP4
   - Codec: H.264

3. **Name:** `Archa-Demo-Final.mp4`

4. **Export Path:** `~/Documents/project/FE Archa/`

5. **Click Export**

### Review Final Video

1. **Watch full video**
   - Check subtitle sync
   - Check audio levels (voice over vs music)
   - Check face cam position
   - Check no glitches

2. **If issues found:**
   - Go back to CapCut
   - Fix issues
   - Export again

---

## STEP 8: Upload & Share

### YouTube (Recommended for Hackathon)

1. **Upload to YouTube**
   - Title: "Archa - Decentralized Arisan with AI Yield Optimizer | Mantle Global Hackathon 2025"
   - Description: (copy from demo-script.md)
   - Tags: mantle, defi, arisan, blockchain, ai, yield, hackathon
   - Thumbnail: Create custom (use Canva)

2. **Settings:**
   - Visibility: Unlisted or Public
   - Category: Science & Technology
   - Language: English

### Alternative: Loom / Google Drive

- Loom: Quick share dengan link
- Google Drive: Unlimited storage di GSuite

---

## Tips Pro

### Recording Tips
- ✅ Record di pagi hari (energi tinggi)
- ✅ Practice script 2-3x sebelum record
- ✅ Gunakan teleprompter app (optional)
- ✅ Smile! (keliatan di voice tone)

### Face Cam Tips
- ✅ Eye level dengan camera
- ✅ Natural light dari depan/samping
- ✅ Solid background (minimalist)
- ✅ Pastikan lensa camera bersih

### Voice Over Tips
- ✅ Warm up vocal (hum, stretch)
- ✅ Drink water (avoid coffee before)
- ✅ Stand saat rekam (better breathing)
- ✅ Add personality! Jangan monotone

### CapCut Shortcuts
- **Cmd + B**: Split clip
- **Delete**: Remove selected clip
- **Cmd + Z**: Undo
- **Space**: Play/Pause
- **Cmd + D**: Duplicate clip

---

## Troubleshooting

### Audio Issues
**Q: Voice over terlalu pelan?**
- A: CapCut > Select audio > Volume > 150-200%

**Q: Background noise?**
- A: CapCut > Effects > "Denoise"

### Video Issues
**Q: Screen recording lag?**
- A: OBS settings > Encoder > Hardware (VT)

**Q: Face cam quality buruk?**
- A: QuickTime > Quality > Maximum
- Check lighting & camera focus

### Sync Issues
**Q: Subtitle tidak sync dengan audio?**
- A: Manually adjust SRT timing di CapCut
- Or re-generate auto captions

---

## Checklist Final

Sebelum upload, pastikan:
- [ ] Video 1080p HD
- [ ] Audio clear (no clipping, no noise)
- [ ] Subtitles accurate dan sync
- [ ] Face cam terlihat jelas
- [ ] No typos di text overlays
- [ ] End card ada semua links
- [ ] Total duration ~4 minutes
- [ ] Background music tidak ganggu voice over
- [ ] Transitions smooth
- [ ] Color grading bagus

---

**Good luck with your demo video! 🎬**

Kalau ada pertanyaan during recording/editing, feel free to ask!
