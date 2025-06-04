'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './heros.module.css';

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  image: string;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides: Slide[] = [
  {
    "title": "Empowering Every Step",
    "subtitle": "Support Mobility for All",
    "description": "Join us in providing movement aids to people with disabilities and amputees. Your support gives them freedom, independence, and a better quality of life.",
    "ctaPrimary": "Donate Now",
    "ctaSecondary": "Learn More",
    "image": "/images/hero1.jpg"
  },
  {
    "title": "Change a Life Today",
    "subtitle": "Help Someone Walk Again",
    "description": "Your generosity helps us deliver prosthetics, wheelchairs, and walking aids to those who need them most. Every contribution brings hope and dignity.",
    "ctaPrimary": "Give Support",
    "ctaSecondary": "Our Impact",
    "image": "/images/hero2.jpg"
  },
  {
    "title": "Together, We Lift",
    "subtitle": "Restoring Mobility & Hope",
    "description": "We believe mobility is a human right. Help us bring assistive devices to children and adults living with disabilities. Let’s move forward together.",
    "ctaPrimary": "Join the Cause",
    "ctaSecondary": "Get Involved",
    "image": "/images/hero3.jpg"
  }
];  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);
  return (
    <div className={styles.heroContainer}>      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`${styles.slide} ${index === currentSlide ? styles.activeSlide : ''}`}
        >
          <div className={`${styles.imageContainer} ${index === currentSlide ? styles.zoomed : ''}`}>
            <Image
              src={slide.image}
              alt=""
              fill
              className={styles.image}
              priority={index === 0}
            />
          </div>
          
          <div className={styles.gradientOverlay} />
            <div className={styles.contentContainer}>
            <div className={styles.contentWrapper}>
              <div className={`${styles.textContent} ${index === currentSlide ? styles.textVisible : ''}`}>
                <h1 className={styles.title}>{slide.title}</h1>
                <h2 className={styles.subtitle}>{slide.subtitle}</h2>
                <p className={styles.description}>{slide.description}</p>                <div className={styles.buttonGroup}>
                  <button className={styles.primaryButton}>
                    {slide.ctaPrimary}
                  </button>
                  <button className={styles.secondaryButton}>
                    {slide.ctaSecondary}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className={styles.navigationDots}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;