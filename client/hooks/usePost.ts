import { useState, useEffect } from "react"
import { Post } from "@/types";
import { getAuthHeaders, handleApiError } from "@/lib/utils";

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data: Post[] = await response.json();
            setPosts(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const createPost = async (postData: Partial<Post>) => {
        try {
            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to create post');
            }

            const newPost: Post = await response.json();
            setPosts(prev => [...prev, newPost]);
            return newPost;
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(new Error(errorMessage));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updatePost = async (id: number, postData: Partial<Post>) => {
        try {
            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to update post');
            }

            const updatedPost: Post = await response.json();
            setPosts(prev => prev.map(post => post.id === id ? updatedPost : post));
            return updatedPost;
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(new Error(errorMessage));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async (id: number) => {
        try {
            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to delete post');
            }

            setPosts(prev => prev.filter(post => post.id !== id));
            return true;
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(new Error(errorMessage));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getPost = async (id: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to fetch post');
            }

            const post: Post = await response.json();
            return post;
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(new Error(errorMessage));
            throw err;
        }
    };

    return { 
        posts, 
        loading, 
        error, 
        createPost, 
        updatePost, 
        deletePost, 
        getPost,
        refetch: fetchPosts
    }
}