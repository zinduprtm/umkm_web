import React from 'react';
import { BookOpen, ShoppingBag, MessageCircle, TrendingUp, Users, Heart } from 'lucide-react';

type Section = 'dashboard' | 'home' | 'skills' | 'catalog' | 'forum';

interface HeroProps {
  onNavigate: (section: Section) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: BookOpen,
      title: 'Pelatihan Keterampilan',
      description: 'Pelajari literasi digital, pemasaran online, dan manajemen keuangan dasar',
      action: () => onNavigate('skills'),
      color: 'bg-blue-500'
    },
    {
      icon: ShoppingBag,
      title: 'Katalog Produk & Jasa',
      description: 'Jelajahi berbagai produk dan jasa berkualitas dari UMKM lokal',
      action: () => onNavigate('catalog'),
      color: 'bg-emerald-500'
    },
    {
      icon: MessageCircle,
      title: 'Forum Komunitas',
      description: 'Berbagi pengalaman, tips, dan saling mendukung sesama wirausaha',
      action: () => onNavigate('forum'),
      color: 'bg-orange-500'
    }
  ];

  const stats = [
    { icon: Users, number: '2,500+', label: 'UMKM Terdaftar' },
    { icon: TrendingUp, number: '1,200+', label: 'Pelatihan Diselesaikan' },
    { icon: Heart, number: '850+', label: 'Diskusi Komunitas' }
  ];

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Memberdayakan 
            <span className="text-emerald-600"> UMKM</span>
            <br />
            <span className="text-blue-600">Sektor Informal</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Platform digital yang dirancang khusus untuk UMKM informal dan pekerja migran. 
            Tingkatkan keterampilan, perluas jaringan, dan kembangkan usaha Anda bersama komunitas yang peduli.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => onNavigate('skills')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Mulai Belajar Sekarang
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className="bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Jelajahi Katalog
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
                  <Icon className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                onClick={feature.action}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-lg mb-6`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                  Pelajari Lebih Lanjut →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;