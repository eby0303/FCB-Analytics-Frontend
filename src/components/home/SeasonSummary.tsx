
import { useSeasonStats } from '../../hooks/useTeamData';
import StatsCard from '../ui/StatsCard';
import { Trophy, Swords, X, Target, ShieldCheck, LineChart } from 'lucide-react';

const SeasonSummary = () => {
  const { data: stats, isLoading } = useSeasonStats();
  
  // Calculate win rate
  const winRate = stats ? Math.round((stats.wins / (stats.wins + stats.draws + stats.losses)) * 100) : 0;

  return (
    <div className="animate-fade-in">
      <h2 className="section-title mb-6">Season Summary</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatsCard
          title="Wins"
          value={stats?.wins || 0}
          icon={<Trophy className="w-5 h-5" />}
          isLoading={isLoading}
          valueClassName="text-green-400"
        />
        
        <StatsCard
          title="Draws"
          value={stats?.draws || 0}
          icon={<Swords className="w-5 h-5" />}
          isLoading={isLoading}
          valueClassName="text-yellow-400"
        />
        
        <StatsCard
          title="Losses"
          value={stats?.losses || 0}
          icon={<X className="w-5 h-5" />}
          isLoading={isLoading}
          valueClassName="text-red-400"
        />
        
        <StatsCard
          title="Goals Scored"
          value={stats?.goalsFor || 0}
          icon={<Target className="w-5 h-5" />}
          isLoading={isLoading}
          valueClassName="text-blue-400"
        />
        
        <StatsCard
          title="Goals Conceded"
          value={stats?.goalsAgainst || 0}
          icon={<ShieldCheck className="w-5 h-5" />}
          isLoading={isLoading}
          valueClassName="text-purple-400"
        />
        
        <StatsCard
          title="Win Rate"
          value={`${winRate}%`}
          icon={<LineChart className="w-5 h-5" />}
          isLoading={isLoading}
          valueClassName="fcb-text-gradient font-bold"
        />
      </div>
    </div>
  );
};

export default SeasonSummary;
