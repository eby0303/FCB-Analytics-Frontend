
import { useQuery } from '@tanstack/react-query';
import { fetchData, API_ENDPOINTS, SeasonStats, TeamInfo } from '../utils/api';

export function useSeasonStats() {
  return useQuery({
    queryKey: ['seasonStats'],
    queryFn: () => fetchData<SeasonStats>(API_ENDPOINTS.SEASON_STATS),
  });
}

export function useTeamInfo() {
  return useQuery({
    queryKey: ['teamInfo'],
    queryFn: () => fetchData<TeamInfo>(API_ENDPOINTS.TEAM_INFO),
  });
}
