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
    src: './images/gallery/ruralempowering.jpg',
    alt: 'Community outreach in rural area',
    title: 'Rural Outreach Program',
    description: 'Empowering remote communities through education, food distribution, and mental health support.'
  },
  {
    id: 2,
    src: './images/gallery/mobilehealth.jpg',
    alt: 'Mobile health van',
    title: 'Mobile Health Drive',
    description: 'Bringing essential healthcare and counseling services directly to underserved neighborhoods.'
  },
  {
    id: 3,
    src: './images/gallery/volunteer.jpg',
    alt: 'Volunteers on the move',
    title: 'Youth Volunteer Mission',
    description: 'Young changemakers working together to uplift vulnerable families and children.'
  },
  {
    id: 4,
    src: '/images/gallery/gendersummit.jpg',
    alt: 'Empowered woman at a peak',
    title: 'Gender Empowerment Summit',
    description: 'Creating safe spaces for women and girls to learn, lead, and thrive in their communities.'
  },
  {
    id: 5,
    src: './images/gallery/cycling.jpg',
    alt: 'Youth on a bicycle',
    title: 'Cycle for Change',
    description: 'A charity ride event raising awareness and support for mental wellness among youth.'
  },
  {
    id: 6,
    src: './images/gallery/training.jpg',
    alt: 'Training workshop',
    title: 'Empowerment Workshop',
    description: 'Training sessions equipping community leaders with advocacy, finance, and communication skills.'
  },
  {
    id: 7,
    src: './images/gallery/collaboration.jpg',
    alt: 'Office collaboration',
    title: 'Team Strategy Meeting',
    description: 'Our leadership team brainstorming sustainable solutions to social challenges.'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1599033153041-e88627ca70bb',
    alt: './images/gallery/urban.jpg',
    title: 'Urban Impact Project',
    description: 'Supporting inner-city youth through after-school programs, mentorship, and safe shelters.'
  }
  ];

  return (
    <div className="app-container">
      <main className="main">
        <header className="gallery-header">
          <h1>Photo Gallery</h1>
          <p className="subtitle">Witness the power of compassion in action. These moments capture the real difference your generosity makes every day.</p>
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