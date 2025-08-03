import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Reply, Clock, User, Plus, Search, Tag, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useForumPosts } from '../hooks/useForumPosts';
import AuthModal from './AuthModal';

const CommunityForum: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { user } = useAuth();
  const { posts, loading, addPost, searchPosts } = useForumPosts();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'business',
    tags: '',
    status: 'open' as 'open' | 'solved' | 'urgent'
  });

  const categories = [
    { id: 'all', name: 'Semua Topik', icon: MessageCircle },
    { id: 'business', name: 'Tips Bisnis', icon: TrendingUp },
    { id: 'tech', name: 'Teknologi', icon: Plus },
    { id: 'marketing', name: 'Pemasaran', icon: Tag },
    { id: 'finance', name: 'Keuangan', icon: CheckCircle }
  ];

  React.useEffect(() => {
    if (searchTerm || selectedCategory !== 'all') {
      searchPosts(searchTerm, selectedCategory);
    }
  }, [searchTerm, selectedCategory]);

  const handleNewPost = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setShowNewPostForm(true);
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const postData = {
      title: formData.title,
      content: formData.content,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      status: formData.status,
      author_id: '', // Will be set by the hook
      author_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
    };

    const { error } = await addPost(postData);
    if (!error) {
      setShowNewPostForm(false);
      setFormData({
        title: '',
        content: '',
        category: 'business',
        tags: '',
        status: 'open'
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Baru saja';
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} hari yang lalu`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'solved': return 'bg-green-100 text-green-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'solved': return CheckCircle;
      case 'urgent': return AlertCircle;
      default: return MessageCircle;
    }
  };

  const NewPostForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Buat Diskusi Baru</h2>
            <button
              onClick={() => setShowNewPostForm(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmitPost} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul Diskusi</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Contoh: Cara meningkatkan penjualan online..."
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
              <option>Tips Bisnis</option>
              <option>Teknologi</option>
              <option>Pemasaran</option>
              <option>Keuangan</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Isi Diskusi</label>
            <textarea
              rows={6}
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Jelaskan pertanyaan atau topik diskusi Anda..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tag (pisahkan dengan koma)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="online, penjualan, tips"
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Posting Diskusi
            </button>
            <button
              type="button"
              onClick={() => setShowNewPostForm(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (selectedPost) {
    const StatusIcon = getStatusIcon(selectedPost.status);
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => setSelectedPost(null)}
          className="mb-6 text-emerald-600 hover:text-emerald-700 font-medium"
        >
          ← Kembali ke Forum
        </button>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPost.status)} mr-3`}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {selectedPost.status === 'solved' ? 'Terpecahkan' : selectedPost.status === 'urgent' ? 'Urgent' : 'Terbuka'}
                </span>
                <span className="text-sm text-gray-500">{formatTimestamp(selectedPost.created_at)}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-gray-400 mr-2" />
            <span className="font-medium text-gray-900">{selectedPost.author_name}</span>
          </div>
          
          <p className="text-gray-700 mb-6 leading-relaxed">{selectedPost.content}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedPost.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <button className="flex items-center hover:text-emerald-600 transition-colors">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {selectedPost.likes} Suka
              </button>
              <span className="flex items-center">
                <Reply className="h-4 w-4 mr-1" />
                {selectedPost.reply_count} Balasan
              </span>
            </div>
          </div>
        </div>
        
        {/* Replies */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Balasan (0)</h2>
          <div className="text-center py-8 text-gray-500">
            Belum ada balasan. Jadilah yang pertama memberikan tanggapan!
          </div>
        </div>
        
        {/* Reply Form */}
        {user ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tambah Balasan</h3>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 mb-4"
              placeholder="Tulis balasan Anda..."
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Kirim Balasan
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-gray-600 mb-4">Masuk untuk memberikan balasan</p>
            <button 
              onClick={() => setShowAuthModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Masuk / Daftar
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Forum Komunitas</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Berbagi pengalaman, bertanya, dan saling membantu sesama pelaku UMKM
        </p>
      </div>

      {/* Search and New Post */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari diskusi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <button
            onClick={handleNewPost}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Diskusi Baru
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

      {/* Posts */}
      {loading ? (
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => {
          const StatusIcon = getStatusIcon(post.status);
          return (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)} mr-3`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {post.status === 'solved' ? 'Terpecahkan' : post.status === 'urgent' ? 'Urgent' : 'Terbuka'}
                    </span>
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500">{formatTimestamp(post.created_at)}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h2>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
              
              <div className="flex items-center mb-4">
                <User className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-700">{post.author_name}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 4).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{post.tags.length - 4}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {post.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.reply_count} balasan
                  </span>
                </div>
                <span className="text-emerald-600 font-medium">Baca selengkapnya →</span>
              </div>
            </div>
          );
        })}
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Tidak ada diskusi yang sesuai dengan pencarian Anda</p>
        </div>
      )}

      {showNewPostForm && <NewPostForm />}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode="register"
      />
    </div>
  );
};

export default CommunityForum;