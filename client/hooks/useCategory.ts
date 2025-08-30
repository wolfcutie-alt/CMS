import { useState, useEffect } from "react"
import { Category } from "@/types";
import { getAuthHeaders, handleApiError } from "@/lib/utils";

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to fetch categories');
            }

            const data = await response.json();
            setCategories(Array.isArray(data.data) ? data.data : []);
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(new Error(errorMessage));
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (categoryData: Partial<Category>) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
                method: 'POST',
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to create category');
            }

            await fetchCategories();
            return { success: true };
        } catch (err) {
            const errorMessage = handleApiError(err);
            return { success: false, error: new Error(errorMessage) };
        }
    };

    const updateCategory = async (id: number, categoryData: Partial<Category>) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to update category');
            }

            await fetchCategories();
            return { success: true };
        } catch (err) {
            const errorMessage = handleApiError(err);
            return { success: false, error: new Error(errorMessage) };
        }
    };

    const deleteCategory = async (id: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to delete category');
            }

            await fetchCategories();
            return { success: true };
        } catch (err) {
            const errorMessage = handleApiError(err);
            return { success: false, error: new Error(errorMessage) };
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { 
        categories, 
        loading, 
        error, 
        refetch: fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory
    }
}