import { useState, useEffect } from "react"

type PostStatus = 'draft' | 'published' | 'archived';

interface Post {
    id: number;                     // INT PK
    title: string;                  // VARCHAR(255)
    slug: string;                   // VARCHAR(255)
    excerpt: string | null;         // TEXT, allow null if DB allows
    content: string;                // LONGTEXT/TEXT
    status: PostStatus;             // ENUM
    authorId: number;               // INT
    categoryId: number | null;      // INT, nullable if not always set
    featuredImage: string | null;   // VARCHAR(255) URL or path
    views: number;                  // INT
    likes: number;                  // INT
    shares: number;                 // INT
    publishedAt: string | null;     // TIMESTAMP as ISO string
    created_at: string;             // TIMESTAMP
    updated_at: string;             // TIMESTAMP
  }

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