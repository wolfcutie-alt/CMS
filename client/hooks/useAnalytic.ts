import { useState, useEffect } from "react";

interface Analytic {
    id: number                     // bigint unsigned, primary key
    type: 'view' | 'comment' | 'post' | 'share' | 'download' | 'login' | 'logout' // enum/text of event type
    entityType: string             // varchar, e.g., 'post', 'comment'
    entityId: number               // bigint unsigned, referenced entity
    userId: number | null          // bigint unsigned, nullable if anonymous
    ipAddress: string              // varchar, IPv4 or IPv6
    userAgent: string              // text, raw UA string
    metadata: Record<string, any>  // json, arbitrary key values
    created_at: string             // timestamp in ISO string from DB
    updated_at: string | null      // timestamp nullable if not present
}

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