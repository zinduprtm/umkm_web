// src/components/Catalog.tsx
import React, { useState } from 'react'
import {
  Search,
  MapPin,
  Star,
  ShoppingBag,
  MessageCircle
} from 'lucide-react'
import { useCatalogData, CatalogItem } from '../hooks/useCatalogData'
import AuthModal from './AuthModal'
import { useAuth } from '../hooks/useAuth'

export default function Catalog() {
  const { user } = useAuth()
  const { items: umkms, loading } = useCatalogData()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [showAuthModal, setShowAuthModal] = useState(false)

  const locations = [
    'all','jakarta','bandung','surabaya','yogyakarta','medan'
  ]

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Loading katalog…</p>
      </div>
    )
  }

  const filtered = umkms.filter(u => {
    const t = searchTerm.toLowerCase()
    const matchSearch =
      u.nama_usaha.toLowerCase().includes(t) ||
      u.deskripsi.toLowerCase().includes(t)
    const matchLoc =
      selectedLocation === 'all' ||
      u.lokasi.toLowerCase() === selectedLocation
    return matchSearch && matchLoc
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Katalog UMKM
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Temukan berbagai UMKM lokal di seluruh Indonesia
        </p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari UMKM…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <select
            value={selectedLocation}
            onChange={e => setSelectedLocation(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>
                {loc === 'all'
                  ? 'Semua Lokasi'
                  : loc.charAt(0).toUpperCase() + loc.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((u: CatalogItem) => (
          <div
            key={u.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {u.foto_usaha && (
              <img
                src={u.foto_usaha}
                alt={u.nama_usaha}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {u.nama_usaha}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {u.deskripsi}
              </p>

              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {u.lokasi}
              </div>

              <div className="flex items-center mb-4">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium">
                  {u.rating.toFixed(1)} ({u.total_reviews})
                </span>
              </div>

              <button
                onClick={() => {
                  if (!user) return setShowAuthModal(true)
                  const wa = u.kontak_wa.replace(/\D/g, '')
                  const text = `Halo ${u.nama_usaha}! Saya tertarik dengan usaha Anda.`
                  window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, '_blank')
                }}
                className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg w-full"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Hubungi via WA
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">UMKM tidak ditemukan.</p>
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </div>
  )
}
