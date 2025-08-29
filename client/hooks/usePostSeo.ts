import { useEffect, useState } from 'react';
import { PostSeo } from '@/types';

export const usePostSeo = () => {
    const [postSeo, setPostSeo] = useState<PostSeo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPostSeo = async () => {
            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/postseo`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data: PostSeo[] = await response.json();
                setPostSeo(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false);
            }
        }

        fetchPostSeo();
    }, [])

    return { postSeo, loading, error }
}