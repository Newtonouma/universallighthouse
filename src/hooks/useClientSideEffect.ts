'use client';
import { useState, useEffect } from 'react';

// Hook to prevent hydration mismatches for client-side only effects
export const useClientSideEffect = <T>(
  clientSideFunction: () => T,
  fallbackValue: T,
  deps?: React.DependencyList
): T => {
  const [value, setValue] = useState<T>(fallbackValue);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setValue(clientSideFunction());
    }
  }, [isMounted, ...(deps || [])]);

  return value;
};

// Hook specifically for random particles to prevent hydration mismatch
export const useRandomParticles = (count: number) => {
  const [particles, setParticles] = useState<Array<{ left: number; top: number }>>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const newParticles = Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100
      }));
      setParticles(newParticles);
    }
  }, [count, isMounted]);

  return { particles, isMounted };
};

// Hook for client-side only rendering
export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};
