import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';

export interface SimpleUser {
  id: number;
  name: string;
  email: string;
  role?: string;
  status?: string;
  created_at?: string;
}

export const useUsers = (page: number = 1, perPage: number = 10) => {
  const [users, setUsers] = useState<SimpleUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: perPage,
  });

  const fetchUsers = useCallback(async (pageNum: number = page, perPageNum: number = perPage) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getUsers(pageNum, perPageNum);
      setUsers(Array.isArray(response.data) ? response.data as SimpleUser[] : []);
      setPagination({
        currentPage: response.meta?.current_page || pageNum,
        totalPages: response.meta?.last_page || 1,
        totalItems: response.meta?.total || 0,
        perPage: response.meta?.per_page || perPageNum,
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [page, perPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createUser = useCallback(async (data: { name: string; email: string; password: string; role?: string; status?: string }) => {
    const created = await apiClient.createUser(data);
    setUsers(prev => [created, ...prev]);
    return created as SimpleUser;
  }, []);

  const updateUser = useCallback(async (id: number, data: Partial<{ name: string; email: string; password: string; role: string; status: string }>) => {
    const updated = await apiClient.updateUser(id, data);
    setUsers(prev => prev.map(u => u.id === id ? updated : u));
    return updated as SimpleUser;
  }, []);

  const deleteUser = useCallback(async (id: number) => {
    await apiClient.deleteUser(id);
    setUsers(prev => prev.filter(u => u.id !== id));
  }, []);

  return { users, loading, error, pagination, refetch: fetchUsers, createUser, updateUser, deleteUser };
}


