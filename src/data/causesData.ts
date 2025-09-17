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
    id: 'restoring-mobility-limb-loss',
    title: 'Restoring Mobility for Limb Loss Survivors',
    raised: 23500,
    goal: 50000,
    category: 'Medical Support',
    description: `
      <p><strong>Providing access to quality prosthetic limbs and assistive devices for amputees in Western Kenya who cannot afford them.</strong></p>
      
      <h3>Challenge Statement</h3>
      <p>The high cost and poor availability of prosthetics block rehabilitation and independence.</p>
      
      <h3>Our Response</h3>
      <p>Local workshop, technician support, and partnerships (like STAND) to deliver quality limbs.</p>
      
      <h3>Impact</h3>
      <p>Number of clients served, testimonials, before-and-after stories.</p>
      
      <h3>How You Can Help</h3>
      <p>Donate components, fund fittings, volunteer expertise.</p>
    `,
    image: '/images/causes/RestoringMobilityforLimbLossSurvivors.jpg',
  },
  {
    id: 'holistic-rehabilitation-mental-health',
    title: 'Holistic Rehabilitation – Mental Health & Nutrition',
    raised: 18750,
    goal: 35000,
    category: 'Mental Health',
    description: `
      <p><strong>Supporting emotional healing and physical wellness through psychosocial support groups and accessible nutrition education.</strong></p>
      
      <h3>The Need</h3>
      <p>Disability-related trauma and malnutrition worsen outcomes.</p>
      
      <h3>Our Approach</h3>
      <p>Peer-led circles, mental health talks, and basic nutrition sessions for families and clients.</p>
      
      <h3>Impact</h3>
      <p>Better mental health outcomes, community resilience, and improved recovery.</p>
      
      <h3>Get Involved</h3>
      <p>Sponsor support groups, donate wellness kits, collaborate on campaigns.</p>
    `,
    image: '/images/causes/HolisticRehabilitation-MentalHealth-Nutrition.jpg',
  },
  {
    id: 'empowering-caregivers-advocates',
    title: 'Empowering Caregivers & Community Advocates',
    raised: 14200,
    goal: 28000,
    category: 'Education & Training',
    description: `
      <p><strong>Training caregivers and grassroots leaders to become champions of inclusion and support systems for persons with disabilities.</strong></p>
      
      <h3>The Gap</h3>
      <p>Families lack guidance and support; communities lack training.</p>
      
      <h3>Our Solution</h3>
      <p>Disability rights workshops, practical caregiving skills, advocacy mentoring.</p>
      
      <h3>Impact</h3>
      <p>Trained caregivers, visible champions, stronger community support.</p>
      
      <h3>Ways to Support</h3>
      <p>Fund trainings, provide venues, offer technical expertise.</p>
    `,
    image: '/images/causes/EmpoweringCaregivers-CommunityAdvocates.jpg',
  },
  {
    id: 'economic-empowerment-disabilities',
    title: 'Economic Empowerment for Persons with Disabilities',
    raised: 26800,
    goal: 42000,
    category: 'Economic Development',
    description: `
      <p><strong>Breaking cycles of poverty by offering business skills, digital literacy, and training in accessible income-generating activities.</strong></p>
      
      <h3>The Challenge</h3>
      <p>Limb loss leads to income loss and financial exclusion.</p>
      
      <h3>Our Initiative</h3>
      <p>Vocational workshops, self-employment toolkits, business mentorship.</p>
      
      <h3>Impact</h3>
      <p>Clients who started businesses or re-entered jobs.</p>
      
      <h3>Partner with Us</h3>
      <p>Sponsor trainings, mentor entrepreneurs, provide market access.</p>
    `,
    image: '/images/causes/HolisticRehabilitation-MentalHealth-Nutrition.jpg',
  },
  {
    id: 'advocacy-inclusive-health-policy',
    title: 'Advocacy for Inclusive Health & Policy Reform',
    raised: 31200,
    goal: 60000,
    category: 'Policy & Advocacy',
    description: `
      <p><strong>Pushing for disability-inclusive budgeting, policy change, and equitable service delivery at county and national levels.</strong></p>
      
      <h3>The Problem</h3>
      <p>PWDs excluded from planning and budgets.</p>
      
      <h3>Our Strategy</h3>
      <p>Budget advocacy, community-led monitoring, stakeholder engagement.</p>
      
      <h3>Impact</h3>
      <p>Kisumu County funding win, disability health financing bill draft, trained budget monitors.</p>
      
      <h3>Support the Movement</h3>
      <p>Sign petitions, fund campaigns, join coalitions.</p>
    `,
    image: '/images/causes/EmpoweringCaregivers-CommunityAdvocates.jpg',
  },
];