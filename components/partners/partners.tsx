import React from 'react';
import './partner.css'; // We'll create this CSS file next

const Slider: React.FC = () => {
  const slides = [
    { id: 1, src: './images/partners/apdk.jpg' },
    { id: 2, src: './images/partners/kisumucounty.jpg' },
    { id: 3, src: './images/partners/legs4africa.svg' },
    { id: 4, src: './images/partners/moh.png' },
    { id: 5, src: './images/partners/ncpd.webp' },
    { id: 6, src: './images/partners/redcross.jpg' },
    { id: 7, src: './images/partners/ugani.png' }
  ];

  // Duplicate the slides to create infinite loop effect
  const duplicatedSlides = [...slides, ...slides];

  return (
    <div className="slider-container">
      <div className="slider">
        <div className="slide-track">
          {duplicatedSlides.map((slide, index) => (
            <div className="slide" key={`${slide.id}-${index}`}>
              <img 
                src={slide.src} 
                height="100" 
                width="250" 
                alt={`Slide ${slide.id}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;