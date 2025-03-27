
import { useRecentMatches } from '../../hooks/useMatchData';
import MatchCard from './MatchCard';
import { ChevronRight } from 'lucide-react';

const RecentMatches = () => {
  const { data: matches, isLoading, error } = useRecentMatches();

  // Show up to 5 most recent matches
  const recentMatches = matches?.slice(0, 5);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">Recent Matches</h2>
        <button className="text-sm text-gray-400 hover:text-white flex items-center transition-colors duration-300">
          See all <ChevronRight className="w-4 h-4 ml-1" />
        </button>
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
          <p className="text-red-400">Failed to load recent matches</p>
          <p className="text-sm text-gray-400 mt-2">Please try again later</p>
        </div>
      )}
      
      {recentMatches && recentMatches.length > 0 && (
        <div className="space-y-4">
          {recentMatches.map((match, index) => (
            <div 
              key={match._id} 
              className="animate-slide-up" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <MatchCard match={match} />
            </div>
          ))}
        </div>
      )}
      
      {recentMatches && recentMatches.length === 0 && (
        <div className="glass-card p-6 text-center">
          <p className="text-gray-400">No recent matches found</p>
        </div>
      )}
    </div>
  );
};

export default RecentMatches;
