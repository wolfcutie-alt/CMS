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

    useEffect(() => {
        fetchCategories();
    }, []);

    return { 
        categories, 
        loading, 
        error, 
        refetch: fetchCategories
    }
}