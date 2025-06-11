'use client';
import React, { useState } from 'react';
import Slider from 'react-slick';
import styles from './teams.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { useTeamMembers } from '../../../src/hooks/useTeamMembers';
import { useScrollAnimation, useStaggeredAnimation } from '../../../src/hooks/useScrollAnimation';

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

// Define SVG icons directly in the component
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const TeamsComponent = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');  const { teamMembers, loading, error } = useTeamMembers(activeCategory);
  // Scroll animations
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1, retriggerOnScroll: true });
  const { ref: cardsRef, visibleItems } = useStaggeredAnimation(6, 200, true);

  if (loading) {
    return (
      <section className={styles.teamsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Team</h2>
            <p className={styles.sectionSubtitle}>Loading our amazing team...</p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.teamsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Team</h2>
            <p className={styles.sectionSubtitle}>Error loading team: {error}</p>
          </div>
        </div>
      </section>
    );
  }  // Enhanced category generation with better deduplication
  const categories = [
    'All', 
    ...new Set(
      teamMembers
        .map(member => member.description?.trim()) // Remove whitespace
        .filter(desc => desc && desc.length > 0) // Remove empty descriptions
        .map(desc => desc!) // TypeScript assertion after filter
    )
  ];
    // Enhanced filtering with case-insensitive and whitespace-resistant comparison
  const filteredMembers = activeCategory === 'All' 
    ? teamMembers 
    : teamMembers.filter(member => 
        member.description?.trim().toLowerCase() === activeCategory.toLowerCase().trim()
      );
  // Dynamic carousel settings based on the number of filtered members
  const getCarouselSettings = () => {
    const memberCount = filteredMembers.length;
    const baseSlidesToShow = Math.min(memberCount, 3); // Never show more slides than available members
    
    return {
      dots: memberCount > 1,
      infinite: memberCount > 3, // Only enable infinite scroll if we have more than 3 members
      speed: 500,
      slidesToShow: baseSlidesToShow,
      slidesToScroll: 1,
      centerMode: memberCount === 1, // Center single items
      centerPadding: memberCount === 1 ? '0px' : '0',
      variableWidth: false,
      autoplay: memberCount > 1, // Only autoplay if we have more than 1 member
      autoplaySpeed: 4000,
      pauseOnHover: true,
      pauseOnFocus: true,
      arrows: memberCount > baseSlidesToShow, // Only show arrows if there are more members than visible
      swipeToSlide: memberCount > 1,
      focusOnSelect: false,
      prevArrow: <CustomPrevArrow />,
      nextArrow: <CustomNextArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: Math.min(memberCount, 2),
            centerMode: memberCount === 1,
            centerPadding: memberCount === 1 ? '0px' : '0',
            infinite: memberCount > 2,
            arrows: memberCount > Math.min(memberCount, 2),
            autoplay: memberCount > 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: '0px',
            infinite: memberCount > 1,
            arrows: memberCount > 1,
            autoplay: memberCount > 1
          }
        }
      ]
    };
  };

  return (
    <section 
      className={`${styles.teamsSection} ${isVisible ? styles.animated : ''}`} 
      ref={sectionRef}
    >
      <div className={`${styles.container} ${isVisible ? styles.containerAnimated : ''}`}>
        <div className={`${styles.sectionHeader} ${isVisible ? styles.headerAnimated : ''}`}>
          <h2 className={styles.sectionTitle}>Our Team</h2>
          <p className={styles.sectionSubtitle}>At the heart of our organization is a dedicated team committed to creating lasting change. Each member brings unique expertise, compassion, and leadership working together to uplift communities, advocate for rights, and ensure every voice is heard.</p>
        </div>        <div className={`${styles.departmentFilters} ${isVisible ? styles.filtersAnimated : ''}`}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterButton} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>        {filteredMembers.length === 0 ? (
          <div className={`${styles.noResults} ${isVisible ? styles.noResultsAnimated : ''}`}>
            <p>No team members found for &ldquo;{activeCategory}&rdquo; category.</p>
          </div>
        ) : (
          <div 
            className={`${styles.carouselWrapper} ${isVisible ? styles.carouselAnimated : ''}`}
            ref={cardsRef}
          >
            <Slider {...getCarouselSettings()}>
            {filteredMembers.map((member, index) => (
              <div 
                key={member.id} 
                className={styles.slideContainer}
              >
                <div className={`${styles.teamCard} ${
                  visibleItems.includes(index) ? styles.cardAnimated : ''
                }`}>
                  <div className={styles.cardImage}>
                    <Image 
                      src={member.imageUrl}
                      alt={member.name}
                      width={200}
                      height={200}
                      className={styles.memberImage}
                      unoptimized={member.imageUrl.startsWith('http')}
                    />
                    <div className={styles.socialLinks}>
                      {member.facebook && (
                        <a href={member.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Facebook`}>
                          <FacebookIcon />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Twitter`}>
                          <TwitterIcon />
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`}>
                          <LinkedInIcon />
                        </a>
                      )}
                      {member.tiktok && (
                        <a href={member.tiktok} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} TikTok`}>
                          <TikTokIcon />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardName}>{member.name}</h3>
                    <p className={styles.cardPosition}>{member.description}</p>
                    
                    {/* Contact Information */}
                    <div className={styles.contactInfo}>
                      {member.contact && (
                        <div className={styles.contactItem}>
                          <PhoneIcon />
                          <span>{member.contact}</span>
                        </div>
                      )}
                      {member.email && (
                        <div className={styles.contactItem}>
                          <EmailIcon />
                          <span>{member.email}</span>
                        </div>
                      )}                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamsComponent;
