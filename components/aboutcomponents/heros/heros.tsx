'use client'
import React from 'react';

const HeroVideoSection: React.FC = () => {
  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

      {/* Text Content */}
      <div className="pt-16 relative z-20 flex items-center justify-center h-full text-center px-4">
        <div className="max-w-4xl text-white px-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-amber-300">
              About Our Mission
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            We are a charity organization committed to empowering communities
            through compassion, resources, and long-term support.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroVideoSection;