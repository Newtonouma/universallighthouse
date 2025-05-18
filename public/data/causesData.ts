// data/causes.ts
export type CauseItem = {
   id: string;
  title: string;
  raised: number;
  goal: number;
  category: string;
  description: string;
  image: string;
};

export const causes: CauseItem[] = [
  {
    id: '1',
    title: 'Psychosocial Support',
    raised: 70000,
    goal: 85000,
    category: 'Psychosocial Support',
    description: 'Long-term recovery requires sustainable livelihoods. We support individuals & families in rebuilding.',
    image: '/images/hero1.jpg',
  },
  {
    id: '2',
    title: 'Skills Empowerment for Independent Living',
    raised: 26000,
    goal: 90000,
    category: 'Skills Empowerment for Independent Living',
    description: 'Access healthcare becomes a lifeline in times of crisis. We offer medical support, mobile clinics, & mental health services.',
    image: '/images/hero2.jpg',
  },
  {
    id: '3',
    title: 'Limb Empowerment Initiative',
    raised: 40701,
    goal: 60000,
    category: 'Limb Empowerment Initiative',
    description: 'In the aftermath of a disaster access to nutritious food is often disrupted. We work to provide emergency meals.',
    image: '/images/hero3.jpg',
  },
  {
    id: '4',
    title: 'Mental Health Sand Counseling Services',
    raised: 18000,
    goal: 75000,
    category: 'Shelter',
    description: 'Rebuilding home & shelter essential for recovery. We help restore safe living conditions by offering temporary housing.',
    image: '/images/hero2.jpg',
  },
  {
    id: '5',
    title: 'Mental Health Sand Counseling Services',
    raised: 18000,
    goal: 75000,
    category: 'Shelter',
    description: 'Rebuilding home & shelter essential for recovery. We help restore safe living conditions by offering temporary housing.',
    image: '/images/hero2.jpg',
  },
  {
    id: '6',
    title: 'Hospital Visits for Newly Amputees',
    raised: 18000,
    goal: 75000,
    category: 'Hospital Visits for Newly Amputees',
    description: 'Rebuilding home & shelter essential for recovery. We help restore safe living conditions by offering temporary housing.',
    image: '/images/hero2.jpg',
  },
];