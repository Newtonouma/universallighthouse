import { useState, useEffect, useCallback } from 'react';
import { EventItem, EventItemFormatted } from '../data/eventsData';
import { useLoadingContext } from '../contexts/LoadingContext';

// API Response types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  total?: number;
}

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

// Hook to fetch all events
export function useEvents(): UseEventsReturn {  const [events, setEvents] = useState<EventItemFormatted[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { updateLoadingState } = useLoadingContext();

  const fetchEvents = useCallback(async () => {    try {
      setLoading(true);
      updateLoadingState('events', true);
      setError(null);
      
      const response = await fetch('/api/events');
      const result: ApiResponse<EventItem[]> = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to fetch events');
      }
      
      // Format events data for frontend compatibility
      const formattedEvents = result.data.map(formatEventData);
      setEvents(formattedEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');      setEvents([]);    } finally {
      setLoading(false);
      updateLoadingState('events', false);
    }
  }, [updateLoadingState]);

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
      
      const response = await fetch(`/api/events/${id}`);
      const result: ApiResponse<EventItem> = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to fetch event');
      }
      
      // Format event data for frontend compatibility
      const formattedEvent = formatEventData(result.data);
      setEvent(formattedEvent);
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
