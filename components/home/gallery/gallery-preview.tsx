'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './gallery.css';
import { useGallery } from '../../../src/hooks/useGallery';
import { useScrollAnimation, useStaggeredAnimation } from '../../../src/hooks/useScrollAnimation';

const HomeGalleryPreview: React.FC = () => {
  const { galleryItems, loading, error } = useGallery();
  
  // Calculate items for 2 rows - assuming average 4-5 items per row on desktop
  const maxItemsToShow = 8;
  const limitedItems = galleryItems.slice(0, maxItemsToShow);
  
  // Scroll animations
  const { ref: containerRef, isVisible } = useScrollAnimation({ threshold: 0.1, retriggerOnScroll: true });
  const { ref: galleryRef, visibleItems } = useStaggeredAnimation(limitedItems.length, 150, true);

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

        <div className={`gallery gallery-preview ${isVisible ? 'gallery-animated' : ''}`} ref={galleryRef}>
          {limitedItems.map((item, index) => (
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

        {/* View More Button */}
        {galleryItems.length > maxItemsToShow && (
          <div className={`view-more-container ${isVisible ? 'view-more-animated' : ''}`}>
            <Link href="/gallery" className="view-more-btn">
              <span>View All Gallery</span>
              <svg 
                className="ml-2 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="view-more-text">
              Showing {limitedItems.length} of {galleryItems.length} images
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomeGalleryPreview;
