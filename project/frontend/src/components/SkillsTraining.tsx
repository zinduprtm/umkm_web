import React, { useState } from 'react';
import { BookOpen, Smartphone, DollarSign, TrendingUp, Clock, Users, Star, Play } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  students: number;
  rating: number;
  icon: React.ComponentType<{ className?: string }>;
  lessons: string[];
}

const SkillsTraining: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const categories = [
    { id: 'all', name: 'Semua Pelatihan', icon: BookOpen },
    { id: 'digital', name: 'Literasi Digital', icon: Smartphone },
    { id: 'marketing', name: 'Pemasaran Online', icon: TrendingUp },
    { id: 'finance', name: 'Manajemen Keuangan', icon: DollarSign }
  ];

  const courses: Course[] = [
    {
      id: '1',
      title: 'Cara Membuat Email dan WhatsApp Bisnis',
      description: 'Pelajari dasar-dasar komunikasi digital untuk usaha Anda',
      category: 'digital',
      duration: '2 jam',
      level: 'Pemula',
      students: 245,
      rating: 4.8,
      icon: Smartphone,
      lessons: [
        'Membuat akun email Gmail',
        'Mengatur WhatsApp Business',
        'Menulis pesan profesional',
        'Mengelola kontak pelanggan'
      ]
    },
    {
      id: '2',
      title: 'Pemasaran Produk di Media Sosial',
      description: 'Strategi sederhana untuk mempromosikan produk secara online',
      category: 'marketing',
      duration: '3 jam',
      level: 'Pemula',
      students: 189,
      rating: 4.7,
      icon: TrendingUp,
      lessons: [
        'Memilih platform yang tepat',
        'Membuat konten menarik',
        'Menggunakan hashtag efektif',
        'Berinteraksi dengan pelanggan'
      ]
    },
    {
      id: '3',
      title: 'Mencatat Keuangan Usaha Sederhana',
      description: 'Cara mudah mengelola keuangan usaha kecil tanpa ribet',
      category: 'finance',
      duration: '2.5 jam',
      level: 'Pemula',
      students: 312,
      rating: 4.9,
      icon: DollarSign,
      lessons: [
        'Membedakan modal dan keuntungan',
        'Mencatat pemasukan dan pengeluaran',
        'Menggunakan aplikasi keuangan sederhana',
        'Merencanakan tabungan usaha'
      ]
    },
    {
      id: '4',
      title: 'Menggunakan Aplikasi Marketplace',
      description: 'Panduan lengkap berjualan di Shopee, Tokopedia, dan platform lainnya',
      category: 'digital',
      duration: '4 jam',
      level: 'Menengah',
      students: 156,
      rating: 4.6,
      icon: Smartphone,
      lessons: [
        'Mendaftar sebagai penjual',
        'Mengupload foto produk',
        'Menentukan harga dan ongkir',
        'Menangani pesanan dan komplain'
      ]
    },
    {
      id: '5',
      title: 'Strategi Harga yang Menguntungkan',
      description: 'Cara menentukan harga jual yang tepat untuk produk Anda',
      category: 'finance',
      duration: '1.5 jam',
      level: 'Menengah',
      students: 278,
      rating: 4.5,
      icon: DollarSign,
      lessons: [
        'Menghitung biaya produksi',
        'Riset harga kompetitor',
        'Menentukan margin keuntungan',
        'Strategi diskon dan promo'
      ]
    },
    {
      id: '6',
      title: 'Membangun Jaringan Pelanggan',
      description: 'Tips mempertahankan pelanggan lama dan mendapatkan pelanggan baru',
      category: 'marketing',
      duration: '2 jam',
      level: 'Menengah',
      students: 203,
      rating: 4.8,
      icon: Users,
      lessons: [
        'Memberikan pelayanan terbaik',
        'Program loyalitas sederhana',
        'Mendapatkan referral',
        'Menangani feedback negatif'
      ]
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  if (selectedCourse) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => setSelectedCourse(null)}
          className="mb-6 text-emerald-600 hover:text-emerald-700 font-medium"
        >
          ← Kembali ke Daftar Pelatihan
        </button>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-8 text-white">
            <div className="flex items-center mb-4">
              <selectedCourse.icon className="h-12 w-12 mr-4" />
              <div>
                <h1 className="text-3xl font-bold mb-2">{selectedCourse.title}</h1>
                <p className="text-emerald-100">{selectedCourse.description}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {selectedCourse.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {selectedCourse.students} siswa
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 fill-current" />
                {selectedCourse.rating}
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Materi Pelatihan</h2>
            <div className="space-y-4">
              {selectedCourse.lessons.map((lesson, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-center w-8 h-8 bg-emerald-600 text-white rounded-full mr-4 text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="flex-1 text-gray-900">{lesson}</span>
                  <Play className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                Mulai Pelatihan
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Simpan untuk Nanti
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Pusat Pelatihan Keterampilan</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Tingkatkan kemampuan digital dan bisnis Anda dengan pelatihan praktis yang mudah dipahami
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300 shadow-md'
              }`}
            >
              <Icon className="h-5 w-5 mr-2" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => {
          const Icon = course.icon;
          return (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer overflow-hidden"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mr-4">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-2">
                      {course.level}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium text-gray-900">{course.rating}</span>
                  </div>
                  <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                    Mulai Belajar →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Tidak ada pelatihan dalam kategori ini</p>
        </div>
      )}
    </div>
  );
};

export default SkillsTraining;