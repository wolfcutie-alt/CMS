import { useEffect, useState } from 'react';
import type { Comment } from '@/types';

export const useComments = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const token = localStorage.getItem('authToken');

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data: Comment[] = await response.json();
                } else {
                    throw new Error("Failed to fetch data");
                }
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchComments();
    })

    return { comments, loading, error }

}