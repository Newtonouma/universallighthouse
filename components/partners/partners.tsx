import React from 'react';
import './partner.css'; // We'll create this CSS file next

const Slider: React.FC = () => {
  const slides = [
    { id: 1, src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png' },
    { id: 2, src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png' },
    { id: 3, src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png' },
    { id: 4, src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png' },
    { id: 5, src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png' },
    { id: 6, src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png' },
    { id: 7, src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png' }
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