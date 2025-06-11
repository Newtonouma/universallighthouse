"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useEvents } from '../../../src/hooks/useEvents';
import { EventItemFormatted } from '../../../src/data/eventsData';
import styles from './events.module.css';
import { useScrollAnimation, useStaggeredAnimation } from '../../../src/hooks/useScrollAnimation';

const EventsComponent: React.FC = () => {
  const { events, loading, error } = useEvents();
  const [activeEvent, setActiveEvent] = useState<EventItemFormatted | null>(null);
  const eventImageRef = useRef<HTMLDivElement>(null);
  // Scroll animations - retrigger on every downward scroll
  const { ref: sectionRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1, 
    retriggerOnScroll: true 
  });
  const { ref: eventsListRef, visibleItems } = useStaggeredAnimation(4, 200, true);

  useEffect(() => {
    // Set the first event as active by default
    if (events.length > 0 && !activeEvent) {
      setActiveEvent(events[0]);
    }
  }, [events, activeEvent]);

  useEffect(() => {
    // Set background image using JavaScript to avoid inline styles
    if (activeEvent && eventImageRef.current) {
      eventImageRef.current.style.backgroundImage = 
        `url(${activeEvent.imageUrl || '/placeholder-event.jpg'})`;
    }
  }, [activeEvent]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  const formatTimeFromISOString = (dateString: string, endTimeString: string) => {
    const startDate = new Date(dateString);
    const endDate = new Date(endTimeString);
    
    const startTime = startDate.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
    const endTime = endDate.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
    
    return `${startTime} - ${endTime}`;
  };

  const getEventStatus = (eventDate: string, endTime: string) => {
    const today = new Date().toISOString().split('T')[0];
    const eventDateOnly = eventDate.split('T')[0];
    
    if (eventDateOnly === today) {
      const now = new Date();
      const startDate = new Date(eventDate);
      const endDate = new Date(endTime);
      
      if (now >= startDate && now <= endDate) {
        return "Ongoing";
      } else if (now < startDate) {
        const startTime = startDate.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        });
        return `Today at ${startTime}`;
      } else {
        return "Ended";
      }
    }
    
    return formatDate(eventDate);
  };

  const getShortDescription = (description: string, maxLength: number = 150) => {
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength).trim() + '...';
  };
  if (loading) {
    return (
      <section className={styles.eventsSection}>
        <div className={styles.eventsContainer}>
          <div className={styles.loadingState}>
            <p>Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.eventsSection}>
        <div className={styles.eventsContainer}>
          <div className={styles.errorState}>
            <p>Error loading events: {error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </div>
      </section>
    );
  }
  if (events.length === 0) {
    return (
      <section className={styles.eventsSection}>
        <div className={styles.eventsContainer}>
          <div className={styles.emptyState}>
            <p>No upcoming events at the moment. Check back soon for new events!</p>
          </div>
        </div>
      </section>
    );
  }return (
    <section 
      ref={sectionRef}
      className={`${styles.eventsSection} ${isVisible ? styles.animated : ''}`}
    >
      <div className={`${styles.eventsContainer} ${isVisible ? styles.containerAnimated : ''}`}>
        {/* Left Section */}
        <div className={`${styles.leftSection} ${isVisible ? styles.leftAnimated : ''}`}>
          {activeEvent && (
            <>
              <div 
                ref={eventImageRef}
                className={`${styles.eventImage} ${isVisible ? styles.imageAnimated : ''}`}
              >
                <div className={styles.imageOverlay}></div>
                <div className={styles.eventCategory}>Event</div>
              </div>
              <div className={`${styles.eventContent} ${isVisible ? styles.contentAnimated : ''}`}>
                <h2 className={styles.eventTitle}>{activeEvent.title}</h2>
                <p className={styles.eventDescription}>{activeEvent.description}</p>
                <p className={styles.eventShortDescription}>
                  {getShortDescription(activeEvent.description)}
                </p>
                <div className={styles.eventDetails}>
                  <p className={styles.eventLocation}>📍 {activeEvent.location}</p>
                  <p className={styles.eventTime}>
                    🕒 {formatTimeFromISOString(activeEvent.date, activeEvent.endTime)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Middle Section */}
        <div 
          ref={eventsListRef}
          className={`${styles.middleSection} ${isVisible ? styles.middleAnimated : ''}`}
        >
          {events.slice(0, 4).map((event, index) => (
            <div 
              key={event.id}
              className={`${styles.dateBox} ${activeEvent?.id === event.id ? styles.activeDate : ''} ${
                visibleItems.includes(index) ? styles.dateBoxAnimated : ''
              }`}
              onClick={() => setActiveEvent(event)}
            >
              <div className={styles.dateDay}>
                {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={styles.dateNumber}>
                {new Date(event.date).getDate()}
              </div>
              <div className={styles.dateMonth}>
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className={`${styles.rightSection} ${isVisible ? styles.rightAnimated : ''}`}>
          <h3 className={styles.eventsListTitle}>Upcoming Events</h3>
          <ul className={styles.eventsList}>
            {events.slice(0, 4).map((event, index) => (
              <li 
                key={event.id} 
                className={`${styles.eventListItem} ${
                  visibleItems.includes(index) ? styles.listItemAnimated : ''
                }`}
              >
                <div className={styles.eventTime}>
                  {getEventStatus(event.date, event.endTime)}
                </div>
                <h4 className={styles.eventListTitle}>{event.title}</h4>
                <Link href="/events" className={styles.viewDetails}>View details</Link>
              </li>
            ))}
          </ul>
          <button className={`${styles.viewMoreButton} ${isVisible ? styles.buttonAnimated : ''}`}>
            View more events
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsComponent;