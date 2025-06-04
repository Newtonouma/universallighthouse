"use client";
import React from 'react';
import Image from 'next/image';
import { useEvent } from '../../../../src/hooks/useEvents';
import { notFound } from 'next/navigation';
import Navbar from '../../../../components/navbar/navbar';
import Footer from '../../../../components/footer/footer';
import styles from './EventDetail.module.css';
import { useParams } from 'next/navigation';

const EventDetailPage: React.FC = () => {
  const params = useParams();
  const eventId = params.id as string;
  
  const { event, loading, error } = useEvent(eventId);

  if (!eventId || loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <p>Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    notFound();
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image 
            src={event.imageUrl || '/placeholder-event.jpg'} 
            alt={event.title}
            width={800}
            height={400}
            className={styles.eventImage}
          />
        </div>
        
        <h1 className={styles.title}>
          {event.title}
        </h1>
        
        <div className={styles.metadata}>
          <p className={styles.metaItem}>
            📅 {formatDateTime(event.date)}
          </p>
          <p className={styles.metaItem}>
            📍 {event.location}
          </p>
          <p className={styles.metaItem}>
            ⏰ Ends: {formatDateTime(event.endTime)}
          </p>
        </div>
        
        <div className={styles.description}>
          <p>{event.description}</p>
        </div>
        
        <div className={styles.actions}>
          <button 
            onClick={() => window.history.back()}
            className={styles.backButton}
          >
            Back to Events
          </button>
        </div>      </div>
      <Footer />
    </div>
  );
};

export default EventDetailPage;
