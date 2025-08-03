// src/hooks/useUMKMData.ts
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type {
  UMKMProfile,
  Product,
  Service,
  Order
} from '../types/index'
import { toast } from 'react-toastify';

export function useUMKMData(userId: string | undefined) {
  const [profile, setProfile]     = useState<UMKMProfile | null>(null)
  const [products, setProducts]   = useState<Product[]>([])
  const [services, setServices]   = useState<Service[]>([])
  const [orders, setOrders]       = useState<Order[]>([])
  const [loading, setLoading]     = useState(true)
  

  useEffect(() => {
    if (!userId) return
    fetchAll()
  }, [userId])

    async function fetchAll() {
    setLoading(true)

    // 1) Coba SELECT profil
    const { data: prof, error: profErr } = await supabase
        .from<UMKMProfile>('umkm_profiles')
        .select(`
        id,
        user_id,
        nama_usaha,
        deskripsi,
        jenis,
        lokasi,
        alamat_lengkap,
        kontak_wa,
        media_sosial,
        jam_operasional,
        foto_usaha
        `)
        .eq('user_id', userId)
        .single()

    console.log('▶️ fetched profile:', prof, profErr)

    // 2) Kalau belum ada (kode PGRST116), buat record kosong
    if (profErr?.code === 'PGRST116') {
        const { data: newProf, error: newErr } = await supabase
        .from<UMKMProfile>('umkm_profiles')
        .insert([{
            user_id:     userId!,
            nama_usaha:  '',
            deskripsi:   '',
            jenis:       'produk',
            lokasi:      '',
            alamat_lengkap: '',
            kontak_wa:   '',
            media_sosial:  {},
            jam_operasional: '',
            foto_usaha:    ''
        }])
        .select(`
            id,
            user_id,
            nama_usaha,
            deskripsi,
            jenis,
            lokasi,
            alamat_lengkap,
            kontak_wa,
            media_sosial,
            jam_operasional,
            foto_usaha
        `)
        .single()

        if (newErr) {
        console.error('❌ create empty profile error:', newErr)
        } else {
        console.log('✅ created empty profile:', newProf)
        setProfile(newProf!)
        }

    // 3) Kalau sudah ada, pakai yang lama
    } else if (prof) {
        setProfile(prof)
    }

    // … lanjut fetch products, services, orders …
    setLoading(false)
    }
    async function updateProfile(updates: Partial<UMKMProfile>) {
        if (!profile?.id) {
        console.error('⚠️ cannot update: profile.id is missing')
        return
        }

        const { data, error } = await supabase
        .from('umkm_profiles')
        .update(updates)
        .eq('id', profile.id)

        if (error) {
        console.error('❌ updateProfile error:', error)
        toast.warning("UMKM Gagal di Update!")
        return
        }
        toast.success("Update berhasil!")
        console.log('✅ updateProfile success:', data)

        await fetchAll()
    }

    // after updateProfile, before CRUD produk/jasa…
  async function uploadImage(file: File): Promise<string> {
    // 1) Generate a unique path
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    // 2) Upload it
    const { error: uploadErr } = await supabase
      .storage
      .from('umkm-photos')
      .upload(filePath, file);

    if (uploadErr) throw uploadErr;

    // 3) Make URL public
    const { publicUrl, error: urlErr } = supabase
      .storage
      .from('umkm-photos')
      .getPublicUrl(filePath);

    if (urlErr) throw urlErr;

    // 4) Store that URL in your profile table
    await updateProfile({ foto_usaha: publicUrl });

    // 5) Return so the component can also use it if needed
    return publicUrl;
  }


  // CRUD produk dan jasa (sama seperti sebelumnya)
  async function createProduct(data: Omit<Product,'id'|'created_at'|'updated_at'|'is_active'>) {
    await supabase.from('products').insert([{ ...data, umkm_id: userId }])
    await fetchAll()
  }
  async function updateProduct(id:string,upd:Partial<Product>) {
    await supabase.from('products').update(upd).eq('id',id)
    await fetchAll()
  }
  async function deleteProduct(id:string) {
    await supabase.from('products').delete().eq('id',id)
    await fetchAll()
  }

  async function createService(data: Omit<Service,'id'|'created_at'|'updated_at'|'is_active'>) {
    await supabase.from('services').insert([{ ...data, umkm_id: userId }])
    await fetchAll()
  }
  async function updateService(id:string,upd:Partial<Service>) {
    await supabase.from('services').update(upd).eq('id',id)
    await fetchAll()
  }
  async function deleteService(id:string) {
    await supabase.from('services').delete().eq('id',id)
    await fetchAll()
  }

  return {
    profile,
    products,
    services,
    orders,
    loading,
    fetchAll,
    updateProfile,
    createProduct,
    updateProduct,
    deleteProduct,
    createService,
    updateService,
    deleteService,
    uploadImage,
  }
}
