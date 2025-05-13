"use client";
import React from 'react';
import Image from 'next/image';
import styles from './about.module.css';

const AboutUs = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.threeColumnLayout}>
        {/* Left Column - Title and Text Content */}
        <div className={styles.leftColumn}>
          <div className={styles.textContent}>
            <h2 className={styles.sectionTitle}>About Us</h2>
            <h3 className={styles.sectionSubtitle}>
              Committed to Relief, Our<br />
              Work Dedicated to Hope
            </h3>
            
            <p className={styles.mainParagraph}>
              At the heart of our organization lies simple yet powerful mission
              provide immediate relief & lasting hope to communities affected.
            </p>
            
            <div className={styles.highlightItem}>
              <h4>Helping people rebuild and prepare</h4>
              <p>We help them rebuild stronger more resilient for the future. Together with supporters like.</p>
            </div>
            
            <div className={styles.highlightItem}>
              <h4>Putting people first in everything we do</h4>
              <p>Guided by compassion driven the belief that every act kindness makes a difference.</p>
            </div>
          </div>
        </div>
        
        {/* Middle Column - Full height image */}
        <div className={styles.middleColumn}>
          <div className={styles.imageWrapper}>
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
        <div className={styles.rightColumn}>
          <div className={styles.rightContent}>
            <p className={styles.shortParagraph}>
              At the heart of our lies a simple yet powerful
              mission: to provide immediate relief affected by disaster.
            </p>
            
            <div className={styles.smallImageWrapper}>
              <Image
                src="/images/hero1.jpg"
                alt="Mission icon"
                fill
                className={styles.smallImage}
              />
            </div>
            
            <button className={styles.volunteerButton}>Volunteer</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;