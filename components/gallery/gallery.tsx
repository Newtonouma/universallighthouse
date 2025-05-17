import React from 'react';
import './gallery.css';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

const PhotoGallery: React.FC = () => {
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1458668383970-8ddd3927deed',
      alt: 'Mountains landscape',
      title: 'Mountains',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8',
      alt: 'Classic automobile',
      title: 'Automobile',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1466970601638-4e5fb6556584',
      alt: 'Mountain road',
      title: 'Mountains',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      alt: 'Mountain peak',
      title: 'Mountains',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e',
      alt: 'Bicycle on street',
      title: 'Bicycle',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf',
      alt: 'Office workspace',
      title: 'Office',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1532103054090-3491f1a05d0d',
      alt: 'Modern office',
      title: 'Office',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1599033153041-e88627ca70bb',
      alt: 'City buildings',
      title: 'Cityscape',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    }
  ];

  return (
    <div className="app-container">
      <main className="main">
        <header className="gallery-header">
          <h1>Modern Photo Gallery</h1>
          <p className="subtitle">A curated collection of beautiful moments</p>
        </header>

        <div className="gallery">
          {galleryItems.map((item) => (
            <figure key={item.id} className="gallery-item">
              <img 
                src={item.src} 
                alt={item.alt}
                loading="lazy"
                className="gallery-image"
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