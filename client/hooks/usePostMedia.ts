import { useEffect, useState } from 'react';
import { PostMedia } from '@/types';

export const usePostMedia = () => {
    const [postMedia, setPostMedia] = useState<PostMedia[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchPostMedia = async () => {
            try {
                const token = localStorage.getItem('authToken');

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/postmedia`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,                        
                    },
                });

                if (response.ok) {
                    const data: PostMedia[] = await response.json();
                } else {
                    throw new Error("Failed to fetch data");
                }
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchPostMedia();
    })

    return { postMedia, loading, error }
}