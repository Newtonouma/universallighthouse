"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
            <h2 className={`${styles.sectionTitle} ${isVisible ? styles.titleAnimated : ''}`}>About Us</h2>
            <h3 className={`${styles.sectionSubtitle} ${isVisible ? styles.subtitleAnimated : ''}`}>
              Our Story
            </h3>            
            <p className={`${styles.mainParagraph} ${isVisible ? styles.paragraphAnimated : ''}`}>
              Universal Lighthouse was born from a deeply personal journey. After surviving a road accident that resulted in limb loss, our founder, Emmily, experienced first-hand the overwhelming gaps in Kenya&apos;s health and development systems for persons with disabilities.
            </p>
            
            <p className={`${styles.mainParagraph} ${isVisible ? styles.paragraphAnimated : ''}`}>
              In the midst of recovery, it became painfully clear, there were few resources to support survivors, little preparation for families, and almost no affordable access to essential assistive devices. Sadly, Emmily&apos;s experience is not unique.
            </p>
          </div>
        </div>        
        {/* Middle Column - Full height image */}
        <div className={`${styles.middleColumn} ${isVisible ? styles.middleColumnAnimated : ''}`}>
          <p className={`${styles.mainParagraph} ${isVisible ? styles.paragraphAnimated : ''}`}>
            Across Kenya, individuals who acquire disability face a cascade of challenges: loss of income, mental health struggles, social stigma, and near-total exclusion from public services. Universal Lighthouse was founded to address these gaps, ensuring that no one who acquires, or lives with a disability is left behind.
          </p>
          
          <div className={`${styles.highlightItem} ${isVisible ? styles.highlightAnimated : ''}`}>
            <p>By bridging gaps in care, championing inclusion, and restoring dignity, we are building a society where mobility is a right, support is a standard, and every person has the opportunity to thrive.</p>
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
        {/* Right Column - Mission, Vision, and volunteer call to action */}
        <div className={`${styles.rightColumn} ${isVisible ? styles.rightColumnAnimated : ''}`}>
          <div className={styles.rightContent}>
            <div className={`${styles.highlightItem} ${isVisible ? styles.missionAnimated : ''}`}>            
              <h4>Our Mission</h4>
              <p>To champion inclusivity as our guiding light and uplifting the vulnerable groups in our society</p>
            </div>
            
            <div className={`${styles.highlightItem} ${isVisible ? styles.visionAnimated : ''}`}>
              <h4>Our Vision</h4>
              <p>A society where every person with a disability can live with dignity, independence, and opportunity.</p>
            </div>
            
            <div className={`${styles.smallImageWrapper} ${isVisible ? styles.smallImageAnimated : ''}`}>
              <Image
                src="/images/hero1.jpg"
                alt="Mission icon"
                fill
                className={styles.smallImage}
              />
            </div>
            
            <Link href="/about" className={`${styles.volunteerButton} ${isVisible ? styles.buttonAnimated : ''}`}>
              More about us
            </Link>
          </div>
        </div>
      
      </div>
    </section>
  );
};

export default AboutUs;