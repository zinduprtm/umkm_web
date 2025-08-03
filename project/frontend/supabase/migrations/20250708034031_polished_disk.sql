/*
  # Seed Initial Data for UMKM Platform

  1. Sample Courses
  2. Sample Businesses
  3. Sample Forum Posts
*/

-- Insert sample courses
INSERT INTO courses (title, description, category, duration, level, lessons, instructor, rating, student_count) VALUES
('Cara Membuat Email dan WhatsApp Bisnis', 'Pelajari dasar-dasar komunikasi digital untuk usaha Anda', 'digital', '2 jam', 'Pemula', ARRAY['Membuat akun email Gmail', 'Mengatur WhatsApp Business', 'Menulis pesan profesional', 'Mengelola kontak pelanggan'], 'Tim UMKM Berdaya', 4.8, 245),
('Pemasaran Produk di Media Sosial', 'Strategi sederhana untuk mempromosikan produk secara online', 'marketing', '3 jam', 'Pemula', ARRAY['Memilih platform yang tepat', 'Membuat konten menarik', 'Menggunakan hashtag efektif', 'Berinteraksi dengan pelanggan'], 'Tim UMKM Berdaya', 4.7, 189),
('Mencatat Keuangan Usaha Sederhana', 'Cara mudah mengelola keuangan usaha kecil tanpa ribet', 'finance', '2.5 jam', 'Pemula', ARRAY['Membedakan modal dan keuntungan', 'Mencatat pemasukan dan pengeluaran', 'Menggunakan aplikasi keuangan sederhana', 'Merencanakan tabungan usaha'], 'Tim UMKM Berdaya', 4.9, 312),
('Menggunakan Aplikasi Marketplace', 'Panduan lengkap berjualan di Shopee, Tokopedia, dan platform lainnya', 'digital', '4 jam', 'Menengah', ARRAY['Mendaftar sebagai penjual', 'Mengupload foto produk', 'Menentukan harga dan ongkir', 'Menangani pesanan dan komplain'], 'Tim UMKM Berdaya', 4.6, 156),
('Strategi Harga yang Menguntungkan', 'Cara menentukan harga jual yang tepat untuk produk Anda', 'finance', '1.5 jam', 'Menengah', ARRAY['Menghitung biaya produksi', 'Riset harga kompetitor', 'Menentukan margin keuntungan', 'Strategi diskon dan promo'], 'Tim UMKM Berdaya', 4.5, 278),
('Membangun Jaringan Pelanggan', 'Tips mempertahankan pelanggan lama dan mendapatkan pelanggan baru', 'marketing', '2 jam', 'Menengah', ARRAY['Memberikan pelayanan terbaik', 'Program loyalitas sederhana', 'Mendapatkan referral', 'Menangani feedback negatif'], 'Tim UMKM Berdaya', 4.8, 203);

-- Note: For businesses and forum posts, we'll need actual user IDs
-- These will be created when users register through the application
-- The following are examples that would be inserted after user registration

-- Example businesses (commented out - will be created through the app)
/*
INSERT INTO businesses (name, description, category, location, phone, hours, services, owner_name, image_url, rating, review_count) VALUES
('Warung Nasi Bu Sari', 'Warung nasi dengan lauk lengkap dan harga terjangkau', 'food', 'Jl. Sudirman No. 123, Jakarta Pusat', '0812-3456-7890', '06:00 - 22:00', ARRAY['Makan di tempat', 'Takeaway', 'Delivery'], 'Ibu Sari', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 4.5, 127),
('Bengkel Motor Pak Budi', 'Servis motor dan spare part berkualitas', 'services', 'Jl. Raya Bogor No. 45, Depok', '0813-7654-3210', '08:00 - 17:00', ARRAY['Servis rutin', 'Ganti oli', 'Perbaikan mesin', 'Spare part'], 'Pak Budi Santoso', 'https://images.pexels.com/photos/190537/pexels-photo-190537.jpeg', 4.8, 89);
*/

-- Example forum posts (commented out - will be created through the app)
/*
INSERT INTO forum_posts (title, content, category, tags, status, author_name, likes, reply_count) VALUES
('Cara meningkatkan penjualan online saat pandemi?', 'Halo teman-teman, usaha warung makan saya turun drastis sejak pandemi. Ada yang punya tips untuk meningkatkan penjualan online? Saya sudah coba buka di GoFood tapi masih sepi...', 'business', ARRAY['penjualan', 'online', 'pandemi', 'gofood'], 'open', 'Ibu Sari', 12, 8),
('Aplikasi kasir gratis yang bagus untuk UMKM?', 'Mohon rekomendasi aplikasi kasir yang gratis dan mudah digunakan. Usaha saya masih kecil jadi belum sanggup bayar yang berbayar. Terima kasih!', 'tech', ARRAY['aplikasi', 'kasir', 'gratis', 'umkm'], 'solved', 'Pak Budi', 18, 15);
*/