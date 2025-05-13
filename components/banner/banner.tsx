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

const DonationCarousel = () => {
  const actions = [
    {
      title: "VOLUNTEER",
      icon: <FaHandsHelping size={30} />, // Reduced icon size
      link: "/volunteer",
      color: "#4CAF50"
    },
    {
      title: "HELP LIFE",
      icon: <FaHeartbeat size={30} />, // Reduced icon size
      link: "/help-life",
      color: "#F44336"
    },
    {
      title: "GIVE THOUGHTFULLY",
      icon: <FaHandHoldingHeart size={30} />, // Reduced icon size
      link: "/give",
      color: "#2196F3"
    },
    {
      title: "SEND DONATION",
      icon: <FaDonate size={30} />, // Reduced icon size
      link: "/donate",
      color: "#FF9800"
    },
    {
      title: "SUPPORT CAUSE",
      icon: <FaHands size={30} />, // Reduced icon size
      link: "/support",
      color: "#9C27B0"
    },
    {
      title: "CHANGE LIVES",
      icon: <FaSmile size={30} />, // Reduced icon size
      link: "/change-lives",
      color: "#00BCD4"
    },
    {
      title: "BE THE CHANGE",
      icon: <FaSeedling size={30} />, // Reduced icon size
      link: "/be-the-change",
      color: "#8BC34A"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Double the array for seamless looping
  const extendedActions = [...actions, ...actions];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const newIndex = prev + 1;
        if (newIndex >= actions.length) {
          // Reset to first set without animation
          return 0;
        }
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [actions.length, isPaused]);

  // Handle reset without animation
  useEffect(() => {
    if (currentIndex === 0 && carouselRef.current) {
      carouselRef.current.style.transition = 'none';
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'transform 0.5s ease';
        }
      }, 50);
    }
  }, [currentIndex]);

  return (
    <div className={styles.carouselContainer}>
      <div 
        className={styles.carouselWrapper}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          ref={carouselRef}
          className={styles.carousel}
          style={{
            transform: `translateX(-${currentIndex * (100 / actions.length)}%)`,
            width: `${extendedActions.length * (100 / actions.length)}%`
          }}
        >
          {extendedActions.map((action, index) => (
            <Link 
              href={action.link} 
              key={index} 
              passHref 
              legacyBehavior
            >
              <a 
                className={styles.actionCard} 
                style={{ backgroundColor: action.color }}
                aria-label={action.title}
              >
                <div className={styles.iconWrapper}>
                  {action.icon}
                </div>
                <h3 className={styles.actionTitle}>{action.title}</h3>
                <div className={styles.learnMore}>→</div> {/* Simplified arrow */}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationCarousel;