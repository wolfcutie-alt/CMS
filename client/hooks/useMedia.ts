import { useState, useEffect, useCallback } from 'react';
import { Media } from '@/types';
import { getAuthHeaders, handleApiError } from '@/lib/utils';

export const useMedias = () => {
    const [medias, setMedias] = useState<Media[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchMedias = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch media');
            }

            const data: Media[] = await response.json();
            setMedias(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMedias();
    }, [fetchMedias]);

    const createMedia = useCallback(async (mediaData: FormData) => {
        try {
            setLoading(true);
            const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media`, {
                method: 'POST',
                headers: {
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
                body: mediaData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to create media');
            }

            const newMedia: Media = await response.json();
            setMedias(prev => [newMedia, ...prev]);
            return newMedia;
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(new Error(errorMessage));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateMedia = useCallback(async (id: number, mediaData: Partial<Media>) => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(mediaData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to update media');
            }

            const updatedMedia: Media = await response.json();
            setMedias(prev => prev.map(media => media.id === id ? updatedMedia : media));
            return updatedMedia;
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(new Error(errorMessage));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteMedia = useCallback(async (id: number) => {
        try {
            setLoading(true);
            console.log('Making DELETE request to:', `${process.env.NEXT_PUBLIC_API_URL}/media/${id}`);
            console.log('Headers:', getAuthHeaders());
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            });

            console.log('Delete response status:', response.status);
            console.log('Delete response headers:', Object.fromEntries(response.headers.entries()));

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Delete error response:', errorData);
                throw new Error(errorData.message || 'Failed to delete media');
            }

            console.log('Delete successful, updating state');
            setMedias(prev => prev.filter(media => media.id !== id));
            return true;
        } catch (err) {
            console.error('Delete error:', err);
            const errorMessage = handleApiError(err);
            setError(new Error(errorMessage));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const getMedia = useCallback(async (id: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media/${id}`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch media');
            }

            const media: Media = await response.json();
            return media;
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(new Error(errorMessage));
            throw err;
        }
    }, []);

    return { 
        medias, 
        loading, 
        error, 
        fetchMedias,
        createMedia, 
        updateMedia, 
        deleteMedia, 
        getMedia 
    };
};