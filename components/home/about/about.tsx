"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './about.module.css';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={aboutRef}
      className={`${styles.aboutSection} ${isVisible ? styles.animated : ''}`}
    >      <div className={`${styles.threeColumnLayout} ${isVisible ? styles.layoutAnimated : ''}`}>
        {/* Left Column - Title and Text Content */}
        <div className={`${styles.leftColumn} ${isVisible ? styles.leftColumnAnimated : ''}`}>
          <div className={styles.textContent}>
            <h2 className={`${styles.sectionTitle} ${isVisible ? styles.titleAnimated : ''}`}>Who we are:</h2>
            <h3 className={`${styles.sectionSubtitle} ${isVisible ? styles.subtitleAnimated : ''}`}>
              Transforming lives,<br />fostering hope and inclusiveness.
              
            </h3>            
            <p className={`${styles.mainParagraph} ${isVisible ? styles.paragraphAnimated : ''}`}>
              Universal Lighthouse fosters inclusive communities by designing programs that eliminate disability stigma, registered under the Ministry of Labour and Social Protection
            </p>
            
            <div className={`${styles.highlightItem} ${isVisible ? styles.highlightAnimated : ''}`}>
              
              <p>champion inclusivity as our guiding light and uplifting the vulnerable groups in our community.</p>
            </div>
            
            <div className={`${styles.highlightItem} ${isVisible ? styles.highlightAnimated : ''}`}>
              
              <p>influencing change by empowering lives and inspiring a future where everyone thrives, regardless of their physical challenges.</p>
            </div>
          </div>
        </div>        
        {/* Middle Column - Full height image */}
        <div className={`${styles.middleColumn} ${isVisible ? styles.middleColumnAnimated : ''}`}>
           <div className={`${styles.highlightItem} ${isVisible ? styles.missionAnimated : ''}`}>            
              <h4>Our Mision</h4>
              <p>champion inclusivity as our guiding light and uplifting the vulnerable groups in our community.</p>
            </div>
            
            <div className={`${styles.highlightItem} ${isVisible ? styles.visionAnimated : ''}`}>
              <h4>Our Vision</h4>
              <p>influencing change by empowering lives and inspiring a future where everyone thrives, regardless of their physical challenges.</p>
            </div>
          <div className={`${styles.imageWrapper} ${isVisible ? styles.imageAnimated : ''}`}>
            <Image
              src="/images/hero2.jpg"
              alt="Our team helping community"
              fill
              className={styles.mainImage}
              priority
            />
          </div>
        </div>        
        {/* Right Column - Small text, image and button */}
        <div className={`${styles.rightColumn} ${isVisible ? styles.rightColumnAnimated : ''}`}>
          <div className={styles.rightContent}>
            <p className={`${styles.shortParagraph} ${isVisible ? styles.rightParagraphAnimated : ''}`}>
              Join us in making a real impact, volunteer today to uplift lives, spread hope, build communities, and inspire lasting positive change.
            </p>
            
            <div className={`${styles.smallImageWrapper} ${isVisible ? styles.smallImageAnimated : ''}`}>
              <Image
                src="/images/hero1.jpg"
                alt="Mission icon"
                fill
                className={styles.smallImage}
              />
            </div>
            
            <button className={`${styles.volunteerButton} ${isVisible ? styles.buttonAnimated : ''}`}>Volunteer</button>
          </div>
        </div>
      
      </div>
    </section>
  );
};

export default AboutUs;