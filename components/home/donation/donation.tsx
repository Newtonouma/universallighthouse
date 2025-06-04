'use client';

import Slider from 'react-slick';
import styles from './donation.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CauseItem } from '../../../src/data/causesData';
import { useCauses } from '../../../src/hooks/useCauses';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SafeHTMLRenderer from '../../ui/SafeHTMLRenderer';
import { useEffect, useRef, useState } from 'react';

// Custom Arrow Components
const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    className={styles.customArrow + ' ' + styles.prevArrow}
    onClick={onClick}
    type="button"
    aria-label="Previous"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    className={styles.customArrow + ' ' + styles.nextArrow}
    onClick={onClick}
    type="button"
    aria-label="Next"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: false,
  variableWidth: false,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  pauseOnFocus: true,
  arrows: true,
  swipeToSlide: true,
  focusOnSelect: false,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        centerMode: false
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerMode: false
      }
    }
  ]
};

const DonationCarousel = () => {
  const router = useRouter();
  const { causes, loading, error } = useCauses();
  const [isVisible, setIsVisible] = useState(false);
  const donationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set CSS custom properties for progress bars after render
    const progressBars = document.querySelectorAll('[data-progress]');
    progressBars.forEach((bar) => {
      const progress = bar.getAttribute('data-progress');
      if (progress && bar instanceof HTMLElement) {
        bar.style.setProperty('--progress', progress);
      }
    });
  }, [causes]);  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = donationRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Fallback: make visible after 1 second if intersection observer doesn't trigger
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      clearTimeout(fallbackTimer);
    };
  }, []);
  if (loading) {
    return (
      <div 
        ref={donationRef}
        className={`${styles.donation} ${isVisible ? styles.animated : ''}`}
      >
        <div className={`${styles.carouselWrapper} ${isVisible ? styles.wrapperAnimated : ''}`}>
          <h2 className={`${styles.sectionTitle} ${isVisible ? styles.titleAnimated : ''}`}>Our Latest Causes</h2>
          <p className={`${styles.sectionDescription} ${isVisible ? styles.descriptionAnimated : ''}`}>
            Loading our latest causes...
          </p>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        ref={donationRef}
        className={`${styles.donation} ${isVisible ? styles.animated : ''}`}
      >
        <div className={`${styles.carouselWrapper} ${isVisible ? styles.wrapperAnimated : ''}`}>
          <h2 className={`${styles.sectionTitle} ${isVisible ? styles.titleAnimated : ''}`}>Our Latest Causes</h2>
          <p className={`${styles.sectionDescription} ${isVisible ? styles.descriptionAnimated : ''}`}>
            Error loading causes: {error}
          </p>
        </div>
      </div>
    );
  }

  if (!causes || causes.length === 0) {
    return (
      <div 
        ref={donationRef}
        className={`${styles.donation} ${isVisible ? styles.animated : ''}`}
      >
        <div className={`${styles.carouselWrapper} ${isVisible ? styles.wrapperAnimated : ''}`}>
          <h2 className={`${styles.sectionTitle} ${isVisible ? styles.titleAnimated : ''}`}>Our Latest Causes</h2>
          <p className={`${styles.sectionDescription} ${isVisible ? styles.descriptionAnimated : ''}`}>
            No causes available at the moment.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div 
      ref={donationRef}
      className={`${styles.donation} ${isVisible ? styles.animated : ''}`}
    >
    <div className={`${styles.carouselWrapper} ${isVisible ? styles.wrapperAnimated : ''}`}>
      <h2 className={`${styles.sectionTitle} ${isVisible ? styles.titleAnimated : ''}`}>Our Latest Causes</h2>
      <p className={`${styles.sectionDescription} ${isVisible ? styles.descriptionAnimated : ''}`}>
        Sustainable livelihoods are key to long-term recovery. We empower individuals and families to rebuild their lives with lasting stability.      </p>
      
      <div className={`${isVisible ? styles.sliderAnimated : ''}`}>
        <Slider {...settings}>
        {causes.map((item: CauseItem) => {
          // Since CauseItem defines raised and goal as numbers, use them directly
          const raisedNum = typeof item.raised === 'number' ? item.raised : 0;
          const goalNum = typeof item.goal === 'number' ? item.goal : 1;
          
          const percentage = Math.min((raisedNum / goalNum) * 100, 100).toFixed(0);          return (            <div key={item.id} className={styles.slideContainer}>
              <div className={`${styles.causeCard} ${isVisible ? styles.cardAnimated : ''}`}>
                {/* Image with Category Tag */}
                <div className={styles.imageContainer}>
                  <span className={styles.categoryBadge}>
                    {item.category || 'Charity'}
                  </span>
                  <Image 
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={192}
                    className={styles.cardImage}
                    unoptimized={item.image.startsWith('.')}
                  />
                </div>

                {/* Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <SafeHTMLRenderer 
                    content={item.description}
                    className={styles.cardDescription}
                  />

                  {/* Progress Bar */}
                  <div className={styles.progressSection}>
                    <div className={styles.progressHeader}>
                      <span className={styles.progressLabel}>Progress</span>
                      <span className={styles.progressPercentage}>{percentage}%</span>
                    </div>
                    <div className={styles.progressBackground}>
                      <div
                        className={styles.progressFill}
                        data-progress={percentage}
                      ></div>
                    </div>
                  </div>

                  {/* Raised and Goal */}
                  <div className={styles.statsContainer}>
                    <div className={styles.statBox}>
                      <p className={styles.statLabel}>Raised</p>
                      <p className={styles.statValue}>
                        ${raisedNum.toLocaleString()}
                      </p>
                    </div>
                    <div className={styles.statBox}>
                      <p className={styles.statLabel}>Goal</p>
                      <p className={styles.statValue}>
                        ${goalNum.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={styles.actionsContainer}>
                    <button
                      className={styles.learnMoreButton}
                      onClick={() => router.push(`/causes/${item.id}`)}
                    >
                      Learn More
                    </button>
                    <button
                      className={styles.supportButton}
                      onClick={() => router.push(`/causes/${item.id}`)}
                    >
                      Support Cause
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );        })}
      </Slider>
      </div>
    </div>
    </div>
  );
};

export default DonationCarousel;