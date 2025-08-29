import { useState, useEffect } from "react";
import { Analytic } from "@/types";

export const useAnalytics = () => {
    const [analytics, setAnalytics] = useState<Analytic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytic`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data: Analytic[] = await response.json();
                setAnalytics(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    return { analytics, loading, error };
}