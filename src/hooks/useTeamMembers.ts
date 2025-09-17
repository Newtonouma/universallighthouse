import { useState, useEffect, useCallback } from 'react';
import { TeamMember, teamMembers as teamMembersData } from '../data/teamMembersData';

// Re-export TeamMember interface for components
export type { TeamMember };

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

export function useTeamMembers(category?: string): UseTeamMembersResult {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use local data instead of API
      let filteredMembers = teamMembersData;
      
      // Apply category filter if specified
      if (category && category !== 'All') {
        // For now, return all members since we don't have categories in our data
        // You can extend the TeamMember interface to include category if needed
        filteredMembers = teamMembersData;
      }
      
      setTeamMembers(filteredMembers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
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

      // Simulate a brief loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Find team member in local data
      const foundMember = teamMembersData.find(member => member.id === id);
      
      if (!foundMember) {
        throw new Error('Team member not found');
      }
      
      setTeamMember(foundMember);
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
