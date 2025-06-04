// Gallery data types
export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  category?: string;
  isActive: boolean;
  order: number;
  dateAdded: string;
}

// Backend gallery item structure (from the API response)
export interface BackendGalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  createdAt: string;
  updatedAt: string;
}
