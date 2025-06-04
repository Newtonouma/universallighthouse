"use client"
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHandsHelping,
  FaHeartbeat,
  FaHandHoldingHeart,
  FaDonate,
  FaHands,
  FaSmile,
  FaSeedling
} from 'react-icons/fa';
import Link from 'next/link';
import styles from './banner.module.css';
import { useScrollAnimation, useStaggeredAnimation } from '../../../src/hooks/useScrollAnimation';

interface ActionItem {
  title: string;
  icon: React.ReactNode;
  link: string;
  color: string;
}

const DonationCarousel = () => {
  const actions: ActionItem[] = [
    {
      title: "VOLUNTEER",
      icon: <FaHandsHelping size={30} />,
      link: "/volunteer",
      color: "#4CAF50"
    },
    {
      title: "HELP LIFE",
      icon: <FaHeartbeat size={30} />,
      link: "/help-life",
      color: "#F44336"
    },
    {
      title: "GIVE THOUGHTFULLY",
      icon: <FaHandHoldingHeart size={30} />,
      link: "/give",
      color: "#2196F3"
    },
    {
      title: "SEND DONATION",
      icon: <FaDonate size={30} />,
      link: "/donate",
      color: "#FF9800"
    },
    {
      title: "SUPPORT CAUSE",
      icon: <FaHands size={30} />,
      link: "/support",
      color: "#9C27B0"
    },
    {
      title: "CHANGE LIVES",
      icon: <FaSmile size={30} />,
      link: "/change-lives",
      color: "#00BCD4"
    },
    {
      title: "BE THE CHANGE",
      icon: <FaSeedling size={30} />,
      link: "/be-the-change",
      color: "#8BC34A"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const extendedActions = [...actions, ...actions];
  // Scroll animations - retrigger on every downward scroll
  const { ref: containerRef, isVisible } = useScrollAnimation({ 
    threshold: 0.2, 
    retriggerOnScroll: true 
  });
  const { ref: carouselAnimRef, visibleItems } = useStaggeredAnimation(actions.length, 150, true);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const newIndex = prev + 1;
        return newIndex >= actions.length ? 0 : newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [actions.length, isPaused]);

  useEffect(() => {
    if (currentIndex === 0 && carouselRef.current) {
      carouselRef.current.style.transition = 'none';
      const timer = setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'transform 0.5s ease';
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);
  return (
    <div 
      ref={containerRef}
      className={`${styles.carouselContainer} ${isVisible ? styles.animated : ''}`}
    >
      <div 
        ref={carouselAnimRef}
        className={`${styles.carouselWrapper} ${isVisible ? styles.wrapperAnimated : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          ref={carouselRef}
          className={`${styles.carousel} ${isVisible ? styles.carouselAnimated : ''}`}
          data-current-index={currentIndex}
          data-actions-length={actions.length}
        >
          {extendedActions.map((action, index) => (
            <Link
              href={action.link}
              key={`${action.title}-${index}`}
              className={`${styles.actionCard} ${
                visibleItems.includes(index % actions.length) ? styles.cardAnimated : ''
              } ${styles[`color${(index % actions.length) + 1}`]}`}
              aria-label={action.title}
              passHref
            >
              <div className={styles.iconWrapper}>
                {action.icon}
              </div>
              <h3 className={styles.actionTitle}>{action.title}</h3>
              <div className={styles.learnMore} aria-hidden="true">→</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationCarousel;