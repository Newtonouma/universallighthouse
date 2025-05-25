'use client';
import React, { useState } from 'react';
import styles from './teams.module.css';
import Image from 'next/image';

// Define SVG icons directly in the component
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  bio: string;
  imageUrl: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
  };
}

const TeamsComponent = () => {
  const teamData: TeamMember[] = [
     {
    id: 1,
    name: "Emmily Akech",
    position: "Founder and CEO",
    department: "Leadership",
    bio: "Championing community transformation with a vision for dignity and inclusiveness.",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop",
    socialLinks: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 2,
    name: "Sylvia Otieno",
    position: "Mental Health Expert",
    department: "Wellbeing",
    bio: "Dedicated to promoting mental wellness and emotional resilience in vulnerable communities.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop",
    socialLinks: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 3,
    name: "Peter Otieno",
    position: "Finance",
    department: "Finance",
    bio: "Ensuring transparency and accountability in our financial operations and resource allocation.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop",
    socialLinks: {
      linkedin: "#"
    }
  },
  {
    id: 4,
    name: "Erick Yogo",
    position: "Data and Communication",
    department: "Communications",
    bio: "Committed to impactful storytelling and data-driven outreach strategies for social change.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop",
    socialLinks: {
      twitter: "#"
    }
  },
  {
    id: 5,
    name: "Trizer Ogada",
    position: "Gender and SRHR Specialist",
    department: "Advocacy",
    bio: "Empowering women and youth through advocacy for sexual and reproductive health rights.",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop",
    socialLinks: {
      twitter: "#",
      linkedin: "#"
    }
  }
  ];

  const [activeDepartment, setActiveDepartment] = useState<string>('All');
  const [] = useState<number | null>(null); // ✅ fixed destructuring

  const departments = ['All', ...new Set(teamData.map(member => member.department))];
  const filteredMembers = activeDepartment === 'All' 
    ? teamData 
    : teamData.filter(member => member.department === activeDepartment);

  return (
    <section className={styles.teamsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Team</h2>
          <p className={styles.sectionSubtitle}>At the heart of our organization is a dedicated team committed to creating lasting change. Each member brings unique expertise, compassion, and leadership working together to uplift communities, advocate for rights, and ensure every voice is heard.</p>
        </div>

        <div className={styles.departmentFilters}>
          {departments.map(department => (
            <button
              key={department}
              className={`${styles.filterButton} ${activeDepartment === department ? styles.active : ''}`}
              onClick={() => setActiveDepartment(department)}
            >
              {department}
            </button>
          ))}
        </div>

        <div className={styles.teamCarousel}>
          {filteredMembers.map((member, index) => (
            <div 
              key={member.id}
              className={styles.teamCard}
              style={{ '--i': index } as React.CSSProperties}
            >
              <div className={styles.cardImage}>
                <Image 
                  src={member.imageUrl}
                  alt={member.name}
                  width={200}
                  height={200}
                  className={styles.cardImage}
                  unoptimized={member.imageUrl.startsWith('http')}
                />
                <div className={styles.socialLinks}>
                  {member.socialLinks.twitter && (
                    <a href={member.socialLinks.twitter} aria-label={`${member.name} Twitter`}>
                      <TwitterIcon />
                    </a>
                  )}
                  {member.socialLinks.linkedin && (
                    <a href={member.socialLinks.linkedin} aria-label={`${member.name} LinkedIn`}>
                      <LinkedInIcon />
                    </a>
                  )}
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardName}>{member.name}</h3>
                <p className={styles.cardPosition}>{member.position}</p>
                <p className={styles.cardDepartment}>{member.department}</p>
                <p className={styles.cardBio}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamsComponent;
