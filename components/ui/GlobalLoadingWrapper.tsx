'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { useLoadingContext } from '../../src/contexts/LoadingContext';

interface GlobalLoadingWrapperProps {
  children: ReactNode;
}

const GlobalLoadingWrapper: React.FC<GlobalLoadingWrapperProps> = ({ children }) => {
  const { isGlobalLoading } = useLoadingContext();
  const [contentVisible, setContentVisible] = useState(!isGlobalLoading);
  const [contentMounted, setContentMounted] = useState(!isGlobalLoading);

  useEffect(() => {
    if (!isGlobalLoading) {
      // Start showing content after a small delay for smooth transition
      const showContentTimer = setTimeout(() => {
        setContentVisible(true);
      }, 300);

      // Mount content after transition
      const mountContentTimer = setTimeout(() => {
        setContentMounted(true);
      }, 100);

      return () => {
        clearTimeout(showContentTimer);
        clearTimeout(mountContentTimer);
      };
    } else {
      // Hide content immediately when loading starts
      setContentVisible(false);
      setContentMounted(false);
    }
  }, [isGlobalLoading]);

  return (
    <>
      <div 
        className={`global-loading-content${contentVisible ? ' visible' : ''}${contentMounted ? ' mounted' : ''}${isGlobalLoading ? ' loading' : ''}`}
      >
        {children}
      </div>
    </>
  );
};

export default GlobalLoadingWrapper;
