// src/hooks/useCatalogData.ts
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { UMKMProfile } from '../types/index'

export interface CatalogItem {
  id: string
  nama_usaha: string
  deskripsi: string
  lokasi: string
  kontak_wa: string
  foto_usaha?: string
  rating: number
  total_reviews: number
}

export function useCatalogData() {
  const [items, setItems] = useState<CatalogItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchAll()
  }, [])

  async function fetchAll() {
    setLoading(true)
    const { data, error } = await supabase
      .from<UMKMProfile>('umkm_profiles')
      .select('*')
      // .eq('is_verified', true)
      console.log('[DEBUG] Katalog UMKM:', { data, error });   // opsional: hanya yang verified
    if (error) {
      console.error('useCatalogData error:', error)
    } else if (data) {
      setItems(data as CatalogItem[])
    }
    setLoading(false)
  }

  return { items, loading }
}
