'use client';

import React from 'react';
import Slider from 'react-slick';
import styles from './donation.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type DonationItem = {
  id: string;
  title: string;
  raised: number;
  goal: number;
  category: string;
  description: string;
  image: string;
};

const donationData: DonationItem[] = [
  {
    id: '1',
    title: 'Disaster Relief',
    raised: 70000,
    goal: 85000,
    category: 'Disasters',
    description: 'Long-term recovery requires sustainable livelihoods. We support individuals & families in rebuilding.',
    image: '/images/hero1.jpg',
  },
  {
    id: '2',
    title: 'Medical Assistance',
    raised: 26000,
    goal: 90000,
    category: 'Medical',
    description: 'Access healthcare becomes a lifeline in times of crisis. We offer medical support, mobile clinics, & mental health services.',
    image: '/images/hero2.jpg',
  },
  {
    id: '3',
    title: 'Hunger Relief',
    raised: 13701,
    goal: 60000,
    category: 'Food',
    description: 'In the aftermath of a disaster access to nutritious food is often disrupted. We work to provide emergency meals.',
    image: '/images/hero3.jpg',
  },
  {
    id: '4',
    title: 'Shelter and Housing',
    raised: 18000,
    goal: 75000,
    category: 'Shelter',
    description: 'Rebuilding home & shelter essential for recovery. We help restore safe living conditions by offering temporary housing.',
    image: '/images/hero2.jpg',
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: false,
  variableWidth: false,       // Enable center mode
  centerPadding: '40px',  // Add padding on both sides
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
  return (
    <div className={styles.carouselWrapper}>
      <h2 className={styles.sectionTitle}>Our Latest Causes</h2>
      <p className={styles.sectionDescription}>
        Long-term recovery requires sustainable livelihoods. We support individuals & families in rebuilding.
      </p>
      
      <Slider {...settings}>
        {donationData.map((item) => {
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
                  onClick={() => console.log(`Donate to ${item.title}`)}
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