# 🔧 Troubleshooting Guide - Platform UMKM Berdaya

Panduan mengatasi masalah umum saat setup dan menjalankan platform.

## 🚨 Masalah Umum & Solusi

### 1. **Layar Kosong / Blank Page**

**Gejala:** Browser menampilkan halaman kosong, tidak ada konten

**Penyebab & Solusi:**
```bash
# 1. Cek apakah ada error di console browser
# Buka Developer Tools (F12) → Console

# 2. Restart development server
Ctrl+C  # Stop server
npm run dev  # Start ulang

# 3. Clear browser cache
Ctrl+Shift+R  # Hard refresh
# atau clear cache di browser settings

# 4. Cek dependencies
npm install  # Install ulang dependencies
```

### 2. **Error "vite.svg not found"**

**Gejala:** Error 404 untuk file vite.svg

**Solusi:** Sudah diperbaiki di update terbaru, tapi jika masih error:
```bash
# Restart server
npm run dev
```

### 3. **Port 5173 Already in Use**

**Gejala:** Error "Port 5173 is already in use"

**Solusi:**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9

# Atau gunakan port lain
npm run dev -- --port 3000
```

### 4. **Node.js/npm Command Not Found**

**Gejala:** Command 'node' atau 'npm' tidak dikenali

**Solusi:**
1. Install Node.js dari https://nodejs.org/
2. Restart terminal/command prompt
3. Verifikasi: `node --version` dan `npm --version`

### 5. **Dependencies Installation Failed**

**Gejala:** Error saat `npm install`

**Solusi:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules dan install ulang
rm -rf node_modules
rm package-lock.json
npm install
```

### 6. **Supabase Connection Error**

**Gejala:** Error koneksi ke database

**Solusi:**
1. Cek file `.env` sudah diisi dengan benar
2. Pastikan Supabase project aktif
3. Cek network connection
4. Verifikasi URL dan API key di Supabase dashboard

### 7. **TypeScript Errors**

**Gejala:** Error TypeScript di console

**Solusi:**
```bash
# Install TypeScript dependencies
npm install --save-dev typescript @types/react @types/react-dom

# Restart TypeScript server di VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

### 8. **Tailwind CSS Not Working**

**Gejala:** Styling tidak muncul

**Solusi:**
```bash
# Cek tailwind.config.js
# Restart development server
npm run dev
```

## 🔍 Debug Steps

### Step 1: Cek Console Browser
1. Buka Developer Tools (F12)
2. Lihat tab Console untuk error messages
3. Lihat tab Network untuk failed requests

### Step 2: Cek Terminal
1. Lihat output di terminal tempat `npm run dev` berjalan
2. Cari error messages atau warnings

### Step 3: Verifikasi Setup
```bash
# Jalankan health check
npm run check

# Cek file penting
ls -la src/
ls -la public/
cat .env
```

### Step 4: Clean Install
```bash
# Backup .env file
cp .env .env.backup

# Clean everything
rm -rf node_modules
rm package-lock.json
rm -rf dist

# Fresh install
npm install
npm run dev
```

## 🆘 Jika Masih Bermasalah

### Langkah Terakhir:
1. **Screenshot error** yang muncul
2. **Copy paste error message** dari console
3. **Cek versi Node.js**: `node --version`
4. **Cek sistem operasi** yang digunakan

### Informasi untuk Debugging:
```bash
# System info
node --version
npm --version
git --version

# Project info
cat package.json | grep version
ls -la

# Environment
cat .env
```

## 📞 Bantuan Lebih Lanjut

Jika semua langkah di atas tidak berhasil:

1. **Restart komputer** - Sometimes it just works! 😅
2. **Coba di browser lain** - Chrome, Firefox, Edge
3. **Disable antivirus/firewall** sementara
4. **Coba di jaringan internet lain**

---

**💡 Tips:** Selalu backup file `.env` sebelum melakukan troubleshooting!