import { useState, useEffect, useCallback } from 'react';
import { EventItem, EventItemFormatted, events as eventsData } from '../data/eventsData';

interface UseEventsReturn {
  events: EventItemFormatted[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseEventReturn {
  event: EventItemFormatted | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Helper function to format event data for frontend compatibility
const formatEventData = (event: EventItem): EventItemFormatted => {
  const startDate = new Date(event.date);
  const endDate = new Date(event.endTime);
  
  // Format time range
  const timeRange = `${startDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  })} - ${endDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  })}`;

  // Create short description from main description
  const shortDescription = event.description.length > 50 
    ? event.description.substring(0, 50) + '...' 
    : event.description;

  return {
    ...event,
    time: timeRange,
    shortDescription,
    category: 'Community Event', // Default category since backend doesn't provide one
  };
};

// Helper function to filter out past events
const filterUpcomingAndOngoingEvents = (events: EventItemFormatted[]): EventItemFormatted[] => {
  const now = new Date();
  
  return events
    .filter(event => {
      const endDate = new Date(event.endTime);
      
      // Only show events that haven't ended yet (ongoing or upcoming)
      return endDate >= now;
    })
    .sort((a, b) => {
      const nowTime = now.getTime();
      const aStart = new Date(a.date).getTime();
      const aEnd = new Date(a.endTime).getTime();
      const bStart = new Date(b.date).getTime();
      const bEnd = new Date(b.endTime).getTime();
      
      // Check if events are ongoing
      const aIsOngoing = nowTime >= aStart && nowTime <= aEnd;
      const bIsOngoing = nowTime >= bStart && nowTime <= bEnd;
      
      // Prioritize ongoing events first
      if (aIsOngoing && !bIsOngoing) return -1;
      if (!aIsOngoing && bIsOngoing) return 1;
      
      // If both are ongoing or both are upcoming, sort by start date
      return aStart - bStart;
    });
};

// Hook to fetch all events
export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<EventItemFormatted[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Format events data for frontend compatibility
      const formattedEvents = eventsData.map(formatEventData);
      
      // Filter to show only upcoming and ongoing events
      const upcomingAndOngoingEvents = filterUpcomingAndOngoingEvents(formattedEvents);
      
      setEvents(upcomingAndOngoingEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
  };
}

// Hook to fetch a single event by ID
export function useEvent(id: string | null): UseEventReturn {
  const [event, setEvent] = useState<EventItemFormatted | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Simulate a brief loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Find event in local data
      const foundEvent = eventsData.find(e => e.id === id);
      
      if (!foundEvent) {
        throw new Error('Event not found');
      }
      
      // Format event data for frontend compatibility
      const formattedEvent = formatEventData(foundEvent);
      
      // Check if the event is past
      const now = new Date();
      const endDate = new Date(formattedEvent.endTime);
      
      if (endDate < now) {
        // Event has ended, return null or handle as needed
        setError('This event has already ended');
        setEvent(null);
      } else {
        setEvent(formattedEvent);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return {
    event,
    loading,
    error,
    refetch: fetchEvent,
  };
}
