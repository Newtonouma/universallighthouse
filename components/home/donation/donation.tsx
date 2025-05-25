'use client';

import React from 'react';
import Slider from 'react-slick';
import styles from './donation.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { causes, CauseItem } from '../../../src/data/causesData';
import { useRouter } from 'next/navigation';



const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: false,
  variableWidth: false,
  centerPaddingLeft: '40px', 
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        centerPadding: '30px'
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerPadding: '20px'
      }
    }
  ]
};

const DonationCarousel = () => {
  const router = useRouter();

  return (
    <div className={styles.carouselWrapper}>
      <h2 className={styles.sectionTitle}>Our Latest Causes</h2>
      <p className={styles.sectionDescription}>
        Sustainable livelihoods are key to long-term recovery. We empower individuals and families to rebuild their lives with lasting stability.
      </p>
      
      <Slider {...settings}>
        {causes.map((item: CauseItem) => {
          const percentage = Math.min((item.raised / item.goal) * 100, 100).toFixed(0);
          return (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.categoryTag}>{item.category}</span>
                <img src={item.image} alt={item.title} className={styles.image} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
                <div className={styles.progressContainer}>
                  <div className={styles.progressBarContainer}>
                    <div 
                      className={styles.progressBar} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className={styles.percentage}>{percentage}%</span>
                </div>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Raised:</span>
                    <span className={styles.statValue}>${item.raised.toLocaleString()}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Goal:</span>
                    <span className={styles.statValue}>${item.goal.toLocaleString()}</span>
                  </div>
                </div>
                <button 
                  className={styles.donateButton}
                  onClick={() => router.push(`/causes/${item.id}`)}
                >
                  Donate Now
                </button>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default DonationCarousel;