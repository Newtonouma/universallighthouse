import { useState, useEffect, useCallback } from 'react';
import { GalleryItem } from '../data/galleryData';
import { useLoadingContext } from '../contexts/LoadingContext';

// API Response types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  total?: number;
}

interface UseGalleryReturn {
  galleryItems: GalleryItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseGalleryItemReturn {
  galleryItem: GalleryItem | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Hook to fetch all gallery items
export function useGallery(): UseGalleryReturn {  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { updateLoadingState } = useLoadingContext();

  const fetchGalleryItems = useCallback(async () => {    try {
      setLoading(true);
      updateLoadingState('gallery', true);
      setError(null);
      
      const response = await fetch('/api/gallery');
      const result: ApiResponse<GalleryItem[]> = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to fetch gallery items');
      }
      
      setGalleryItems(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');      setGalleryItems([]);    } finally {
      setLoading(false);
      updateLoadingState('gallery', false);
    }
  }, [updateLoadingState]);
  useEffect(() => {
    fetchGalleryItems();
  }, [fetchGalleryItems]);

  return {
    galleryItems,
    loading,
    error,
    refetch: fetchGalleryItems,
  };
}

// Hook to fetch a single gallery item by ID
export function useGalleryItem(id: number): UseGalleryItemReturn {
  const [galleryItem, setGalleryItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGalleryItem = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/gallery/${id}`);
      const result: ApiResponse<GalleryItem> = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to fetch gallery item');
      }
      
      setGalleryItem(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setGalleryItem(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchGalleryItem();
  }, [fetchGalleryItem]);

  return {
    galleryItem,
    loading,
    error,
    refetch: fetchGalleryItem,
  };
}
