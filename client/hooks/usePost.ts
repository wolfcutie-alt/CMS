import { useState, useEffect } from "react"
import { Post } from "@/types";

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data: Post[] = await response.json();
                setPosts(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchPosts();
    }, []);    

    return { posts, loading, error }
}