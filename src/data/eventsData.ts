// Event data structure based on external backend API
export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  endTime: string; // ISO date string
  location: string;
  imageUrl: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Additional interface for frontend component compatibility
export interface EventItemFormatted extends EventItem {
  shortDescription?: string;
  time?: string; // Formatted time range
  category?: string;
}

// API Response types
export interface EventsApiResponse {
  success: boolean;
  data: EventItem[];
  error?: string;
  total?: number;
}

export interface EventApiResponse {
  success: boolean;
  data: EventItem;
  error?: string;
}

// Sample events data
export const events: EventItem[] = [
  {
    id: 'prosthetic-orthopedic-medical-camp',
    title: 'Prosthetic & Orthopedic Medical Camp',
    description: 'A full-day camp offering free prosthetic assessments, mobility consultations, orthopedic screenings, and rehabilitation referrals for persons with disabilities (PWDs) and mobility impairments.',
    date: '2025-10-15T09:00:00.000Z', // Keep for compatibility, but frequency is "Twice a year"
    endTime: '2025-10-15T17:00:00.000Z',
    location: 'ULH Workshop Grounds – Mountain View Estate, Kisumu',
    imageUrl: '/images/gallery/medical-camp.jpg',
    createdAt: '2025-09-01T10:00:00.000Z',
    updatedAt: '2025-09-01T10:00:00.000Z'
  },
  {
    id: 'peer-support-circles-amputees',
    title: 'Peer Support Circles for Amputees',
    description: 'Safe, peer-led sessions where limb loss survivors share experiences, receive psychosocial support, and connect with mentors who\'ve walked the same path.',
    date: '2025-10-22T14:00:00.000Z', // Keep for compatibility, but frequency is "Twice per quarter"
    endTime: '2025-10-22T16:00:00.000Z',
    location: 'ULH Counseling Room - Mountain View Estate, Kisumu',
    imageUrl: '/images/gallery/peer-support.jpg',
    createdAt: '2025-09-02T09:00:00.000Z',
    updatedAt: '2025-09-02T09:00:00.000Z'
  },
  {
    id: 'mobility-wellness-days',
    title: 'Mobility & Wellness Days',
    description: 'Community outreach days combining mobile service access, public education, and on-the-ground demonstrations of assistive devices and mental health support.',
    date: '2025-11-05T10:00:00.000Z', // Keep for compatibility, but frequency is "Monthly"
    endTime: '2025-11-05T15:00:00.000Z',
    location: 'Rotating venues across Kisumu and Nyanza',
    imageUrl: '/images/gallery/mobility-wellness.jpg',
    createdAt: '2025-09-03T08:00:00.000Z',
    updatedAt: '2025-09-03T08:00:00.000Z'
  },
  {
    id: 'social-media-voices-inclusion',
    title: 'Social Media Voices for Inclusion – Podcast, Radio talks etc',
    description: 'A storytelling radio series featuring disability champions, advocacy wins, and survivor journeys—designed to dismantle stigma and inspire action.',
    date: '2025-11-12T18:00:00.000Z', // Keep for compatibility, but frequency is "Monthly Broadcast"
    endTime: '2025-11-12T19:00:00.000Z',
    location: 'Radio Broadcast & Online Platforms',
    imageUrl: '/images/gallery/radio-podcast.jpg',
    createdAt: '2025-09-04T11:00:00.000Z',
    updatedAt: '2025-09-04T11:00:00.000Z'
  },
  {
    id: 'caregiver-community-champion-training',
    title: 'Caregiver & Community Champion Training',
    description: 'Capacity-building workshops to equip frontline supporters with the tools, knowledge, and language needed to advocate, assist, and inspire.',
    date: '2025-12-03T09:00:00.000Z', // Keep for compatibility, but frequency is "Quarterly Sessions"
    endTime: '2025-12-03T16:00:00.000Z',
    location: 'ULH Training Center - Mountain View Estate, Kisumu',
    imageUrl: '/images/gallery/training.jpg',
    createdAt: '2025-09-05T12:00:00.000Z',
    updatedAt: '2025-09-05T12:00:00.000Z'
  },
  {
    id: 'skills-dignity-vocational-workshops',
    title: 'Skills for Dignity – Vocational Empowerment Workshops',
    description: 'Practical skills trainings for persons with disabilities to rebuild financial independence and explore accessible income options.',
    date: '2025-12-17T08:30:00.000Z', // Keep for compatibility, but frequency is "Once per quarter"
    endTime: '2025-12-17T16:30:00.000Z',
    location: 'ULH Skills Development Center - Mountain View Estate, Kisumu',
    imageUrl: '/images/gallery/vocational-training.jpg',
    createdAt: '2025-09-06T10:30:00.000Z',
    updatedAt: '2025-09-06T10:30:00.000Z'
  }
];
