import { useState, useEffect } from "react"
import { Post } from "@/types";

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('authToken'); 
    
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
    
                if (response.ok) {
                    const data: Post[] = await response.json();
                    setPosts(data);
                } else {
                    throw new Error('Failed to fetch posts');
                }
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