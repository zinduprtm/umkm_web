import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_supabase_project_url') || supabaseAnonKey.includes('your_supabase_anon_key')) {
  console.warn('Supabase environment variables not configured. Using demo mode.');
  // Create a mock client for demo purposes
  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: () => Promise.resolve({ data: null, error: { message: 'Demo mode - Supabase not configured' } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Demo mode - Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          single: () => Promise.resolve({ data: null, error: { code: 'DEMO_MODE' } }),
          order: () => Promise.resolve({ data: [], error: null })
        }),
        order: () => Promise.resolve({ data: [], error: null }),
        or: () => ({ order: () => Promise.resolve({ data: [], error: null }) })
      }),
      insert: () => ({ 
        select: () => ({ 
          single: () => Promise.resolve({ data: null, error: { message: 'Demo mode - Supabase not configured' } })
        })
      }),
      update: () => ({ 
        eq: () => Promise.resolve({ error: { message: 'Demo mode - Supabase not configured' } })
      })
    })
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };



// Database types
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  phone: string;
  hours: string;
  services: string[];
  owner_id: string;
  owner_name: string;
  image_url?: string;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  lessons: string[];
  instructor: string;
  rating: number;
  student_count: number;
  created_at: string;
  updated_at: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  status: 'open' | 'solved' | 'urgent';
  author_id: string;
  author_name: string;
  likes: number;
  reply_count: number;
  created_at: string;
  updated_at: string;
}

export interface ForumReply {
  id: string;
  post_id: string;
  content: string;
  author_id: string;
  author_name: string;
  likes: number;
  created_at: string;
  updated_at: string;
}