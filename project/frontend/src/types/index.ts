export type UserRole = 'admin' | 'umkm' | 'pengunjung';
export type BusinessType = 'produk' | 'jasa' | 'keduanya';
export type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type ItemType = 'product' | 'service' | 'umkm';

export interface User {
  id: string;
  auth_id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UMKMProfile {
  id: string;
  user_id: string;
  nama_usaha: string;
  deskripsi: string;
  jenis: BusinessType;
  lokasi: string;
  alamat_lengkap?: string;
  kontak_wa: string;
  media_sosial?: Record<string, string>;
  jam_operasional?: string;
  foto_usaha?: string;
  is_verified: boolean;
  rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  umkm_id: string;
  nama: string;
  deskripsi: string;
  harga: number;
  kategori: string;
  stok: number;
  foto_produk?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  umkm_profile?: UMKMProfile;
}

export interface Service {
  id: string;
  umkm_id: string;
  nama: string;
  deskripsi: string;
  tarif: number;
  kategori: string;
  durasi?: string;
  foto_jasa?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  umkm_profile?: UMKMProfile;
}

export interface Order {
  id: string;
  user_id?: string;
  umkm_id: string;
  nama_pemesan: string;
  phone_pemesan: string;
  email_pemesan?: string;
  alamat_pemesan?: string;
  item_type: 'product' | 'service';
  item_id: string;
  item_name: string;
  quantity: number;
  total_harga: number;
  catatan?: string;
  status: OrderStatus;
  whatsapp_sent: boolean;
  created_at: string;
  updated_at: string;
  umkm_profile?: UMKMProfile;
}

export interface News {
  id: string;
  judul: string;
  isi: string;
  foto_berita?: string;
  author_id?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Training {
  id: string;
  judul: string;
  deskripsi: string;
  tanggal_mulai: string;
  tanggal_selesai?: string;
  lokasi?: string;
  kapasitas?: number;
  pendaftar: number;
  foto_pelatihan?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  umkm_id: string;
  item_type?: ItemType;
  item_id?: string;
  rating: number;
  komentar?: string;
  created_at: string;
  user?: User;
}

export interface Favorite {
  id: string;
  user_id: string;
  item_type: ItemType;
  item_id: string;
  created_at: string;
}