import { useEffect, useState } from 'react';
import { Media } from '@/types';

export const useMedias = () => {
    const [medias, setMedias] = useState<Media[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const token = localStorage.getItem('authToken');

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data: Comment[] = await response.json();
                } else {
                    throw new Error("Failed to fetch data")
                }
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false);
            }
        }

        fetchMedia();
    })

    return { medias, loading, error }
}