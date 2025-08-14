import { useState, useEffect } from "react"

interface Post {
    id: number,
    title: string,
    excerpt: string,
    status: string,
    author: string,
    date: string,
    views: number,
    category: string
}

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('authToken'); // or wherever you store it
    
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Add your token here
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