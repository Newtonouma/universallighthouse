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
    src: '/images/gallery/1.jpg',
    alt: 'Universal Lighthouse community program activities',
    title: 'Community Program',
    description: 'Active participation in our community support and empowerment programs.',
    category: 'Community',
    isActive: true,
    order: 1,
    dateAdded: '2024-11-01T10:00:00.000Z'
  },
  {
    id: 2,
    src: '/images/gallery/2.jpg',
    alt: 'Assistive device support and mobility aid distribution',
    title: 'Mobility Support',
    description: 'Providing essential mobility aids and assistive devices to those who need them most.',
    category: 'Support',
    isActive: true,
    order: 2,
    dateAdded: '2024-11-02T11:00:00.000Z'
  },
  {
    id: 3,
    src: '/images/gallery/3.jpg',
    alt: 'Healthcare and rehabilitation services',
    title: 'Healthcare Services',
    description: 'Comprehensive healthcare and rehabilitation support for limb loss survivors.',
    category: 'Health',
    isActive: true,
    order: 3,
    dateAdded: '2024-11-03T09:00:00.000Z'
  },
  {
    id: 4,
    src: '/images/gallery/4.jpg',
    alt: 'Training and skill development programs',
    title: 'Skills Development',
    description: 'Empowering individuals through vocational training and skill development programs.',
    category: 'Education',
    isActive: true,
    order: 4,
    dateAdded: '2024-11-04T08:00:00.000Z'
  },
  {
    id: 5,
    src: '/images/gallery/cycling.jpg',
    alt: 'Community cycling event for fitness and inclusion',
    title: 'Inclusive Cycling Event',
    description: 'Promoting fitness and inclusion through adaptive cycling programs for all abilities.',
    category: 'Wellness',
    isActive: true,
    order: 5,
    dateAdded: '2024-11-05T12:00:00.000Z'
  },
  {
    id: 6,
    src: '/images/gallery/collaboration.jpg',
    alt: 'Community collaboration and teamwork',
    title: 'Community Collaboration',
    description: 'Working together to build a more inclusive and supportive community for everyone.',
    category: 'Community',
    isActive: true,
    order: 6,
    dateAdded: '2024-11-06T14:00:00.000Z'
  },
  {
    id: 7,
    src: '/images/gallery/gendersummit.jpg',
    alt: 'Gender summit and empowerment conference',
    title: 'Gender Summit',
    description: 'Promoting gender equality and empowerment through awareness and advocacy.',
    category: 'Advocacy',
    isActive: true,
    order: 7,
    dateAdded: '2024-11-07T16:00:00.000Z'
  },
  {
    id: 8,
    src: '/images/gallery/mobilehealth.jpg',
    alt: 'Mobile health services reaching remote communities',
    title: 'Mobile Health Services',
    description: 'Bringing essential healthcare services directly to remote and underserved communities.',
    category: 'Health',
    isActive: true,
    order: 8,
    dateAdded: '2024-11-08T10:30:00.000Z'
  },
  {
    id: 9,
    src: '/images/gallery/ruralempowering.jpg',
    alt: 'Rural community empowerment programs',
    title: 'Rural Empowerment',
    description: 'Empowering rural communities through capacity building and resource support.',
    category: 'Empowerment',
    isActive: true,
    order: 9,
    dateAdded: '2024-11-09T13:00:00.000Z'
  },
  {
    id: 10,
    src: '/images/gallery/training.jpg',
    alt: 'Professional training and capacity building',
    title: 'Professional Training',
    description: 'Comprehensive training programs to build capacity and professional skills.',
    category: 'Education',
    isActive: true,
    order: 10,
    dateAdded: '2024-11-10T15:00:00.000Z'
  },
  {
    id: 11,
    src: '/images/gallery/urban.jpg',
    alt: 'Urban community development initiatives',
    title: 'Urban Development',
    description: 'Supporting urban communities through targeted development and support initiatives.',
    category: 'Development',
    isActive: true,
    order: 11,
    dateAdded: '2024-11-11T09:30:00.000Z'
  },
  {
    id: 12,
    src: '/images/gallery/volunteer.jpg',
    alt: 'Dedicated volunteers making a difference',
    title: 'Volunteer Impact',
    description: 'Our amazing volunteers who dedicate their time and energy to transforming lives.',
    category: 'Volunteer',
    isActive: true,
    order: 12,
    dateAdded: '2024-11-12T11:45:00.000Z'
  }
];
