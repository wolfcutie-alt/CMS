import { useState, useEffect } from "react";
import { Category } from "@/types";

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('authToken');
                
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data: Category[] = await response.json();
                } else {
                    throw new Error('Failed to fetch data')
                }
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    })

    return { categories, loading, error }
}