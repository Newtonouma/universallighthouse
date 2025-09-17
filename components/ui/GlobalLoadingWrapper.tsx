'use client';

import React, { ReactNode } from 'react';

interface GlobalLoadingWrapperProps {
  children: ReactNode;
}

const GlobalLoadingWrapper: React.FC<GlobalLoadingWrapperProps> = ({ children }) => {
  return children;
};

export default GlobalLoadingWrapper;
