import { useState, useEffect } from 'react';
import { supabase, ForumPost, ForumReply } from '../lib/supabase';

export const useForumPosts = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (post: Omit<ForumPost, 'id' | 'created_at' | 'updated_at' | 'likes' | 'reply_count'>) => {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .insert([post])
        .select()
        .single();

      if (error) throw error;
      setPosts(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const searchPosts = async (searchTerm: string, category?: string) => {
    try {
      let query = supabase
        .from('forum_posts')
        .select('*');

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    addPost,
    searchPosts,
    refetch: fetchPosts,
  };
};

export const useForumReplies = (postId: string) => {
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReplies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('forum_replies')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setReplies(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addReply = async (reply: Omit<ForumReply, 'id' | 'created_at' | 'updated_at' | 'likes'>) => {
    try {
      const { data, error } = await supabase
        .from('forum_replies')
        .insert([reply])
        .select()
        .single();

      if (error) throw error;
      setReplies(prev => [...prev, data]);
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  useEffect(() => {
    if (postId) {
      fetchReplies();
    }
  }, [postId]);

  return {
    replies,
    loading,
    error,
    addReply,
    refetch: fetchReplies,
  };
};