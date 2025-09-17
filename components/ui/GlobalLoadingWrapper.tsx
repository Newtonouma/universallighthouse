'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { useLoadingContext } from '../../src/contexts/LoadingContext';

interface GlobalLoadingWrapperProps {
  children: ReactNode;
}

const GlobalLoadingWrapper: React.FC<GlobalLoadingWrapperProps> = ({ children }) => {
  // Disable global loading wrapper transitions to prevent layout shifts during navigation
  return (
    <>
      <div className="global-loading-content visible mounted">
        {children}
      </div>
    </>
  );
};

export default GlobalLoadingWrapper;
