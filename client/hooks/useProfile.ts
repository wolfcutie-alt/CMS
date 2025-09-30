import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';

export interface Profile {
  id: number;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getUser();
      setProfile(response.user as Profile);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<{ name: string; email: string; password: string; current_password: string }>) => {
    try {
      setLoading(true);
      setError(null);
      console.log('useProfile: Updating profile with data:', data);
      const updated = await apiClient.updateProfile(data);
      console.log('useProfile: Profile update response:', updated);
      
      // Update the profile state with the returned data
      if (updated) {
        setProfile(prev => ({
          ...prev,
          ...updated,
          id: prev?.id || updated.id,
        }));
      }
      
      // Update localStorage user data
      if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsed = JSON.parse(userData);
          const updatedUser = { ...parsed, ...updated };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
      
      return updated;
    } catch (err) {
      console.error('useProfile: Error updating profile:', err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile, updateProfile };
};
