import { useState, useEffect, useCallback } from 'react';
import { useLoadingContext } from '../contexts/LoadingContext';

export interface TeamMember {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  contact?: string;
  email?: string;
  facebook?: string;
  tiktok?: string;
  twitter?: string;
  linkedin?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  error?: string;
}

interface UseTeamMembersResult {
  teamMembers: TeamMember[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseTeamMemberResult {
  teamMember: TeamMember | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useTeamMembers(category?: string): UseTeamMembersResult {  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { updateLoadingState } = useLoadingContext();

  const fetchTeamMembers = useCallback(async () => {    try {
      setLoading(true);
      updateLoadingState('teams', true);
      setError(null);

      const url = new URL('/api/team', window.location.origin);
      if (category && category !== 'All') {
        url.searchParams.set('category', category);
      }      const response = await fetch(url.toString());
      const result: ApiResponse<TeamMember[]> = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch team members');
      }

      if (result.success) {
        setTeamMembers(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch team members');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');      setTeamMembers([]);    } finally {
      setLoading(false);
      updateLoadingState('teams', false);
    }
  }, [category, updateLoadingState]);useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  return {
    teamMembers,
    loading,
    error,
    refetch: fetchTeamMembers
  };
}

export function useTeamMember(id: string): UseTeamMemberResult {
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamMember = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/team/${id}`);
      const result: ApiResponse<TeamMember> = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch team member');
      }

      if (result.success) {
        setTeamMember(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch team member');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setTeamMember(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTeamMember();
  }, [fetchTeamMember]);

  return {
    teamMember,
    loading,
    error,
    refetch: fetchTeamMember
  };
}
