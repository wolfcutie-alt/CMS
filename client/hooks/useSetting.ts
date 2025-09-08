import { useEffect, useMemo, useState, useCallback } from 'react';
import { SettingRow } from '@/types';

type SettingsMap = Record<string, any>;

const inferValueType = (value: any): SettingRow['valueType'] => {
  const t = typeof value;
  if (t === 'boolean') return 'boolean';
  if (t === 'number') return 'number';
  if (t === 'string') return 'string';
  if (value === null || value === undefined) return 'string';
  return 'json';
}

const serializeValue = (value: any, valueType: SettingRow['valueType']): string => {
  switch (valueType) {
    case 'boolean':
      return value ? 'true' : 'false';
    case 'number':
      return String(value);
    case 'json':
      return JSON.stringify(value ?? null);
    case 'date':
    case 'text':
    case 'string':
    default:
      return value == null ? '' : String(value);
  }
}

const parseValue = (raw: string | null, valueType: SettingRow['valueType']): any => {
  switch (valueType) {
    case 'boolean':
      return raw === 'true' || raw === '1';
    case 'number':
      return raw != null ? Number(raw) : null;
    case 'json':
      try { return raw ? JSON.parse(raw) : null } catch { return null }
    case 'date':
    case 'text':
    case 'string':
    default:
      return raw ?? '';
  }
}

export const useSetting = () => {
  const [rows, setRows] = useState<SettingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });
      if (!response.ok) throw new Error('Failed to fetch settings');
      const data: SettingRow[] = await response.json();
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const settings: SettingsMap = useMemo(() => {
    const map: SettingsMap = {};
    for (const row of rows) {
      map[row.settingKey] = parseValue(row.settingValue, row.valueType);
    }
    return map;
  }, [rows]);

  const saveSettings = useCallback(async (updates: SettingsMap) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };

    for (const [key, value] of Object.entries(updates)) {
      const existing = rows.find(r => r.settingKey === key);
      const valueType = existing?.valueType ?? inferValueType(value);
      const body = JSON.stringify({
        category: existing?.category ?? null,
        settingKey: key,
        settingValue: serializeValue(value, valueType),
        valueType,
      });

      const url = existing
        ? `${process.env.NEXT_PUBLIC_API_URL}/setting/${existing.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/setting`;
      const method = existing ? 'PUT' : 'POST';

      const res = await fetch(url, { method, headers, body });
      if (!res.ok) {
        const msg = await res.text().catch(() => 'Failed to save setting');
        throw new Error(msg);
      }
    }

    await fetchSettings();
  }, [rows, fetchSettings]);

  return { settings, loading, error, saveSettings, refetch: fetchSettings };
}