import { useEffect, useState } from 'react';
import { PostMedia } from '@/types';

export const usePostMedia = () => {
    const [postMedia, setPostMedia] = useState<PostMedia[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchPostMedia = async () => {
            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/postmedia`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data: PostMedia[] = await response.json();
                setPostMedia(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchPostMedia();
    }, [])

    return { postMedia, loading, error }
}