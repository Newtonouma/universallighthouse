'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  retriggerOnScroll?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
    retriggerOnScroll = false
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY.current;
        
        if (entry.isIntersecting) {
          // If retriggerOnScroll is enabled and we're scrolling down, always trigger
          if (retriggerOnScroll && isScrollingDown) {
            setIsVisible(false); // Reset first
            setTimeout(() => setIsVisible(true), 50); // Trigger again with small delay
          } 
          // Otherwise use the original logic
          else if (!triggerOnce || !hasTriggered) {
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true);
                setHasTriggered(true);
              }, delay);
            } else {
              setIsVisible(true);
              setHasTriggered(true);
            }
          }
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
        
        lastScrollY.current = currentScrollY;
      },
      { threshold, rootMargin }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered, retriggerOnScroll]);

  return { ref: elementRef, isVisible };
};

// Enhanced staggered animation that can retrigger
export const useStaggeredAnimation = (
  itemCount: number,
  baseDelay: number = 100,
  retriggerOnScroll: boolean = false
) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY.current;
        
        if (entry.isIntersecting) {
          // If retriggerOnScroll is enabled and scrolling down, always retrigger
          if (retriggerOnScroll && isScrollingDown) {
            setVisibleItems([]); // Reset items
            setIsInView(false);
            
            setTimeout(() => {
              setIsInView(true);
              // Stagger the animation of items
              for (let i = 0; i < itemCount; i++) {
                setTimeout(() => {
                  setVisibleItems(prev => [...prev, i]);
                }, i * baseDelay);
              }
            }, 50);
          }
          // Original logic for first time trigger
          else if (!hasTriggered.current) {
            setIsInView(true);
            hasTriggered.current = true;
            // Stagger the animation of items
            for (let i = 0; i < itemCount; i++) {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, i]);
              }, i * baseDelay);
            }
          }
        }
        
        lastScrollY.current = currentScrollY;
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [itemCount, baseDelay, retriggerOnScroll]);

  return { ref: containerRef, visibleItems, isInView };
};
