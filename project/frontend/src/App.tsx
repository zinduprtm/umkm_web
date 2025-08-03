import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import SkillsTraining from './components/SkillsTraining';
import CommunityForum from './components/CommunityForum';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import UMKMDashboard from './components/Dashboard/UMKMDashboard';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Section = 'home' | 'skills' | 'catalog' | 'forum' | 'dashboard';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const { userProfile } = useAuth();

  const renderContent = () => {
    switch (activeSection) {
      case 'skills':
        return <SkillsTraining />;
      case 'catalog':
        return <Catalog />;
      case 'forum':
        return <CommunityForum />;
      case 'dashboard':
        if (userProfile?.role === 'admin') {
          return <AdminDashboard />;
        } else if (userProfile?.role === 'umkm') {
          return <UMKMDashboard />;
        } else {
          return <Hero onNavigate={setActiveSection} />;
        }
      default:
        return <Hero onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer/>

      <Header activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="pt-16">
        {renderContent()}
      </main>
      {activeSection !== 'dashboard' && <Footer />}
    </div>
  );
}

export default App;