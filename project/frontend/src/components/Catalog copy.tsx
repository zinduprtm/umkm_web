import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, ShoppingBag, Wrench, Phone, MessageCircle, Heart } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';

interface CatalogItem {
  id: string;
  type: 'product' | 'service';
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  umkm: {
    id: string;
    name: string;
    location: string;
    whatsapp: string;
    rating: number;
    reviews: number;
  };
}

const Catalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState<'all' | 'product' | 'service'>('all');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const { user } = useAuth();

  const categories = [
    { id: 'all', name: 'Semua Kategori' },
    { id: 'makanan', name: 'Makanan & Minuman' },
    { id: 'fashion', name: 'Fashion & Aksesoris' },
    { id: 'kerajinan', name: 'Kerajinan Tangan' },
    { id: 'elektronik', name: 'Elektronik' },
    { id: 'otomotif', name: 'Otomotif' },
    { id: 'kesehatan', name: 'Kesehatan & Kecantikan' },
    { id: 'pendidikan', name: 'Pendidikan' },
    { id: 'rumah', name: 'Rumah & Taman' },
  ];

  const locations = [
    { id: 'all', name: 'Semua Lokasi' },
    { id: 'jakarta', name: 'Jakarta' },
    { id: 'bandung', name: 'Bandung' },
    { id: 'surabaya', name: 'Surabaya' },
    { id: 'yogyakarta', name: 'Yogyakarta' },
    { id: 'medan', name: 'Medan' },
  ];

  // Sample data - in real app, this would come from API
  const catalogItems: CatalogItem[] = [
    {
      id: '1',
      type: 'product',
      name: 'Nasi Gudeg Spesial',
      description: 'Gudeg khas Yogyakarta dengan cita rasa autentik, dilengkapi ayam dan telur',
      price: 25000,
      category: 'makanan',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      umkm: {
        id: '1',
        name: 'Warung Bu Sari',
        location: 'Yogyakarta',
        whatsapp: '081234567890',
        rating: 4.8,
        reviews: 127
      }
    },
    {
      id: '2',
      type: 'service',
      name: 'Servis AC & Kulkas',
      description: 'Jasa servis dan perbaikan AC, kulkas, dan peralatan elektronik rumah tangga',
      price: 75000,
      category: 'rumah',
      image: 'https://images.pexels.com/photos/190537/pexels-photo-190537.jpeg',
      umkm: {
        id: '2',
        name: 'Bengkel Elektronik Pak Budi',
        location: 'Jakarta',
        whatsapp: '081987654321',
        rating: 4.6,
        reviews: 89
      }
    },
    {
      id: '3',
      type: 'product',
      name: 'Tas Rajut Handmade',
      description: 'Tas rajut buatan tangan dengan berbagai motif dan warna menarik',
      price: 150000,
      category: 'kerajinan',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
      umkm: {
        id: '3',
        name: 'Kerajinan Ibu Ani',
        location: 'Bandung',
        whatsapp: '081122334455',
        rating: 4.9,
        reviews: 203
      }
    },
  ];

  const filteredItems = catalogItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.umkm.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || 
                           item.umkm.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesType && matchesLocation;
  });

  const handleWhatsAppOrder = (item: CatalogItem) => {
    const message = `Halo ${item.umkm.name}! Saya tertarik dengan ${item.type === 'product' ? 'produk' : 'jasa'} "${item.name}" dengan harga Rp ${item.price.toLocaleString('id-ID')}. Bisakah saya mendapatkan informasi lebih lanjut?`;
    const whatsappUrl = `https://wa.me/${item.umkm.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToFavorites = (item: CatalogItem) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Add to favorites logic here
    console.log('Added to favorites:', item.name);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Katalog Produk & Jasa UMKM</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Temukan berbagai produk dan jasa berkualitas dari UMKM lokal di seluruh Indonesia
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk, jasa, atau UMKM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as 'all' | 'product' | 'service')}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">Semua Jenis</option>
            <option value="product">Produk</option>
            <option value="service">Jasa</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {locations.map(location => (
              <option key={location.id} value={location.id}>{location.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Menampilkan {filteredItems.length} hasil
          </p>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Filter aktif: {
              [selectedType !== 'all' && selectedType, 
               selectedCategory !== 'all' && selectedCategory,
               selectedLocation !== 'all' && selectedLocation]
               .filter(Boolean).length
            }</span>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.type === 'product' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {item.type === 'product' ? (
                    <>
                      <ShoppingBag className="inline h-3 w-3 mr-1" />
                      Produk
                    </>
                  ) : (
                    <>
                      <Wrench className="inline h-3 w-3 mr-1" />
                      Jasa
                    </>
                  )}
                </span>
              </div>
              <button
                onClick={() => handleAddToFavorites(item)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
              >
                <Heart className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
              </div>

              <div className="mb-4">
                <div className="text-2xl font-bold text-emerald-600 mb-2">
                  Rp {item.price.toLocaleString('id-ID')}
                </div>
                <div className="text-sm text-gray-500">
                  {item.type === 'service' && 'Mulai dari'}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{item.umkm.name}</h4>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{item.umkm.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({item.umkm.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {item.umkm.location}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleWhatsAppOrder(item)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Pesan via WA
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Phone className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Tidak ada produk atau jasa yang sesuai dengan pencarian Anda</p>
          <p className="text-gray-400 mt-2">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      )}

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode="register"
      />
    </div>
  );
};

export default Catalog;