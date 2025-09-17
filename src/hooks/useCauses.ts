import { useState, useEffect, useCallback } from 'react';
import { CauseItem, causes as causesData } from '../data/causesData';
import { useLoadingContext } from '../contexts/LoadingContext';

interface UseCausesReturn {
  causes: CauseItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseCauseReturn {
  cause: CauseItem | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Hook to fetch all causes
export function useCauses(): UseCausesReturn {
  const [causes, setCauses] = useState<CauseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { updateLoadingState } = useLoadingContext();

  const fetchCauses = useCallback(async () => {
    try {
      setLoading(true);
      updateLoadingState('causes', true);
      setError(null);
      
      // Simulate a brief loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use local data instead of API
      setCauses(causesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCauses([]);
    } finally {
      setLoading(false);
      updateLoadingState('causes', false);
    }
  }, [updateLoadingState]);
  useEffect(() => {
    fetchCauses();
  }, [fetchCauses]);

  return {
    causes,
    loading,
    error,
    refetch: fetchCauses,
  };
}

// Hook to fetch a single cause by ID
export function useCause(id: string | null): UseCauseReturn {
  const [cause, setCause] = useState<CauseItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCause = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Simulate a brief loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Find cause in local data
      const foundCause = causesData.find(c => c.id === id);
      
      if (!foundCause) {
        throw new Error('Cause not found');
      }
      
      setCause(foundCause);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCause(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCause();
  }, [fetchCause]);

  return {
    cause,
    loading,
    error,
    refetch: fetchCause,
  };
}

