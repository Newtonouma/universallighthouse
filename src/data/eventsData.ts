// Event data structure based on external backend API
export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  endTime: string; // ISO date string
  location: string;
  imageUrl: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Additional interface for frontend component compatibility
export interface EventItemFormatted extends EventItem {
  shortDescription?: string;
  time?: string; // Formatted time range
  category?: string;
}

// API Response types
export interface EventsApiResponse {
  success: boolean;
  data: EventItem[];
  error?: string;
  total?: number;
}

export interface EventApiResponse {
  success: boolean;
  data: EventItem;
  error?: string;
}
