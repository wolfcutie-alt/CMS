import { useEffect, useState, useCallback } from 'react';
import type { Comment } from '@/types';
import { apiClient } from '@/lib/api';

export const useComments = (page: number = 1, perPage: number = 10) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 10,
    });

    const fetchComments = useCallback(async (pageNum: number = page, perPageNum: number = perPage) => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiClient.getComments(pageNum, perPageNum);
            setComments(Array.isArray(response.data) ? response.data : []);
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
        fetchComments();
    }, [fetchComments]);

    const approveComment = useCallback(async (id: number) => {
        try {
            const updatedComment = await apiClient.approveComment(id);
            setComments(prev => prev.map(comment => 
                comment.id === id ? updatedComment : comment
            ));
            return updatedComment;
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    }, []);

    const rejectComment = useCallback(async (id: number) => {
        try {
            const updatedComment = await apiClient.rejectComment(id);
            setComments(prev => prev.map(comment => 
                comment.id === id ? updatedComment : comment
            ));
            return updatedComment;
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    }, []);

    const flagComment = useCallback(async (id: number) => {
        try {
            const updatedComment = await apiClient.flagComment(id);
            setComments(prev => prev.map(comment => 
                comment.id === id ? updatedComment : comment
            ));
            return updatedComment;
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    }, []);

    const deleteComment = useCallback(async (id: number) => {
        try {
            await apiClient.deleteComment(id);
            setComments(prev => prev.filter(comment => comment.id !== id));
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    }, []);

    const replyToComment = useCallback(async (parentId: number, data: Omit<Comment, 'id' | 'parentId' | 'created_at' | 'updated_at'>) => {
        try {
            const newComment = await apiClient.replyToComment(parentId, data);
            setComments(prev => [...prev, newComment]);
            return newComment;
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    }, []);

    const updateComment = useCallback(async (id: number, data: Partial<Comment>) => {
        try {
            const updatedComment = await apiClient.updateComment(id, data);
            setComments(prev => prev.map(comment => 
                comment.id === id ? updatedComment : comment
            ));
            return updatedComment;
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    }, []);

    return { 
        comments, 
        loading, 
        error, 
        pagination,
        refetch: fetchComments,
        approveComment,
        rejectComment,
        flagComment,
        deleteComment,
        replyToComment,
        updateComment
    };
}