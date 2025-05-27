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
            <h2 className={styles.sectionTitle}>Who we are:</h2>
            <h3 className={styles.sectionSubtitle}>
              Transforming lives,<br />fostering hope and inclusiveness.
              
            </h3>
            
            <p className={styles.mainParagraph}>
              Universal Lighthouse fosters inclusive communities by designing programs that eliminate disability stigma, registered under the Ministry of Labour and Social Protection
            </p>
            
            <div className={styles.highlightItem}>
              
              <p>champion inclusivity as our guiding light and uplifting the vulnerable groups in our community.</p>
            </div>
            
            <div className={styles.highlightItem}>
              
              <p>influencing change by empowering lives and inspiring a future where everyone thrives, regardless of their physical challenges.</p>
            </div>
          </div>
        </div>
        
        {/* Middle Column - Full height image */}
        <div className={styles.middleColumn}>
           <div className={styles.highlightItem}>            
              <h4>Our Mision</h4>
              <p>champion inclusivity as our guiding light and uplifting the vulnerable groups in our community.</p>
            </div>
            
            <div className={styles.highlightItem}>
              <h4>Our Vision</h4>
              <p>influencing change by empowering lives and inspiring a future where everyone thrives, regardless of their physical challenges.</p>
            </div>
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
              Join us in making a real impact, volunteer today to uplift lives, spread hope, build communities, and inspire lasting positive change.
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