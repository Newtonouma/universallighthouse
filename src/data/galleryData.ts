// Gallery data types
export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  category?: string;
  isActive: boolean;
  order: number;
  dateAdded: string;
}

// Backend gallery item structure (from the API response)
export interface BackendGalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  createdAt: string;
  updatedAt: string;
}

// Sample gallery data
export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: '/images/gallery/community.jpg',
    alt: 'Community gathering at the Universal Lighthouse center',
    title: 'Community Gathering',
    description: 'Local families coming together for our monthly community celebration and support meeting.',
    category: 'Community',
    isActive: true,
    order: 1,
    dateAdded: '2024-11-01T10:00:00.000Z'
  },
  {
    id: 2,
    src: '/images/gallery/education.jpg',
    alt: 'Children participating in educational activities',
    title: 'Education Program',
    description: 'Young students engaged in our literacy and numeracy enhancement programs.',
    category: 'Education',
    isActive: true,
    order: 2,
    dateAdded: '2024-11-02T11:00:00.000Z'
  },
  {
    id: 3,
    src: '/images/gallery/health.jpg',
    alt: 'Healthcare volunteers providing medical assistance',
    title: 'Healthcare Outreach',
    description: 'Medical professionals volunteering their time to provide essential healthcare services.',
    category: 'Health',
    isActive: true,
    order: 3,
    dateAdded: '2024-11-03T09:00:00.000Z'
  },
  {
    id: 4,
    src: '/images/gallery/cycling.jpg',
    alt: 'Community cycling event for fitness and fun',
    title: 'Wellness Cycling Event',
    description: 'Community members participating in our monthly cycling event to promote health and wellness.',
    category: 'Wellness',
    isActive: true,
    order: 4,
    dateAdded: '2024-11-04T08:00:00.000Z'
  },
  {
    id: 5,
    src: '/images/gallery/collaboration.jpg',
    alt: 'Volunteers working together on community projects',
    title: 'Volunteer Collaboration',
    description: 'Dedicated volunteers working together on various community improvement projects.',
    category: 'Volunteer',
    isActive: true,
    order: 5,
    dateAdded: '2024-11-05T12:00:00.000Z'
  },
  {
    id: 6,
    src: '/images/gallery/food-distribution.jpg',
    alt: 'Food distribution event helping families in need',
    title: 'Food Distribution',
    description: 'Regular food distribution events ensuring no family in our community goes hungry.',
    category: 'Support',
    isActive: true,
    order: 6,
    dateAdded: '2024-11-06T14:00:00.000Z'
  },
  {
    id: 7,
    src: '/images/gallery/arts.jpg',
    alt: 'Local artists showcasing their work',
    title: 'Arts & Culture',
    description: 'Celebrating local talent and cultural diversity through art exhibitions and performances.',
    category: 'Culture',
    isActive: true,
    order: 7,
    dateAdded: '2024-11-07T16:00:00.000Z'
  },
  {
    id: 8,
    src: '/images/gallery/sustainability.jpg',
    alt: 'Community garden and sustainable living practices',
    title: 'Sustainable Living',
    description: 'Community garden project promoting sustainable living and environmental awareness.',
    category: 'Environment',
    isActive: true,
    order: 8,
    dateAdded: '2024-11-08T10:30:00.000Z'
  }
];
