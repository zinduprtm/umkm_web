import { useState, useEffect } from 'react';
import { supabase, Business } from '../lib/supabase';

export const useBusinesses = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBusinesses(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addBusiness = async (business: Omit<Business, 'id' | 'created_at' | 'updated_at' | 'rating' | 'review_count'>) => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .insert([business])
        .select()
        .single();

      if (error) throw error;
      setBusinesses(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const searchBusinesses = async (searchTerm: string, category?: string) => {
    try {
      let query = supabase
        .from('businesses')
        .select('*');

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setBusinesses(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return {
    businesses,
    loading,
    error,
    addBusiness,
    searchBusinesses,
    refetch: fetchBusinesses,
  };
};