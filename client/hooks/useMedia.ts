import { useEffect, useState } from 'react';
import { Media } from '@/types';

export const useMedias = () => {
    const [medias, setMedias] = useState<Media[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data: Media[] = await response.json();
                setMedias(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false);
            }
        }

        fetchMedia();
    }, [])

    return { medias, loading, error }
}