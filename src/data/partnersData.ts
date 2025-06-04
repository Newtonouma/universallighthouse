export interface Partner {
  id: number;
  name: string;
  logoUrl: string;
  website?: string;
  description?: string;
  category?: string;
  isActive: boolean;
  order: number;
}

export const partnersData: Partner[] = [
  {
    id: 1,
    name: 'Association of Persons with Physical Disability Kenya (APDK)',
    logoUrl: '/images/partners/apdk.jpg',
    website: 'https://apdk.or.ke/',
    description: 'Leading organization promoting rights and inclusion of persons with disabilities in Kenya',
    category: 'Disability Rights',
    isActive: true,
    order: 1
  },
  {
    id: 2,
    name: 'Kisumu County Government',
    logoUrl: '/images/partners/kisumucounty.jpg',
    website: 'https://kisumu.go.ke/',
    description: 'County government partnership for local healthcare initiatives',
    category: 'Government',
    isActive: true,
    order: 2
  },
  {
    id: 3,
    name: 'Legs4Africa',
    logoUrl: '/images/partners/legs4africa.svg',
    website: 'https://legs4africa.org/',
    description: 'Providing prosthetic limbs and mobility aids across Africa',
    category: 'Healthcare',
    isActive: true,
    order: 3
  },
  {
    id: 4,
    name: 'Ministry of Health - Kenya',
    logoUrl: '/images/partners/moh.png',
    website: 'https://www.health.go.ke/',
    description: 'National healthcare policy and program coordination',
    category: 'Government',
    isActive: true,
    order: 4
  },
  {
    id: 5,
    name: 'National Council for Persons with Disabilities (NCPD)',
    logoUrl: '/images/partners/ncpd.webp',
    website: 'https://ncpd.go.ke/',
    description: 'Government agency coordinating disability affairs in Kenya',
    category: 'Disability Rights',
    isActive: true,
    order: 5
  },
  {
    id: 6,
    name: 'Kenya Red Cross',
    logoUrl: '/images/partners/redcross.jpg',
    website: 'https://redcross.or.ke/',
    description: 'Humanitarian organization providing emergency response and healthcare',
    category: 'Humanitarian',
    isActive: true,
    order: 6
  },
  {
    id: 7,
    name: 'UGANI',
    logoUrl: '/images/partners/ugani.png',
    website: '',
    description: 'Community-based organization supporting disability inclusion',
    category: 'Community',
    isActive: true,
    order: 7
  }
];
