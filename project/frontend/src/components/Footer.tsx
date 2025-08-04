import React from 'react';
import { Users, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-emerald-400" />
              <span className="ml-2 text-2xl font-bold">UMKM Berdaya</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Platform digital untuk memberdayakan UMKM sektor informal dan pekerja migran. 
              Bersama-sama membangun ekosistem bisnis yang kuat dan berkelanjutan.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Fitur Utama</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Pelatihan Keterampilan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Direktori UMKM
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Forum Komunitas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Bantuan & Tutorial
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-emerald-400 mr-3" />
                <span className="text-gray-300">info@umkmberdaya.id</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-emerald-400 mr-3" />
                <span className="text-gray-300">0800-1234-5678</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-emerald-400 mr-3" />
                <span className="text-gray-300">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 UMKM Berdaya. Seluruh hak cipta dilindungi.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                Bantuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;