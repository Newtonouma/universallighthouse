import { useState, useEffect, useCallback } from 'react';
import { useLoadingContext } from '../contexts/LoadingContext';

export interface Partner {
  id: number;
  name: string;
  logoUrl: string;
  website?: string;
  description?: string;
  category?: string;
  isActive: boolean;
  order: number;
}

interface UsePartnersReturn {
  partners: Partner[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UsePartnerReturn {
  partner: Partner | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePartners(category?: string, activeOnly: boolean = true): UsePartnersReturn {  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { updateLoadingState } = useLoadingContext();

  const fetchPartners = useCallback(async () => {
    try {      setLoading(true);
      updateLoadingState('partners', true);
      setError(null);
      
      const params = new URLSearchParams();
      if (category && category !== 'all') {
        params.append('category', category);
      }
      if (activeOnly) {
        params.append('active', 'true');
      }
      
      const url = `/api/partners${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch partners');
      }
      
      setPartners(data.data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch partners';
      setError(errorMessage);      console.error('Error fetching partners:', err);    } finally {
      setLoading(false);
      updateLoadingState('partners', false);
    }
  }, [category, activeOnly, updateLoadingState]);
  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  return {
    partners,
    loading,
    error,
    refetch: fetchPartners
  };
}

export function usePartner(id: number): UsePartnerReturn {
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPartner = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/partners/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Partner not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch partner');
      }
      
      setPartner(data.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch partner';
      setError(errorMessage);
      console.error('Error fetching partner:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPartner();
  }, [fetchPartner]);

  return {
    partner,
    loading,
    error,
    refetch: fetchPartner
  };
}

// Helper function to create a new partner
export async function createPartner(partnerData: Omit<Partner, 'id'>): Promise<{ success: boolean; data?: Partner; error?: string }> {
  try {
    const response = await fetch('/api/partners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(partnerData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      data: data.data
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to create partner';
    console.error('Error creating partner:', err);
    return {
      success: false,
      error: errorMessage
    };
  }
}

// Helper function to update a partner
export async function updatePartner(id: number, partnerData: Partial<Partner>): Promise<{ success: boolean; data?: Partner; error?: string }> {
  try {
    const response = await fetch(`/api/partners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(partnerData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      data: data.data
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to update partner';
    console.error('Error updating partner:', err);
    return {
      success: false,
      error: errorMessage
    };
  }
}

// Helper function to delete a partner
export async function deletePartner(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`/api/partners/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return {
      success: true
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to delete partner';
    console.error('Error deleting partner:', err);
    return {
      success: false,
      error: errorMessage
    };
  }
}
