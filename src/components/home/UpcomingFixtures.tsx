
import { useUpcomingMatches } from '../../hooks/useMatchData';
import MatchCard from './MatchCard';
import { Calendar } from 'lucide-react';

const UpcomingFixtures = () => {
  const { data: matches, isLoading, error } = useUpcomingMatches();

  // Show up to 3 upcoming matches
  const upcomingMatches = matches?.slice(0, 3);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-4">
        <Calendar className="w-5 h-5 mr-2 text-fcb-red" />
        <h2 className="section-title">Upcoming Fixtures</h2>
      </div>
      
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 rounded-xl bg-white/5 animate-pulse"></div>
          ))}
        </div>
      )}
      
      {error && (
        <div className="glass-card p-6 text-center">
          <p className="text-red-400">Failed to load upcoming matches</p>
          <p className="text-sm text-gray-400 mt-2">Please try again later</p>
        </div>
      )}
      
      {upcomingMatches && upcomingMatches.length > 0 && (
        <div className="space-y-4">
          {upcomingMatches.map((match, index) => (
            <div 
              key={match._id} 
              className="animate-slide-up" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <MatchCard match={match} isUpcoming={true} />
            </div>
          ))}
        </div>
      )}
      
      {upcomingMatches && upcomingMatches.length === 0 && (
        <div className="glass-card p-6 text-center">
          <p className="text-gray-400">No upcoming matches scheduled</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingFixtures;
