import { useQuery } from '@tanstack/react-query';
import { fetchData, API_ENDPOINTS, Player, TeamStats } from '../utils/api';

export interface PlayerStats {
  name: string;
  position: string;
}

export function useAllPlayers() {
  return useQuery({
    queryKey: ['players'],
    queryFn: () => fetchData<Player[]>(API_ENDPOINTS.PLAYERS),
  });
}

export function useTeamStats() {
  return useQuery({
    queryKey: ['teamStats'],
    queryFn: () => fetchData<TeamStats>(API_ENDPOINTS.TEAM_STATS),
  });
}
