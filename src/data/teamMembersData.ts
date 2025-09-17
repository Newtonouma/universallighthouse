export interface TeamMember {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  contact?: string;
  email?: string;
  facebook?: string;
  tiktok?: string;
  twitter?: string;
  linkedin?: string;
}

// Sample team members data
export const teamMembers: TeamMember[] = [
  {
    id: 'emmily-akech',
    name: 'Emmily Akech',
    description: 'Founder & Director',
    imageUrl: '/images/team/emmily-akech.jpg',
    email: 'emmily.akech@universallighthouse.org',
    linkedin: 'https://linkedin.com/in/emmilyakech',
    twitter: 'https://twitter.com/emmilyakech'
  },
  {
    id: 'sylvia-otieno',
    name: 'Sylvia Otieno',
    description: 'Program Coordinator',
    imageUrl: '/images/team/sylvia-otieno.jpg',
    email: 'sylvia.otieno@universallighthouse.org',
    facebook: 'https://facebook.com/sylviaotieno',
    linkedin: 'https://linkedin.com/in/sylviaotieno'
  },
  {
    id: 'austine-liganda',
    name: 'Austine Liganda',
    description: 'Orthopedic Technologist',
    imageUrl: '/images/team/austine-liganda.jpg',
    email: 'austine.liganda@universallighthouse.org',
    contact: '+254 712 345 678',
    linkedin: 'https://linkedin.com/in/austineliganda'
  },
  {
    id: 'peter-otieno',
    name: 'Peter Otieno',
    description: 'Finance Manager',
    imageUrl: '/images/team/peter-otieno.jpg',
    email: 'peter.otieno@universallighthouse.org',
    linkedin: 'https://linkedin.com/in/peterotieno',
    contact: '+254 723 456 789'
  },
  {
    id: 'sylvia-oyugi',
    name: 'Sylvia Oyugi',
    description: 'Social Worker & Peer Counselor',
    imageUrl: '/images/team/sylvia-oyugi.jpg',
    email: 'sylvia.oyugi@universallighthouse.org',
    facebook: 'https://facebook.com/sylviaoyugi',
    linkedin: 'https://linkedin.com/in/sylviaoyugi'
  },
  {
    id: 'ellias-oriya',
    name: 'Ellias Oriya',
    description: 'Community Liaison Officer',
    imageUrl: '/images/team/ellias-oriya.jpg',
    email: 'ellias.oriya@universallighthouse.org',
    contact: '+254 734 567 890',
    twitter: 'https://twitter.com/elliasoriya'
  },
  {
    id: 'john-atwete',
    name: 'John Atwete',
    description: 'Monitoring and Evaluation',
    imageUrl: '/images/team/john-atwete.jpg',
    email: 'john.atwete@universallighthouse.org',
    linkedin: 'https://linkedin.com/in/johnatwete',
    contact: '+254 745 678 901'
  },
  {
    id: 'newton-ouma',
    name: 'Newton Ouma',
    description: 'IT Services',
    imageUrl: '/images/team/newton-ouma.jpg',
    email: 'newton.ouma@universallighthouse.org',
    twitter: 'https://twitter.com/newtonouma',
    linkedin: 'https://linkedin.com/in/newtonouma'
  }
];