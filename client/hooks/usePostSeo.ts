import { useEffect, useState } from 'react';
import { PostSeo } from '@/types';

export const usePostSeo = () => {
    const [postSeo, setPostSeo] = useState<PostSeo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPostSeo = async () => {
            try {
                const token = localStorage.getItem("authToken");

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/postseo`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data: PostSeo[] = await response.json();
                } else {
                    throw new Error("Failed to fetch data");
                }
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false);
            }
        }

        fetchPostSeo();
    })

    return { postSeo, loading, error }
}