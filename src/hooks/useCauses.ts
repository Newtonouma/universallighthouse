import { useState, useEffect, useCallback } from 'react';
import { CauseItem, causes as causesData } from '../data/causesData';

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
  const [causes, setCauses] = useState<CauseItem[]>(causesData); // Initialize with data
  const [loading] = useState(false); // No loading for local data
  const [error, setError] = useState<string | null>(null);

  const fetchCauses = useCallback(async () => {
    try {
      setError(null);
      // Use local data directly - no loading state needed
      setCauses(causesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCauses([]);
    }
  }, []);
  
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
      
      // Find cause in local data directly without artificial delay
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

