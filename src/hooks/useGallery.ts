import { useState, useEffect, useCallback } from 'react';
import { GalleryItem, galleryItems as galleryData } from '../data/galleryData';

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
export function useGallery(): UseGalleryReturn {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGalleryItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Filter to only active items and sort by order
      const activeItems = galleryData
        .filter((item: GalleryItem) => item.isActive)
        .sort((a: GalleryItem, b: GalleryItem) => a.order - b.order);
      
      setGalleryItems(activeItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

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
      
      // Simulate a brief loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Find gallery item in local data
      const foundItem = galleryData.find((item: GalleryItem) => item.id === id && item.isActive);
      
      if (!foundItem) {
        throw new Error('Gallery item not found');
      }
      
      setGalleryItem(foundItem);
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
