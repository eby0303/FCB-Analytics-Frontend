
import { useQuery } from '@tanstack/react-query';
import { fetchData, API_ENDPOINTS, Match } from '../utils/api';

export function useRecentMatches() {
  return useQuery({
    queryKey: ['recentMatches'],
    queryFn: () => fetchData<Match[]>(API_ENDPOINTS.RECENT_MATCHES),
  });
}

export function useUpcomingMatches() {
  return useQuery({
    queryKey: ['upcomingMatches'],
    queryFn: () => fetchData<Match[]>(API_ENDPOINTS.UPCOMING_MATCHES),
  });
}
