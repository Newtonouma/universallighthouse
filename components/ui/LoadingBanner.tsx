'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './LoadingBanner.module.css';

interface LoadingBannerProps {
  isLoading: boolean;
}

const LoadingBanner: React.FC<LoadingBannerProps> = ({ isLoading }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(isLoading);
  const [shouldRender, setShouldRender] = useState(isLoading);
  const fullText = 'UNIVERSAL LIGHTHOUSE';
  const typingSpeed = 150; // milliseconds per character

  useEffect(() => {
    if (isLoading) {
      // Show banner
      setShouldRender(true);
      setIsVisible(true);
      
      let currentIndex = 0;
      setDisplayedText('');
      setIsTypingComplete(false);

      const typewriterInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTypingComplete(true);
          clearInterval(typewriterInterval);
        }
      }, typingSpeed);

      return () => clearInterval(typewriterInterval);
    } else {
      // Hide banner with transition
      setIsVisible(false);
      
      // Remove from DOM after transition completes
      const timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 800); // Match the fadeOut animation duration
      
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className={`${styles.loadingBanner} ${!isVisible ? styles.fadeOut : ''}`}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <Image
              src="/images/Logo.png"
              alt="Universal Lighthouse Logo"
              width={120}
              height={120}
              className={styles.logo}
              priority
            />
          </div>

          {/* Typewriter Title */}
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>
              {displayedText}
              <span className={`${styles.cursor} ${isTypingComplete ? styles.blink : ''}`}>|</span>
            </h1>
          </div>          {/* Loading Animation */}
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Loading content...</p>
          </div>

          {/* Progress Bar */}
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBanner;
