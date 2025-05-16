'use client';
import React from 'react';
import './gallary.module.css'; 

const images = [
  '/assets/gallery1.jpg',
  '/assets/gallery2.jpg',
  '/assets/gallery3.jpg',
  '/assets/gallery4.jpg',
  '/assets/gallery5.jpg',
  '/assets/gallery6.jpg',
];

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Gallery</h2>

        {/* Grid for medium and up */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md">
              <img
                src={src}
                alt={`Charity image ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Carousel for small screens */}
        <div className="md:hidden carousel-wrapper relative overflow-hidden">
          <div className="carousel-track flex">
            {images.map((src, index) => (
              <div key={index} className="carousel-slide w-full flex-shrink-0 px-2">
                <img
                  src={src}
                  alt={`Charity carousel image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
