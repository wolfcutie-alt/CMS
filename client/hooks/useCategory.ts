import { useState, useEffect, useCallback } from "react";
import { Category } from "@/types";

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCategories(Array.isArray(data.data) ? data.data : []);
            } else {
                throw new Error('Failed to fetch categories');
            }
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    const createCategory = useCallback(async (categoryData: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
        try {
            setError(null);
            const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(categoryData),
            });

            if (response.ok) {
                const newCategory = await response.json();
                setCategories(prev => [newCategory, ...prev]);
                return { success: true, data: newCategory };
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create category');
            }
        } catch (err) {
            setError(err as Error);
            return { success: false, error: err as Error };
        }
    }, []);

    const updateCategory = useCallback(async (id: number, categoryData: Partial<Category>) => {
        try {
            setError(null);
            const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(categoryData),
            });

            if (response.ok) {
                const updatedCategory = await response.json();
                setCategories(prev => prev.map(cat => cat.id === id ? updatedCategory : cat));
                return { success: true, data: updatedCategory };
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update category');
            }
        } catch (err) {
            setError(err as Error);
            return { success: false, error: err as Error };
        }
    }, []);

    const deleteCategory = useCallback(async (id: number) => {
        try {
            setError(null);
            const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
            });

            if (response.ok) {
                setCategories(prev => prev.filter(cat => cat.id !== id));
                return { success: true };
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete category');
            }
        } catch (err) {
            setError(err as Error);
            return { success: false, error: err as Error };
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { 
        categories, 
        loading, 
        error, 
        createCategory, 
        updateCategory, 
        deleteCategory,
        refetch: fetchCategories
    };
};