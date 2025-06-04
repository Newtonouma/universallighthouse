import { useState, useEffect, useCallback } from 'react';

interface LoadingState {
  causes: boolean;
  events: boolean;
  gallery: boolean;
  partners: boolean;
  teams: boolean;
  banner: boolean; // Added banner loading state
}

interface UseGlobalLoadingResult {
  isGlobalLoading: boolean;
  loadingStates: LoadingState;
  updateLoadingState: (component: keyof LoadingState, isLoading: boolean) => void;
  setAllLoading: (isLoading: boolean) => void;
}

export function useGlobalLoading(): UseGlobalLoadingResult {
  const [loadingStates, setLoadingStates] = useState<LoadingState>({
    causes: true,
    events: true,
    gallery: true,
    partners: true,
    teams: true,
    banner: true, // Initialize banner loading state
  });

  const [isGlobalLoading, setIsGlobalLoading] = useState(true);

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
      banner: isLoading, // Set banner loading state
    });
  }, []);

  return {
    isGlobalLoading,
    loadingStates,
    updateLoadingState,
    setAllLoading
  };
}
