'use client';
import React from 'react';
import Navbar from '../../../components/navbar/navbar';
import Footer from '../../../components/footer/footer';
import PhotoGallery from '../../../components/home/gallery/gallery';

const GalleryPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-20">
        <PhotoGallery />
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;
