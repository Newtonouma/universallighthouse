'use client';
import React from 'react';
import Image from 'next/image';
import './partner.css';
import { partnersData } from '../../src/data/partnersData';

const PartnerCarousel: React.FC = () => {
  const partners = partnersData.filter(partner => partner.isActive).sort((a, b) => a.order - b.order);
  // Duplicate for seamless looping
  const partnerLogos = [...partners, ...partners];

  return (
    <section className="partners-section">
      <div className="partners-container">
        <h2 className="partners-title">Our Trusted Partners</h2>
        <div className="partners-carousel">
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