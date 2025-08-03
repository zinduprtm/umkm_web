// src/components/Dashboard/UMKMDashboard.tsx
import React, { useState, useEffect } from 'react'
import {
  Store,
  ShoppingBag,
  Wrench,
  BarChart3,
  Plus,
  Edit,
  MessageCircle,
  Trash2
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useUMKMData } from '../../hooks/useUMKMData'
import type { UMKMProfile, Product, Service, Order } from '../../types'

const UMKMDashboard: React.FC = () => {
  const { userProfile } = useAuth()
  const userId = userProfile?.id

  const {
    profile,
    products,
    services,
    orders,
    loading,
    updateProfile,
    uploadImage,
    createProduct,
    updateProduct,
    deleteProduct,
    createService,
    updateService,
    deleteService
  } = useUMKMData(userId)

  const [tab, setTab] = useState<'overview'|'profile'|'products'|'services'|'orders'>('overview')
  const [editingProfile, setEditingProfile] = useState(false)
  const [formProf, setFormProf] = useState<Partial<UMKMProfile>>({})
  const [uploading, setUploading] = useState(false)
  // new: store chosen file name & uploaded URL
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  // sync formProf dengan profile dari DB
  useEffect(() => {
    if (profile) setFormProf(profile)
  }, [profile])

  // handler input change untuk semua field profil
  const onChangeProf = (
    e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormProf(prev => ({ ...prev, [name]: value }))
  }

  // simpan perubahan profil text
  const saveProf = async () => {
    await updateProfile(formProf)
    setEditingProfile(false)
  }

   // Handler file input
   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
     if (!e.target.files?.length) return;
     const file = e.target.files[0];
    // remember the raw file name
    setSelectedFileName(file.name);
     try {
       setUploading(true);
      const url = await uploadImage(file);
      // remember the public URL for preview
      setUploadedImageUrl(url);
       console.log('Uploaded image URL:', url);
     } catch (err) {
       console.error(err);
     } finally {
       setUploading(false);
     }
   };

  // inline edit untuk produk/jasa
  const onInlineEdit = async (
    id: string,
    cols: { key: string; label: string }[],
    row: any,
    updater: (id: string, upd: any) => Promise<void>
  ) => {
    const upd: any = {}
    cols.forEach(col => {
      const next = prompt(`Ubah ${col.label}`, row[col.key])
      if (next !== null && next !== row[col.key]) upd[col.key] = next
    })
    if (Object.keys(upd).length) await updater(id, upd)
  }

  // Overview cards
  const renderOverview = () => {
    const stats = [
      { label: 'Nama Usaha',        value: profile?.nama_usaha ?? '-', icon: Store,         color: 'bg-orange-500' },
      { label: 'Total Produk',      value: products.length.toString(),   icon: ShoppingBag,  color: 'bg-blue-500'   },
      { label: 'Total Jasa',        value: services.length.toString(),   icon: Wrench,       color: 'bg-green-500'  },
      { label: 'Pesanan Bulan Ini', value: orders.length.toString(),     icon: MessageCircle,color: 'bg-purple-500'},
    ]
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center">
                  <div className={`${s.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">{s.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Profil Usaha
  const profileFields = [
    { key: 'nama_usaha',      label: 'Nama Usaha',      type: 'text'     },
    { key: 'deskripsi',       label: 'Deskripsi',       type: 'textarea' },
    { key: 'jenis',           label: 'Jenis Usaha',     type: 'select', options: ['produk','jasa','keduanya'] },
    { key: 'lokasi',          label: 'Lokasi',          type: 'text'     },
    { key: 'alamat_lengkap',  label: 'Alamat Lengkap',  type: 'textarea' },
    { key: 'kontak_wa',       label: 'WhatsApp',        type: 'text'     },
    { key: 'media_sosial',    label: 'Media Sosial',    type: 'text'     },
    { key: 'jam_operasional', label: 'Jam Operasional', type: 'text'     },
  ]

// In your UMKMDashboard.tsx, replace your existing renderProfile block with this:

const renderProfile = () => (
  <div className="bg-white rounded-xl shadow p-6 space-y-6">
    {/* Header */}
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Profil Usaha</h2>
      <button
        onClick={() => setEditingProfile(e => !e)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center"
      >
        <Edit className="h-4 w-4 mr-2" />
        {editingProfile ? 'Batal' : 'Edit Profil'}
      </button>
    </div>

    {/* Form fields */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {profileFields.map(f => (
        <div key={f.key}>
          <label className="block text-sm text-gray-700 mb-1">{f.label}</label>
          {f.type === 'textarea' ? (
            <textarea
              name={f.key}
              value={(formProf as any)[f.key] ?? ''}
              onChange={onChangeProf}
              disabled={!editingProfile}
              rows={3}
              className="w-full border-gray-300 rounded p-2"
            />
          ) : f.type === 'select' ? (
            <select
              name={f.key}
              value={(formProf as any)[f.key] ?? ''}
              onChange={onChangeProf}
              disabled={!editingProfile}
              className="w-full border-gray-300 rounded p-2"
            >
              {f.options!.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              name={f.key}
              value={(formProf as any)[f.key] ?? ''}
              onChange={onChangeProf}
              disabled={!editingProfile}
              className="w-full border-gray-300 rounded p-2"
            />
          )}
        </div>
      ))}

      {/* Foto Usaha */}
      <div>
        <label className="block text-sm text-gray-700 mb-1">Foto Usaha</label>
        {profile?.foto_usaha && (
          <img
            src={profile.foto_usaha}
            alt="Foto Usaha"
            className="mb-2 max-h-40 w-full object-cover rounded-lg"
          />
        )}
        <input
          type="file"
          accept="image/*"
          disabled={!editingProfile || uploading}
          onChange={handleFileChange}
          className="w-full"
        />
        {/* show chosen file name */}
        {selectedFileName && !uploading && (
          <p className="mt-2 text-sm text-green-600">
            File “<strong>{selectedFileName}</strong>” berhasil dipilih!
          </p>
        )}
        {/* preview uploaded image */}
        {uploadedImageUrl && (
          <img
            src={uploadedImageUrl}
            alt="Preview Usaha"
            className="mt-2 max-h-40 w-full object-cover rounded-lg"
          />
        )}
        {uploading && <p className="text-sm text-gray-500">Uploading…</p>}
      </div>
    </div>

    {/* Tombol Simpan */}
    {editingProfile && (
      <div className="flex justify-end">
        <button
          onClick={saveProf}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
        >
          Simpan
        </button>
      </div>
    )}
  </div>
)

  // Generic table renderer
  const renderTable = (
    data: any[],
    cols: { key: string; label: string }[],
    onCreate: () => void,
    onUpdate: (id: string, upd: any) => void,
    onDelete: (id: string) => void,
    title: string,
    createLabel: string
  ) => (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button onClick={onCreate} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="h-4 w-4 mr-2" />{createLabel}
        </button>
      </div>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            {cols.map(c => <th key={c.key} className="p-2 text-left">{c.label}</th>)}
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={cols.length + 1} className="p-4 text-center text-gray-500">Belum ada data</td>
            </tr>
          )}
          {data.map(row => (
            <tr key={row.id} className="border-t">
              {cols.map(c => (
                <td key={c.key} className="p-2">{row[c.key] ?? '-'}</td>
              ))}
              <td className="p-2 space-x-2">
                <button
                  onClick={() => onInlineEdit(row.id, cols, row, onUpdate)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-4 w-4 inline" />
                </button>
                <button
                  onClick={() => window.confirm('Yakin hapus?') && onDelete(row.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4 inline" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // render sesuai tab
  const renderContent = () => {
    if (loading) return <p>Loading…</p>
    switch (tab) {
      case 'overview': return renderOverview()
      case 'profile':  return renderProfile()
      case 'products':
        return renderTable(
          products,
          [
            { key: 'nama',     label: 'Nama Produk' },
            { key: 'harga',    label: 'Harga'     },
            { key: 'kategori', label: 'Kategori'  },
            { key: 'stok',     label: 'Stok'      },
          ],
          () => {
            const nama = prompt('Nama produk:')
            const harga = prompt('Harga:')
            if (nama && harga) createProduct({ nama, deskripsi: '', harga: +harga, kategori: '', stok: 0 })
          },
          updateProduct,
          deleteProduct,
          'Produk Saya',
          'Tambah Produk'
        )
      case 'services':
        return renderTable(
          services,
          [
            { key: 'nama',  label: 'Nama Jasa' },
            { key: 'tarif', label: 'Tarif'     },
            { key: 'kategori', label: 'Kategori' },
          ],
          () => {
            const nama = prompt('Nama jasa:')
            const tarif = prompt('Tarif:')
            if (nama && tarif) createService({ nama, deskripsi: '', tarif: +tarif, kategori: '' })
          },
          updateService,
          deleteService,
          'Jasa Saya',
          'Tambah Jasa'
        )
      case 'orders':
        return (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Pesanan</h2>
            <ul className="space-y-3">
              {orders.map(o => (
                <li key={o.id} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{o.item_name} ×{o.quantity}</p>
                    <p className="text-sm text-gray-600">{o.nama_pemesan}</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">{o.status}</span>
                </li>
              ))}
              {orders.length === 0 && <p className="text-gray-500">Belum ada pesanan.</p>}
            </ul>
          </div>
        )
      default:
        return null
    }
  }

  if (!userId) return null

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard UMKM</h1>
        <p className="text-gray-600 mt-1">Selamat datang, {userProfile?.name}!</p>
      </div>
      <nav className="flex space-x-6 bg-white rounded-xl shadow mb-6 px-6 py-3">
        {['overview','profile','products','services','orders'].map(id => {
          const labelMap: Record<string,string> = {
            overview: 'Overview',
            profile:  'Profil Usaha',
            products: 'Produk Saya',
            services: 'Jasa Saya',
            orders:   'Pesanan'
          }
          return (
            <button
              key={id}
              onClick={() => setTab(id as any)}
              className={`font-medium text-sm pb-1 ${
                tab === id
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {labelMap[id]}
            </button>
          )
        })}
      </nav>
      {renderContent()}
    </div>
  )
}

export default UMKMDashboard
