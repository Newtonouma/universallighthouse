import React from 'react';
import Image from 'next/image';
import './partner.css';

const PartnerCarousel: React.FC = () => {
  const partners = [
    { id: 1, src: './images/partners/apdk.jpg' },
    { id: 2, src: './images/partners/kisumucounty.jpg' },
    { id: 3, src: './images/partners/legs4africa.svg' },
    { id: 4, src: './images/partners/moh.png' },
    { id: 5, src: './images/partners/ncpd.webp' },
    { id: 6, src: './images/partners/redcross.jpg' },
    { id: 7, src: './images/partners/ugani.png' }
  ];

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
                  src={partner.src}
                  alt={`Partner Logo ${partner.id}`}
                  width={120}
                  height={60}
                  className="partner-logo"
                  loading="lazy"
                  unoptimized={partner.src.startsWith('.')}
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