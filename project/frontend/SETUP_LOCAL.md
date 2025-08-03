# 🚀 Panduan Setup Lokal - Platform UMKM Berdaya

Panduan lengkap untuk menjalankan platform UMKM di komputer lokal Anda.

## 📋 Prerequisites (Yang Harus Diinstall Dulu)

### 1. Install Node.js
- Download dari: https://nodejs.org/
- Pilih versi LTS (Long Term Support)
- Verifikasi instalasi:
```bash
node --version
npm --version
```

### 2. Install Git
- Download dari: https://git-scm.com/
- Verifikasi instalasi:
```bash
git --version
```

### 3. Install Docker (Opsional tapi Recommended)
- Download dari: https://www.docker.com/products/docker-desktop/
- Verifikasi instalasi:
```bash
docker --version
docker-compose --version
```

## 🔧 Langkah-Langkah Setup

### Step 1: Download Project
```bash
# Clone repository (ganti dengan URL repository Anda)
git clone https://github.com/your-username/umkm-platform.git

# Masuk ke folder project
cd umkm-platform
```

### Step 2: Setup Environment Variables
```bash
# Copy file environment
cp .env.example .env

# Edit file .env dengan text editor favorit Anda
# Contoh menggunakan notepad (Windows) atau nano (Linux/Mac)
notepad .env
# atau
nano .env
```

**Isi file .env dengan:**
```env
# Supabase Configuration (akan diisi nanti)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Configuration
VITE_APP_NAME=UMKM Berdaya
VITE_APP_VERSION=1.0.0
```

### Step 3: Setup Supabase Database

#### 3.1 Buat Akun Supabase
1. Buka https://supabase.com/
2. Klik "Start your project"
3. Sign up dengan GitHub atau email
4. Buat project baru:
   - Project name: `umkm-platform`
   - Database password: (buat password yang kuat)
   - Region: pilih yang terdekat (Singapore untuk Indonesia)

#### 3.2 Dapatkan Credentials
1. Di dashboard Supabase, klik "Settings" → "API"
2. Copy:
   - **Project URL** → masukkan ke `VITE_SUPABASE_URL`
   - **anon public key** → masukkan ke `VITE_SUPABASE_ANON_KEY`

#### 3.3 Setup Database Schema
1. Di dashboard Supabase, klik "SQL Editor"
2. Klik "New query"
3. Copy isi file `supabase/migrations/20250708034004_lucky_flower.sql`
4. Paste ke SQL Editor dan klik "Run"
5. Ulangi untuk file `supabase/migrations/20250708034031_polished_disk.sql`

### Step 4: Install Dependencies
```bash
# Install semua package yang dibutuhkan
npm install
```

### Step 5: Jalankan Development Server

#### Opsi A: Tanpa Docker (Lebih Mudah)
```bash
# Jalankan development server
npm run dev
```

#### Opsi B: Dengan Docker (Recommended untuk Production-like)
```bash
# Jalankan dengan Docker
npm run docker:dev
```

### Step 6: Akses Aplikasi
- Buka browser
- Kunjungi: http://localhost:5173 (tanpa Docker) atau http://localhost:5173 (dengan Docker)
- Platform UMKM siap digunakan!

## 🔍 Troubleshooting

### Problem 1: "npm command not found"
**Solusi:** Install Node.js terlebih dahulu dari https://nodejs.org/

### Problem 2: "git command not found"
**Solusi:** Install Git dari https://git-scm.com/

### Problem 3: Error saat npm install
**Solusi:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules dan install ulang
rm -rf node_modules
npm install
```

### Problem 4: Supabase connection error
**Solusi:**
1. Pastikan `.env` file sudah diisi dengan benar
2. Cek apakah URL dan API key sudah benar
3. Pastikan database schema sudah dijalankan

### Problem 5: Docker tidak bisa jalan
**Solusi:**
1. Pastikan Docker Desktop sudah running
2. Restart Docker Desktop
3. Coba jalankan tanpa Docker dulu: `npm run dev`

### Problem 6: Port 5173 sudah digunakan
**Solusi:**
```bash
# Kill process yang menggunakan port
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9
```

## 📱 Testing Fitur

### 1. Test Skills Training
- Klik "Pelatihan" di menu
- Pilih kategori pelatihan
- Klik salah satu kursus
- Pastikan detail kursus muncul

### 2. Test Business Directory
- Klik "Direktori UMKM" di menu
- Coba search bisnis
- Klik "Daftar Usaha" untuk test form
- Filter berdasarkan kategori

### 3. Test Community Forum
- Klik "Forum Komunitas" di menu
- Coba search diskusi
- Klik "Diskusi Baru" untuk test form
- Klik salah satu post untuk lihat detail

## 🛠️ Development Commands

```bash
# Development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Docker development
npm run docker:dev

# Docker production
npm run docker:prod

# Stop Docker containers
npm run docker:stop

# View Docker logs
npm run docker:logs
```

## 📊 Monitoring & Logs

### Cek Status Aplikasi
```bash
# Tanpa Docker
# Lihat terminal tempat npm run dev berjalan

# Dengan Docker
npm run docker:logs
```

### Database Monitoring
- Login ke Supabase Dashboard
- Klik "Database" → "Tables" untuk lihat data
- Klik "Authentication" → "Users" untuk lihat user yang daftar

## 🔄 Update Aplikasi

```bash
# Pull update terbaru
git pull origin main

# Install dependencies baru (jika ada)
npm install

# Restart development server
# Ctrl+C untuk stop, lalu npm run dev lagi

# Atau dengan Docker
npm run docker:stop
npm run docker:dev
```

## 🎯 Next Steps

Setelah aplikasi berjalan lokal:

1. **Test semua fitur** - Pastikan semua berfungsi dengan baik
2. **Customize content** - Edit konten sesuai kebutuhan
3. **Add real data** - Tambah data bisnis dan kursus nyata
4. **Setup production** - Siapkan untuk deploy ke server
5. **Domain & SSL** - Setup domain dan sertifikat SSL

## 📞 Bantuan

Jika mengalami masalah:
1. Cek file log di terminal
2. Pastikan semua prerequisites sudah terinstall
3. Cek koneksi internet untuk Supabase
4. Restart development server
5. Clear browser cache

---

**Selamat! Platform UMKM Berdaya siap digunakan di lokal! 🎉**