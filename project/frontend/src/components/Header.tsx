import React from 'react';
import { Users, BookOpen, Store, MessageCircle, Menu, X, User, LogIn, Settings, ShoppingBag } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';
import UserProfile from './UserProfile';

type Section = 'home' | 'skills' | 'directory' | 'forum' | 'dashboard' | 'catalog';

interface HeaderProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const { user, userProfile, loading } = useAuth();

  const navItems = [
    { id: 'home' as Section, label: 'Beranda', icon: Users },
    { id: 'catalog' as Section, label: 'Katalog', icon: ShoppingBag },
    { id: 'skills' as Section, label: 'Pelatihan', icon: BookOpen },
    { id: 'forum' as Section, label: 'Forum Komunitas', icon: MessageCircle },
  ];

  const getDashboardItems = () => {
    if (!userProfile) return [];
    
    const items = [];
    
    if (userProfile.role === 'admin' || userProfile.role === 'umkm') {
      items.push({ id: 'dashboard' as Section, label: 'Dashboard', icon: Settings });
    }
    
    return items;
  };

  const allNavItems = [...navItems, ...getDashboardItems()];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Users className="h-8 w-8 text-emerald-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">UMKM Berdaya</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="max-w-24 truncate">
                  {userProfile?.name || user.email?.split('@')[0]}
                  {userProfile?.role && (
                    <span className="ml-1 text-xs text-emerald-600">
                      ({userProfile.role})
                    </span>
                  )}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Masuk</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {allNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      activeSection === item.id
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                );
              })}
              
              {/* Mobile Auth */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                {loading ? (
                  <div className="px-3 py-2">
                    <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                ) : user ? (
                  <button
                    onClick={() => {
                      setShowProfile(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
                  >
                    <User className="h-5 w-5 mr-3" />
                    <span className="truncate">
                      {userProfile?.name || user.email?.split('@')[0]}
                      {userProfile?.role && (
                        <span className="ml-1 text-xs text-emerald-600">
                          ({userProfile.role})
                        </span>
                      )}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                  >
                    <LogIn className="h-5 w-5 mr-3" />
                    Masuk / Daftar
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      <UserProfile 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />
    </header>
  );
};

export default Header;