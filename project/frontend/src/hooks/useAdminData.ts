// src/hooks/useAdminData.ts

import { useState, useEffect } from 'react';
import { Course, supabase } from '../lib/supabase';
import type { User, UMKMProfile, Product, Service, Training } from '../lib/index';
import { toast } from 'react-toastify';

type InsertTraining = Omit<Training,'id'|'created_at'|'updated_at'|'pendaftar'|'foto_pelatihan'|'is_active'>;

export function useAdminData() {
  const [users, setUsers] = useState<User[]>([]);
  const [umkms, setUmkms] = useState<UMKMProfile[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [courses, setCourses] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

//   supabase.from<InterfaceName>('table_name')
  async function fetchAll() {
    setLoading(true);
    const [u, m, p, s, c] = await Promise.all([
      supabase.from<User>('users').select('*').neq('role', 'admin'),
      supabase.from<UMKMProfile>('umkm_profiles').select('*'),
      supabase.from<Product>('products').select('*'),
      supabase.from<Service>('services').select('*'),
      supabase.from<Course>('courses').select('*')
    ]);

    console.log('▶️ users:', u.data, u.error);
    console.log('▶️ umkms:', m.data, m.error);
    console.log('▶️ products:', p.data, p.error);
    console.log('▶️ services:', s.data, s.error);
    console.log('▶️ trainings:', c.data, c.error);

    if (u.data) setUsers(u.data);
    if (m.data) setUmkms(m.data);
    if (p.data) setProducts(p.data);
    if (s.data) setServices(s.data);
    if (c.data) setCourses(c.data);
    setLoading(false);
  }

  const deleteUser = async (id: User['id']) => {
    await supabase.from('users').delete().eq('id', id);
    fetchAll();
  };

  const deleteUmkm = async (id: UMKMProfile['id']) => {
    await supabase.from('umkm_profiles').delete().eq('id', id);
    fetchAll();
  };

  const deleteCourse = async (id: Training['id']) => {
    await supabase.from('courses').delete().eq('id', id);
    fetchAll();
  };

  const createCourse = async (data: InsertTraining) => {
    await supabase.from('courses').insert([data]);
    fetchAll();
  };

  // update user
  const updateUser = async (id: User['id'], updates: Partial<User>) => {
  console.log('🛠️ updateUser, id=', id, 'updates=', updates);
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select();    // tambahkan .select() agar Supabase kembalikan baris yang di‑update
  console.log('🛠️ updateUser result:', { data, error });
  toast.success("User berhasil di update!")
  fetchAll();
  };

  

  const updateUmkm = async (id: UMKMProfile['id'], updates: Partial<UMKMProfile>) => {
    const { error } = await supabase
      .from<UMKMProfile>('umkm_profiles')
      .update(updates)
      .eq('id', id);
      toast.success("UMKM berhasil di update!")
      if (error) console.error('Update UMKM gagal:', error);
      toast.success("Yah update UMKM gagal!")
      fetchAll();
    };
    
    const updateCourse = async (id: Course['id'], updates: Partial<Course>) => {
        const { error } = await supabase
        .from<Course>('courses')
        .update(updates)
        .eq('id', id);
        toast.success("Pelatihan berhasil di update!")
        if (error) console.error('Update pelatihan gagal:', error);
        toast.success("Yah update Pelatihan gagal!")
    fetchAll();
  };

  return {
    users,
    umkms,
    products,
    services,
    courses,
    loading,
    fetchAll,
    deleteUser,
    deleteUmkm,
    deleteCourse,
    createCourse,
    updateUser,
    updateUmkm,
    updateCourse
  };
}