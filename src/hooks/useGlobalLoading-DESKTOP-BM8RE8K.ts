import { useState, useEffect, useCallback } from 'react';

interface LoadingState {
  causes: boolean;
  events: boolean;
  gallery: boolean;
  partners: boolean;
  teams: boolean;
}

interface UseGlobalLoadingResult {
  isGlobalLoading: boolean;
  loadingStates: LoadingState;
  updateLoadingState: (component: keyof LoadingState, isLoading: boolean) => void;
  setAllLoading: (isLoading: boolean) => void;
}

export function useGlobalLoading(): UseGlobalLoadingResult {
  const [loadingStates, setLoadingStates] = useState<LoadingState>({
    causes: false,
    events: false,
    gallery: false,
    partners: false,
    teams: false,
  });

  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  // Update the global loading state when any component loading state changes
  useEffect(() => {
    const hasAnyLoading = Object.values(loadingStates).some(state => state === true);
    setIsGlobalLoading(hasAnyLoading);
  }, [loadingStates]);
  const updateLoadingState = useCallback((component: keyof LoadingState, isLoading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [component]: isLoading
    }));
  }, []);

  const setAllLoading = useCallback((isLoading: boolean) => {
    setLoadingStates({
      causes: isLoading,
      events: isLoading,
      gallery: isLoading,
      partners: isLoading,
      teams: isLoading,
    });
  }, []);

  return {
    isGlobalLoading,
    loadingStates,
    updateLoadingState,
    setAllLoading
  };
}
