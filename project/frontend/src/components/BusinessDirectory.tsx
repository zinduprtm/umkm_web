import React, { useState } from 'react';
import { Search, MapPin, Phone, Clock, Star, Filter, Plus, Store, Utensils, Wrench, Truck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useBusinesses } from '../hooks/useBusinesses';
import AuthModal from './AuthModal';

const BusinessDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();
  const { businesses, loading, addBusiness, searchBusinesses } = useBusinesses();
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'food',
    description: '',
    location: '',
    phone: '',
    hours: '',
    services: ''
  });

  const categories = [
    { id: 'all', name: 'Semua Kategori', icon: Store },
    { id: 'food', name: 'Makanan & Minuman', icon: Utensils },
    { id: 'services', name: 'Jasa', icon: Wrench },
    { id: 'transport', name: 'Transportasi', icon: Truck }
  ];

  React.useEffect(() => {
    if (searchTerm || selectedCategory !== 'all') {
      searchBusinesses(searchTerm, selectedCategory);
    }
  }, [searchTerm, selectedCategory]);

  const handleAddBusiness = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setShowAddForm(true);
  };

  const handleSubmitBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const businessData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      phone: formData.phone,
      hours: formData.hours,
      services: formData.services.split(',').map(s => s.trim()).filter(s => s),
      owner_id: '', // Will be set by the hook
      owner_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
      image_url: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg`
    };

    const { error } = await addBusiness(businessData);
    if (!error) {
      setShowAddForm(false);
      setFormData({
        name: '',
        category: 'food',
        description: '',
        location: '',
        phone: '',
        hours: '',
        services: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const AddBusinessForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Daftarkan Usaha Anda</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmitBusiness} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Usaha</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Contoh: Warung Nasi Bu Ani"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option>Makanan & Minuman</option>
              <option>Jasa</option>
              <option>Transportasi</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Usaha</label>
            <textarea
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Jelaskan usaha Anda secara singkat..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Alamat atau area layanan"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nomor WhatsApp</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="08XX-XXXX-XXXX"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jam Operasional</label>
            <input
              type="text"
              name="hours"
              value={formData.hours}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Contoh: 08:00 - 17:00"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Layanan (pisahkan dengan koma)</label>
            <input
              type="text"
              name="services"
              value={formData.services}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Contoh: Delivery, Takeaway, Dine-in"
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Daftarkan Usaha
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Direktori UMKM Lokal</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Temukan usaha dan jasa lokal di sekitar Anda, atau daftarkan usaha Anda sendiri
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama usaha atau layanan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <button
            onClick={handleAddBusiness}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Daftar Usaha
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Business Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((business) => (
          <div key={business.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img
                src={business.image_url || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                alt={business.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">{business.name}</h3>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{business.rating}</span>
                  <span className="text-gray-500 ml-1">({business.review_count})</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{business.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{business.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{business.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{business.hours}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {business.services.slice(0, 3).map((service, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                  {business.services.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      +{business.services.length - 3} lainnya
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/${business.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-center font-semibold transition-colors"
                >
                  WhatsApp
                </a>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Detail
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {!loading && businesses.length === 0 && (
        <div className="text-center py-12">
          <Store className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Tidak ada usaha yang sesuai dengan pencarian Anda</p>
        </div>
      )}

      {showAddForm && <AddBusinessForm />}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode="register"
      />
    </div>
  );
};

export default BusinessDirectory;