# UMKM Berdaya - Platform Pemberdayaan UMKM

Platform digital untuk memberdayakan UMKM sektor informal dan pekerja migran dengan fitur pelatihan keterampilan, direktori bisnis, dan forum komunitas.

## 🚀 Fitur Utama

- **Pusat Pelatihan Keterampilan**: Tutorial literasi digital, pemasaran online, dan manajemen keuangan
- **Direktori UMKM**: Pencarian dan promosi usaha lokal
- **Forum Komunitas**: Diskusi dan berbagi pengalaman sesama wirausaha
- **Responsive Design**: Optimized untuk mobile dan desktop
- **Real-time Updates**: Menggunakan Supabase untuk data real-time

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Icons**: Lucide React
- **Deployment**: Docker + Nginx

## 📋 Prerequisites

- Node.js 18+ 
- Docker & Docker Compose
- Akun Supabase (gratis)

## 🔧 Instalasi Lokal

### 1. Clone Repository
```bash
git clone <repository-url>
cd umkm-platform
```

### 2. Setup Environment
```bash
# Jalankan script setup
npm run setup

# Atau manual:
cp .env.example .env
```

### 3. Konfigurasi Supabase
1. Buat project baru di [Supabase](https://supabase.com)
2. Copy URL dan Anon Key ke file `.env`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Setup Database
1. Buka Supabase Dashboard → SQL Editor
2. Jalankan file `supabase/migrations/create_initial_schema.sql`
3. Jalankan file `supabase/migrations/seed_initial_data.sql`

### 5. Install Dependencies & Run
```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Atau dengan Docker
npm run docker:dev
```

## 🐳 Docker Deployment

### Development
```bash
# Start development environment
npm run docker:dev

# Stop containers
npm run docker:stop

# View logs
npm run docker:logs
```

### Production
```bash
# Deploy to production
npm run deploy

# Atau manual:
docker-compose up --build -d
```

## 📁 Struktur Project

```
umkm-platform/
├── src/
│   ├── components/          # React components
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilities & Supabase config
│   └── ...
├── supabase/
│   └── migrations/         # Database migrations
├── scripts/                # Deployment scripts
├── docker-compose.yml      # Production config
├── docker-compose.dev.yml  # Development config
├── Dockerfile             # Production image
├── Dockerfile.dev         # Development image
└── nginx.conf             # Nginx configuration
```

## 🔐 Environment Variables

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Configuration
VITE_APP_NAME=UMKM Berdaya
VITE_APP_VERSION=1.0.0
```

## 🚀 Deployment ke Production

### 1. VPS/Server Setup
```bash
# Clone repository
git clone <repository-url>
cd umkm-platform

# Setup environment
cp .env.example .env
# Edit .env dengan credentials production

# Deploy
npm run deploy
```

### 2. Domain Setup
1. Point domain ke server IP
2. Update nginx.conf dengan domain name
3. Setup SSL dengan Let's Encrypt:
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com
```

### 3. Monitoring
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f umkm-frontend

# Restart services
docker-compose restart
```

## 💾 Backup & Maintenance

### Database Backup
```bash
# Create backup
npm run backup

# Restore backup
docker-compose exec postgres psql -U umkm_user -d umkm_platform < backups/backup_file.sql
```

### Update Application
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose up --build -d
```

## 🔧 Development

### Local Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database Changes
1. Create new migration file in `supabase/migrations/`
2. Run migration in Supabase Dashboard
3. Update TypeScript types in `src/lib/supabase.ts`

## 📱 Mobile App (Future)

Platform ini dirancang mobile-first dan dapat dikembangkan menjadi:
- Progressive Web App (PWA)
- React Native mobile app
- Hybrid app dengan Capacitor

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

- Email: support@umkmberdaya.id
- Documentation: [docs.umkmberdaya.id](https://docs.umkmberdaya.id)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

---

**UMKM Berdaya** - Memberdayakan UMKM Indonesia 🇮🇩