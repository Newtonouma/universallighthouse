'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useGlobalLoading } from '../hooks/useGlobalLoading';

interface LoadingState {
  causes: boolean;
  events: boolean;
  gallery: boolean;
  partners: boolean;
  teams: boolean;
  banner: boolean; // Added banner loading state
}

interface LoadingContextType {
  isGlobalLoading: boolean;
  loadingStates: LoadingState;
  updateLoadingState: (component: keyof LoadingState, isLoading: boolean) => void;
  setAllLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const loadingData = useGlobalLoading();

  return (
    <LoadingContext.Provider value={loadingData}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoadingContext() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoadingContext must be used within a LoadingProvider');
  }
  return context;
}
