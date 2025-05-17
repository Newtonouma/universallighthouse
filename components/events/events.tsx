"use client";
import React, { useState, useEffect } from 'react';
import styles from './events.module.css';

interface Event {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  date: string;
  time: string;
  imageUrl: string;
  category: string;
}

const EventsComponent: React.FC = () => {
  // i removed , setEvents from the [events, setEvents] = useState<Event[]>([])
  const [events] = useState<Event[]>([
    {
    id: 1,
    title: "Annual Charity Tech Drive",
    description: "Join us for an inspiring event showcasing how technology can support charitable causes and transform communities.",
    shortDescription: "Tech for good showcase",
    date: new Date().toISOString().split('T')[0],
    time: "09:00 - 17:00",
    imageUrl: "/images/hero1.jpg",
    category: "Charity Conference"
  },
  {
    id: 2,
    title: "Community Empowerment Workshop",
    description: "A hands-on workshop focused on empowering local communities through skills, resources, and collaboration.",
    shortDescription: "Empowerment workshop",
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: "14:00 - 16:00",
    imageUrl: "/images/hero2.jpg",
    category: "Charity Workshop"
  },
  {
    id: 3,
    title: "Hope for All Gala Night",
    description: "An elegant evening of giving, with live entertainment, dinner, and auctions to raise funds for vulnerable communities.",
    shortDescription: "Fundraising gala",
    date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    time: "19:00 - 23:00",
    imageUrl: "/images/hero3.jpg",
    category: "Charity Fundraiser"
  },
  {
    id: 4,
    title: "Volunteer Induction & Training",
    description: "A special session designed to equip new volunteers with the knowledge and tools to make a meaningful impact.",
    shortDescription: "Volunteer training",
    date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    time: "10:00 - 12:00",
    imageUrl: "/images/hero2.jpg",
    category: "Volunteer Program"
  }
  ]);
// i removed , currentDate from the [currentDate] = useState(new Date());
  const [] = useState(new Date());
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);

  useEffect(() => {
    // Set the first event as active by default
    if (events.length > 0 && !activeEvent) {
      setActiveEvent(events[0]);
    }
  }, [events, activeEvent]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getEventStatus = (eventDate: string, eventTime: string) => {
    const today = new Date().toISOString().split('T')[0];
    const [startTime, endTime] = eventTime.split(' - ');
    
    if (eventDate === today) {
      const now = new Date();
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);
      
      const startDate = new Date();
      startDate.setHours(startHour, startMinute, 0, 0);
      
      const endDate = new Date();
      endDate.setHours(endHour, endMinute, 0, 0);
      
      if (now >= startDate && now <= endDate) {
        return "Ongoing";
      } else if (now < startDate) {
        return `Today at ${startTime}`;
      } else {
        return "Ended";
      }
    }
    
    return formatDate(eventDate);
  };

  return (
    <div className={styles.eventsContainer}>
      
      {/* Left Section */}
      <div className={styles.leftSection}>
        {activeEvent && (
          <>
            <div 
              className={styles.eventImage}
              style={{ backgroundImage: `url(${activeEvent.imageUrl})` }}
            >
              <div className={styles.imageOverlay}></div>
              <div className={styles.eventCategory}>{activeEvent.category}</div>
            </div>
            <div className={styles.eventContent}>
              <h2 className={styles.eventTitle}>{activeEvent.title}</h2>
              <p className={styles.eventDescription}>{activeEvent.description}</p>
              <p className={styles.eventShortDescription}>{activeEvent.shortDescription}</p>
            </div>
          </>
        )}
      </div>

      {/* Middle Section */}
      <div className={styles.middleSection}>
      {/* i remove index from .map((event, index)) */}
        {events.slice(0, 4).map((event) => (
          <div 
            key={event.id}
            className={`${styles.dateBox} ${activeEvent?.id === event.id ? styles.activeDate : ''}`}
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
      <div className={styles.rightSection}>
        <h3 className={styles.eventsListTitle}>Upcoming Events</h3>
        <ul className={styles.eventsList}>
          {events.slice(0, 4).map(event => (
            <li key={event.id} className={styles.eventListItem}>
              <div className={styles.eventTime}>{getEventStatus(event.date, event.time)}</div>
              <h4 className={styles.eventListTitle}>{event.title}</h4>
              <a href="#" className={styles.viewDetails}>View details</a>
            </li>
          ))}
        </ul>
        <button className={styles.viewMoreButton}>View more events</button>
      </div>
    </div>
  );
};

export default EventsComponent;