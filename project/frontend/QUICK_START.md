# ⚡ Quick Start - Platform UMKM Berdaya

Panduan super cepat untuk menjalankan platform di lokal dalam 5 menit!

## 🎯 Langkah Cepat

### 1. Download & Setup
```bash
# Clone project
git clone <repository-url>
cd umkm-platform

# Auto setup (install dependencies + create .env)
npm run setup
```

### 2. Setup Supabase (2 menit)
1. Buka https://supabase.com/ → Sign up → Create new project
2. Copy **Project URL** dan **anon public key** dari Settings → API
3. Edit file `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Setup Database
1. Di Supabase Dashboard → SQL Editor → New query
2. Copy-paste isi file `supabase/migrations/20250708034004_lucky_flower.sql` → Run
3. Copy-paste isi file `supabase/migrations/20250708034031_polished_disk.sql` → Run

### 4. Jalankan Aplikasi
```bash
npm run dev
```

### 5. Buka Browser
http://localhost:5173

## 🔧 Troubleshooting Cepat

**Error "npm not found"?**
→ Install Node.js dari https://nodejs.org/

**Error Supabase connection?**
→ Cek file `.env` sudah diisi dengan benar

**Port 5173 sudah digunakan?**
→ Tutup aplikasi lain atau restart komputer

**Dependencies error?**
```bash
rm -rf node_modules
npm install
```

## ✅ Cek Setup
```bash
npm run check
```

Selesai! Platform UMKM siap digunakan! 🎉