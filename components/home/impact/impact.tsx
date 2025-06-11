'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useScrollAnimation, useStaggeredAnimation } from '../../../src/hooks/useScrollAnimation';
import styles from './impact.module.css';

interface ImpactStat {
  number: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const Impact = () => {
  const { ref: impactRef, isVisible: impactVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: statsRef, visibleItems: visibleStats } = useStaggeredAnimation(4, 200, true);
  
  const impactStats: ImpactStat[] = [
    {
      number: '500+',
      label: 'Lives Transformed',
      description: 'Community members empowered through our programs',
      icon: (
        <svg className={styles.statIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: styles.gradientGreen
    },
    {
      number: '25+',
      label: 'Projects Completed',
      description: 'Sustainable development initiatives launched',
      icon: (
        <svg className={styles.statIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: styles.gradientRed
    },
    {
      number: '50+',
      label: 'Strategic Partners',
      description: 'Organizations collaborating for change',
      icon: (
        <svg className={styles.statIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6m8 0H8m0 0v-.5A1.5 1.5 0 009.5 4h5A1.5 1.5 0 0116 5.5V6H8z" />
        </svg>
      ),
      color: styles.gradientGreenRed
    },
    {
      number: '10+',
      label: 'Counties Reached',
      description: 'Across Kenya and beyond our borders',
      icon: (
        <svg className={styles.statIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: styles.gradientRedGreen
    }
  ];
    // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  
  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % impactStats.length);
    }, 4000); // Change slide every 4 seconds
    
    return () => clearInterval(interval);
  }, [impactStats.length, isAutoPlaying, isPaused]);
  
  // Carousel navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % impactStats.length);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
    setTimeout(() => setIsAutoPlaying(true), 8000); // Resume after 8 seconds
  }, [impactStats.length]);
    const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + impactStats.length) % impactStats.length);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
    setTimeout(() => setIsAutoPlaying(true), 8000); // Resume after 8 seconds
  }, [impactStats.length]);
    // Pause/resume handlers for mouse interaction
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);  // Touch/swipe support
  const handleTouchStart = useCallback(() => {
    setIsPaused(true);
  }, []);
  
  const handleTouchEnd = useCallback(() => {
    setIsPaused(false);
  }, []);
  
  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === ' ') {
      e.preventDefault();
      setIsAutoPlaying(prev => !prev);
    }
  }, [nextSlide, prevSlide]);

  return (
    <section 
      ref={impactRef}
      className={styles.impactSection}
      aria-labelledby="impact-heading"
    >
      <div className={styles.backgroundOverlay}>
        <div className={styles.overlayGradient}></div>
        <div className={styles.floatingElements}>
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className={`${styles.floatElement} ${styles[`floatElement${i+1}`]}`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <div className={`${styles.mainContent} ${impactVisible ? styles.visible : styles.hidden}`}>
        <header className={styles.headerSection}>
          <div className={`${styles.badgeContainer} ${impactVisible ? styles.visible : styles.hidden}`}>
            <span className={styles.impactBadge}>
              Our Impact Story
            </span>
          </div>
            <h2 id="impact-heading" className={`${styles.impactTitle} ${impactVisible ? styles.visible : styles.hidden}`}>
            Creating Lasting Impact Together
          </h2>
          
          <div className={`${styles.separator} ${impactVisible ? styles.visible : styles.hidden}`}>
            <div className={styles.separatorLine}></div>
            <div className={styles.separatorDots}>
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className={`${styles.decorativeDot} ${styles[`dot${i+1}`]}`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className={styles.separatorLine}></div>
          </div>
          
          <p className={`${styles.impactDescription} ${impactVisible ? styles.visible : styles.hidden}`}>
            Through innovative community partnerships and sustainable development programs, 
            we&apos;re transforming lives across <span className={styles.highlightGreen}>Kenya</span> and beyond. 
            Every initiative we launch, every partnership we forge, brings us closer to a world where 
            <span className={styles.highlightRed}> opportunity knows no boundaries</span>.
          </p>
          
          <blockquote className={`${styles.impactQuote} ${impactVisible ? styles.visible : styles.hidden}`}>
            &ldquo;Together, we are not just changing lives – we are building the foundation for sustainable development 
            that will benefit generations to come.&rdquo;
          </blockquote>
        </header>        <div 
          ref={statsRef}
          className={styles.statsGrid}
          aria-label="Impact statistics"
        >
          {impactStats.map((stat, index) => (
            <article
              key={index}
              className={`${styles.statCard} ${visibleStats.includes(index) ? styles.visible : styles.hidden}`}
              style={{ '--delay': `${index * 150}ms` } as React.CSSProperties}
              aria-labelledby={`stat-${index}-heading`}
            >
              <div className={styles.statGlow}></div>
              
              <div className={styles.statContent}>
                <div className={`${styles.statIcon} ${stat.color}`}>
                  {stat.icon}
                </div>
                
                <div className={styles.statNumber}>
                  <span className={`${styles.numberGradient} ${stat.color}`}>
                    {stat.number}
                  </span>
                </div>
                
                <h3 id={`stat-${index}-heading`} className={styles.statLabel}>
                  {stat.label}
                </h3>
                
                <p className={styles.statDescription}>
                  {stat.description}
                </p>
                
                <div className={styles.statCorner} aria-hidden="true"></div>
                <div className={styles.statProgressLine} aria-hidden="true"></div>
              </div>
            </article>
          ))}
        </div>        {/* Mobile Carousel - Card Shuffle Style */}
        <div 
          className={`${styles.carouselWrapper} ${isPaused || !isAutoPlaying ? styles.paused : ''}`}
          aria-label="Impact statistics carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-live="polite"
          aria-describedby="carousel-instructions"
        >
          <div 
            className={styles.carouselContainer}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className={styles.carouselTrack}>
              {impactStats.map((stat, index) => {
                // Calculate card position relative to current slide
                let position = index - currentSlide;
                if (position < 0) position += impactStats.length;
                
                return (
                  <article
                    key={`carousel-${index}`}
                    className={`${styles.carouselStatCard} ${
                      position === 0 ? styles.cardActive : 
                      position === 1 ? styles.cardNext :
                      position === 2 ? styles.cardNextNext :
                      styles.cardHidden
                    }`}
                    style={{ 
                      '--card-index': position,
                      zIndex: impactStats.length - position 
                    } as React.CSSProperties}
                    aria-labelledby={`carousel-stat-${index}-heading`}
                    aria-hidden={position !== 0}
                  >
                    <div className={styles.statGlow}></div>
                    
                    <div className={styles.statContent}>
                      <div className={`${styles.statIcon} ${stat.color}`}>
                        {stat.icon}
                      </div>
                      
                      <div className={styles.statNumber}>
                        <span className={`${styles.numberGradient} ${stat.color}`}>
                          {stat.number}
                        </span>
                      </div>
                      
                      <h3 id={`carousel-stat-${index}-heading`} className={styles.statLabel}>
                        {stat.label}
                      </h3>
                      
                      <p className={styles.statDescription}>
                        {stat.description}
                      </p>
                      
                      <div className={styles.statCorner} aria-hidden="true"></div>
                      <div className={styles.statProgressLine} aria-hidden="true"></div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          
          {/* Hidden instructions for screen readers */}
          <div id="carousel-instructions" className="sr-only">
            Use left and right arrow keys to navigate, space to pause/play auto-advance
          </div>
          
          {/* Carousel Navigation */}
          <div className={styles.carouselNav}>
            <button 
              className={styles.carouselButton}
              onClick={prevSlide}
              data-direction="prev"
              aria-label="Previous statistic"
              title="Previous statistic (Left Arrow)"
            />
            <button 
              className={styles.carouselButton}
              onClick={nextSlide}
              data-direction="next"
              aria-label="Next statistic"
              title="Next statistic (Right Arrow)"
            />
          </div>
          
          
        </div>
      </div>
    </section>
  );
};

export default Impact;