import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User as AppUser, UserRole } from '../types';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchUserProfile(session.user.id);
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (authId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', authId)
        .single();
      console.log('🔍 fetchUserProfile data:', data);
      console.log('🔍 fetchUserProfile error:', error);
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
        return;
      }

      setUserProfile(data);
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const signUp = async (email: string, password: string, name: string, phone?: string,  role: UserRole = 'pengunjung') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      name,
      phone,
      role
    });

    if (data.user && !error) {
      // Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert([{
          auth_id: data.user.id,
          name,
          email,
          phone,
          role
        }]);

      if (profileError) {
        console.error('Error creating user profile:', profileError);
      }
    }

    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    toast.success("Anjay udh logout!")
    setUserProfile(null);
    return { error };
  };

  return {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    fetchUserProfile,
  };
};