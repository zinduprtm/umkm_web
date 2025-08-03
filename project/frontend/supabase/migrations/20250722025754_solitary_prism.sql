/*
  # UMKM Platform - Role-Based Schema

  1. New Tables
    - `users` - User profiles with roles
    - `umkm_profiles` - UMKM business profiles
    - `products` - Products for UMKM
    - `services` - Services for UMKM
    - `orders` - Order management
    - `news` - News and announcements
    - `trainings` - Training schedules
    - `reviews` - Product/service reviews
    - `favorites` - User favorites

  2. Security
    - Enable RLS on all tables
    - Role-based policies
    - JWT authentication
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'umkm', 'pengunjung');
CREATE TYPE business_type AS ENUM ('produk', 'jasa', 'keduanya');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- Users table with roles
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  role user_role DEFAULT 'pengunjung',
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- UMKM profiles table
CREATE TABLE IF NOT EXISTS umkm_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  nama_usaha text NOT NULL,
  deskripsi text NOT NULL,
  jenis business_type NOT NULL,
  lokasi text NOT NULL,
  alamat_lengkap text,
  kontak_wa text NOT NULL,
  media_sosial jsonb DEFAULT '{}',
  jam_operasional text,
  foto_usaha text,
  is_verified boolean DEFAULT false,
  rating numeric(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  umkm_id uuid REFERENCES umkm_profiles(id) ON DELETE CASCADE,
  nama text NOT NULL,
  deskripsi text NOT NULL,
  harga numeric(12,2) NOT NULL,
  kategori text NOT NULL,
  stok integer DEFAULT 0,
  foto_produk text[],
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  umkm_id uuid REFERENCES umkm_profiles(id) ON DELETE CASCADE,
  nama text NOT NULL,
  deskripsi text NOT NULL,
  tarif numeric(12,2) NOT NULL,
  kategori text NOT NULL,
  durasi text,
  foto_jasa text[],
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  umkm_id uuid REFERENCES umkm_profiles(id) ON DELETE CASCADE,
  nama_pemesan text NOT NULL,
  phone_pemesan text NOT NULL,
  email_pemesan text,
  alamat_pemesan text,
  item_type text NOT NULL CHECK (item_type IN ('product', 'service')),
  item_id uuid NOT NULL,
  item_name text NOT NULL,
  quantity integer DEFAULT 1,
  total_harga numeric(12,2) NOT NULL,
  catatan text,
  status order_status DEFAULT 'pending',
  whatsapp_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- News table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  judul text NOT NULL,
  isi text NOT NULL,
  foto_berita text,
  author_id uuid REFERENCES users(id) ON DELETE SET NULL,
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Trainings table
CREATE TABLE IF NOT EXISTS trainings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  judul text NOT NULL,
  deskripsi text NOT NULL,
  tanggal_mulai timestamptz NOT NULL,
  tanggal_selesai timestamptz,
  lokasi text,
  kapasitas integer,
  pendaftar integer DEFAULT 0,
  foto_pelatihan text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  umkm_id uuid REFERENCES umkm_profiles(id) ON DELETE CASCADE,
  item_type text CHECK (item_type IN ('product', 'service', 'umkm')),
  item_id uuid,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  komentar text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, umkm_id, item_type, item_id)
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  item_type text NOT NULL CHECK (item_type IN ('product', 'service', 'umkm')),
  item_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE umkm_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can read own profile" ON users FOR SELECT TO authenticated USING (auth.uid() = auth_id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE TO authenticated USING (auth.uid() = auth_id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT TO authenticated WITH CHECK (auth.uid() = auth_id);
CREATE POLICY "Admins can read all users" ON users FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND role = 'admin')
);

-- RLS Policies for umkm_profiles
CREATE POLICY "Anyone can read UMKM profiles" ON umkm_profiles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "UMKM users can manage own profile" ON umkm_profiles FOR ALL TO authenticated USING (
  user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
);
CREATE POLICY "Admins can manage all UMKM profiles" ON umkm_profiles FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND role = 'admin')
);

-- RLS Policies for products
CREATE POLICY "Anyone can read active products" ON products FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "UMKM users can manage own products" ON products FOR ALL TO authenticated USING (
  umkm_id IN (SELECT id FROM umkm_profiles WHERE user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()))
);
CREATE POLICY "Admins can manage all products" ON products FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND role = 'admin')
);

-- RLS Policies for services
CREATE POLICY "Anyone can read active services" ON services FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "UMKM users can manage own services" ON services FOR ALL TO authenticated USING (
  umkm_id IN (SELECT id FROM umkm_profiles WHERE user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()))
);
CREATE POLICY "Admins can manage all services" ON services FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND role = 'admin')
);

-- RLS Policies for orders
CREATE POLICY "Users can read own orders" ON orders FOR SELECT TO authenticated USING (
  user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
);
CREATE POLICY "UMKM can read orders for their business" ON orders FOR SELECT TO authenticated USING (
  umkm_id IN (SELECT id FROM umkm_profiles WHERE user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()))
);
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can manage all orders" ON orders FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND role = 'admin')
);

-- RLS Policies for news
CREATE POLICY "Anyone can read published news" ON news FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Admins can manage all news" ON news FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND role = 'admin')
);

-- RLS Policies for trainings
CREATE POLICY "Anyone can read active trainings" ON trainings FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Admins can manage all trainings" ON trainings FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND role = 'admin')
);

-- RLS Policies for reviews
CREATE POLICY "Anyone can read reviews" ON reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated users can create reviews" ON reviews FOR INSERT TO authenticated WITH CHECK (
  user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE TO authenticated USING (
  user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
);

-- RLS Policies for favorites
CREATE POLICY "Users can manage own favorites" ON favorites FOR ALL TO authenticated USING (
  user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
);

-- Create indexes
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_umkm_profiles_user_id ON umkm_profiles(user_id);
CREATE INDEX idx_products_umkm_id ON products(umkm_id);
CREATE INDEX idx_products_kategori ON products(kategori);
CREATE INDEX idx_services_umkm_id ON services(umkm_id);
CREATE INDEX idx_services_kategori ON services(kategori);
CREATE INDEX idx_orders_umkm_id ON orders(umkm_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_reviews_umkm_id ON reviews(umkm_id);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_umkm_profiles_updated_at BEFORE UPDATE ON umkm_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trainings_updated_at BEFORE UPDATE ON trainings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();