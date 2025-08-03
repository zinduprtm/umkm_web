// src/components/Dashboard/AdminDashboard.tsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAdminData } from '../../hooks/useAdminData';
import {
  Users,
  Store,
  ShoppingBag,
  Wrench,
  Calendar,
  BarChart3,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview'|'umkm'|'users'|'products'|'services'|'courses'>('overview');
  const {
    umkms,
    users,
    courses,
    products,
    services,
    loading: adminLoading,
    deleteUser,
    deleteUmkm,
    deleteCourse,
    createCourse,
    updateUser,
    updateUmkm,
    updateCourse
  } = useAdminData();

  // State untuk inline‐editing
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Record<string, any>>({});

  const tabs = [
    { id: 'overview',  label: 'Overview',      icon: BarChart3 },
    { id: 'umkm',      label: 'Kelola UMKM',   icon: Store },
    { id: 'users',     label: 'Kelola User',   icon: Users },
    { id: 'products',  label: 'Kelola Produk', icon: ShoppingBag },
    { id: 'services',  label: 'Kelola Jasa',   icon: Wrench },
    { id: 'courses',   label: 'Pelatihan',     icon: Calendar },
  ];

  const stats = [
    {
      label: 'Total UMKM',
      value: adminLoading ? '...' : umkms.length.toString(),
      icon: Store,
      color: 'bg-blue-500'
    },
    {
      label: 'Total Produk',
      value: adminLoading ? '...' : products.length.toString(),
      icon: ShoppingBag,
      color: 'bg-green-500'
    },
    {
      label: 'Total Jasa',
      value: adminLoading ? '...' : services.length.toString(),
      icon: Wrench,
      color: 'bg-purple-500'
    },
    {
      label: 'Total User',
      value: adminLoading ? '...' : users.length.toString(),
      icon: Users,
      color: 'bg-orange-500'
    },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* UMKM Terbaru & Aktivitas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">UMKM Terbaru</h3>
          <div className="space-y-3">
            {[...umkms.slice(-3)].reverse().map(u => (
              <div key={u.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{u.nama_usaha}</p>
                  <p className="text-sm text-gray-600">{u.jenis}</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Aktif
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            {['UMKM baru mendaftar','Produk baru ditambahkan','User baru mendaftar'].slice(0,3).map((text, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm text-gray-900">{text}</p>
                  <p className="text-xs text-gray-500">Baru saja</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTable = (
    data: any[],
    columns: { key: string; label: string }[],
    onDelete: (id: string) => void,
    onEdit?: (id: string, updates: any) => void
  ) => (
    <table className="min-w-full bg-white shadow rounded">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key} className="px-4 py-2 text-left font-medium">
              {col.label}
            </th>
          ))}
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => {
          const isEditing = row.id === editingRowId;
          return (
            <tr key={row.id} className="border-t">
              {columns.map(col => (
                <td key={col.key} className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-2 py-1"
                      value={editForm[col.key] ?? ''}
                      onChange={e =>
                        setEditForm(prev => ({
                          ...prev,
                          [col.key]: e.target.value
                        }))
                      }
                    />
                  ) : (
                    row[col.key] ?? '-'
                  )}
                </td>
              ))}
              <td className="px-4 py-2 flex space-x-2">
                {onEdit && !isEditing && (
                  <button
                    onClick={() => {
                      setEditingRowId(row.id);
                      const init: Record<string, any> = {};
                      columns.forEach(col => {
                        init[col.key] = row[col.key] ?? '';
                      });
                      setEditForm(init);
                    }}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4 mr-1" />Edit
                  </button>
                )}
                {onEdit && isEditing && (
                  <>
                    <button
                      onClick={() => {
                        onEdit(editingRowId!, editForm);
                        setEditingRowId(null);
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingRowId(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    if (window.confirm('Yakin ingin menghapus item ini?')) {
                      onDelete(row.id);
                    }
                  }}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4 mr-1" />Hapus
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();

      case 'umkm':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Kelola UMKM</h2>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center">
                <Plus className="h-4 w-4 mr-2" />Tambah UMKM
              </button>
            </div>
            {adminLoading
              ? <p>Loading…</p>
              : renderTable(
                  umkms,
                  [
                    { key: 'nama_usaha', label: 'Nama Usaha' },
                    { key: 'jenis',      label: 'Jenis' },
                    { key: 'lokasi',     label: 'Lokasi' },
                    { key: 'kontak_wa',  label: 'Kontak WA' },
                  ],
                  deleteUmkm,
                  updateUmkm
                )}
          </div>
        );

      case 'users':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Kelola User</h2>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center">
                <Plus className="h-4 w-4 mr-2" />Tambah User
              </button>
            </div>
            {adminLoading
              ? <p>Loading…</p>
              : renderTable(
                  users,
                  [
                    { key: 'name',  label: 'Nama Lengkap' },
                    { key: 'email', label: 'Email' },
                    { key: 'role',  label: 'Role' },
                  ],
                  deleteUser,
                  updateUser
                )}
          </div>
        );

      case 'courses':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Pelatihan</h2>
              <button
                onClick={() => {
                  const judul = prompt('Judul pelatihan:');
                  const tanggal_mulai = prompt('Tanggal mulai (YYYY-MM-DD):');
                  if (judul && tanggal_mulai) {
                    createCourse({ judul, deskripsi: '', tanggal_mulai });
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />Tambah Pelatihan
              </button>
            </div>
            {adminLoading
              ? <p>Loading…</p>
              : renderTable(
                  courses,
                  [
                    { key: 'title',          label: 'Judul' },
                    { key: 'category',       label: 'Kategori' },
                    { key: 'duration',       label: 'Durasi' },
                    { key: 'level',          label: 'Level' },
                    { key: 'lesson',         label: 'Materi' },
                    { key: 'instructor',     label: 'Instructor' },
                  ],
                  deleteCourse,
                  updateCourse
                )}
          </div>
        );

      default:
        const tab = tabs.find(t => t.id === activeTab);
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{tab?.label}</h2>
            <div className="text-center py-12 text-gray-500">
              Fitur ini akan segera tersedia
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-600 mt-2">
          Selamat datang, {userProfile?.name}! Kelola platform UMKM dari sini.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => {
              if (tab.id === 'users' && userProfile?.role !== 'admin') {
                return null;
              }
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;
