import { useState, useEffect } from "react";
import { Analytic } from "@/types";

export const useAnalytics = () => {
    const [analytics, setAnalyitics] = useState<Analytic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem('authToken');
                
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytic`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data: Analytic[] = await response.json();
                } else {
                    throw new Error('Failed to fetch data')
                }
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false);
            }
        }

        fetchAnalytics();
    })

    return { analytics, loading, error }
}