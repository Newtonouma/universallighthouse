'use client';
import React from 'react';
import Image from 'next/image';
import './partner.css';
import { partnersData } from '../../src/data/partnersData';
import { useScrollAnimation } from '../../src/hooks/useScrollAnimation';

const PartnerCarousel: React.FC = () => {
  const partners = partnersData.filter(partner => partner.isActive).sort((a, b) => a.order - b.order);
  // Duplicate for seamless looping
  const partnerLogos = [...partners, ...partners];
  // Animation hooks
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ retriggerOnScroll: true });
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ retriggerOnScroll: true });
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation({ retriggerOnScroll: true });
  return (
    <section ref={sectionRef} className={`partners-section ${sectionVisible ? 'animate' : ''}`}>
      <div className="partners-container">
        <h2 ref={titleRef} className={`partners-title ${titleVisible ? 'animate' : ''}`}>Our Trusted Partners</h2>
        <div ref={carouselRef} className={`partners-carousel ${carouselVisible ? 'animate' : ''}`}>
          <div className="carousel-track">
            {partnerLogos.map((partner, index) => (
              <div className="carousel-slide" key={`${partner.id}-${index}`}>
                <Image 
                  src={partner.logoUrl}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="partner-logo"
                  loading="lazy"
                  unoptimized={partner.logoUrl.startsWith('.')}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerCarousel;