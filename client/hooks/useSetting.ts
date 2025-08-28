import { useEffect, useState } from 'react';
import { SettingRow } from '@/types';

export const useSetting = () => {
    const [settings, setSetting] = useState<SettingRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchSetting = async () => {
            try {
                const token = localStorage.getItem("authToken");

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data: SettingRow[] = await response.json();
                } else {
                    throw new Error("Failed to fetch data")
                }
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false);
            }
        }

        fetchSetting();
    })

    return { settings, loading, error }
}