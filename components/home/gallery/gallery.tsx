'use client';
import React from 'react';
import Image from 'next/image';
import './gallery.css';
import { useGallery } from '../../../src/hooks/useGallery';
import { useScrollAnimation, useStaggeredAnimation } from '../../../src/hooks/useScrollAnimation';

const PhotoGallery: React.FC = () => {
  const { galleryItems, loading, error } = useGallery();
  // Scroll animations
  const { ref: containerRef, isVisible } = useScrollAnimation({ threshold: 0.1, retriggerOnScroll: true });
  const { ref: galleryRef, visibleItems } = useStaggeredAnimation(galleryItems.length, 150, true);

  if (loading) {
    return (
      <div className="app-container">
        <main className="main">
          <header className="gallery-header">
            <h1>Photo Gallery</h1>
            <p className="subtitle">Loading our gallery...</p>
          </header>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <main className="main">
          <header className="gallery-header">
            <h1>Photo Gallery</h1>
            <p className="subtitle">Error loading gallery: {error}</p>
          </header>
        </main>
      </div>
    );
  }

  return (
    <div className={`app-container ${isVisible ? 'animated' : ''}`} ref={containerRef}>
      <main className={`main ${isVisible ? 'main-animated' : ''}`}>
        <header className={`gallery-header ${isVisible ? 'header-animated' : ''}`}>
          <h1>Photo Gallery</h1>
          <p className="subtitle">Witness the power of compassion in action. These moments capture the real difference your generosity makes every day.</p>
        </header>

        <div className={`gallery ${isVisible ? 'gallery-animated' : ''}`} ref={galleryRef}>
          {galleryItems.map((item, index) => (
            <figure 
              key={item.id} 
              className={`gallery-item ${visibleItems.includes(index) ? 'item-animated' : ''}`}
            >
              <Image 
                src={item.src}
                alt={item.alt}
                width={400}
                height={300}
                className="gallery-image"
                loading="lazy"
                unoptimized={item.src.startsWith('http')}
              />
              <figcaption className="image-caption">
                <h3 className="caption-title">{item.title}</h3>
                <p className="caption-description">{item.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PhotoGallery;