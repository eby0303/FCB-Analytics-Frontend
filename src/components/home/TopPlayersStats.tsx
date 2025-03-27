import { Award, Target, Zap } from 'lucide-react';
import { useTeamStats } from '../../hooks/usePlayerData';
import StatsCard from '../ui/StatsCard';
import { PlayerStats } from '../../utils/api';

const TopPlayersStats = () => {
  const { data, isLoading, error } = useTeamStats();
  
  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="section-title mb-4">Top Performers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-white/5 animate-pulse rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error || !data) {
    return null;
  }

  // Helper function to safely parse and calculate stats
  const getStatValue = (player: PlayerStats, stat: string) => {
    const statValue = parseFloat(player[stat] || '0');
    const minutesPlayed = parseFloat(player['90s'] || '0');
    return statValue * minutesPlayed;
  };

  // Get top performers with proper sorting
  const playersWithStats = data.stats_standard_combined
    .filter(player => player && player['90s']) // Filter out players without minutes played
    .map(player => ({
      ...player,
      totalGoals: getStatValue(player, 'Gls'),
      totalAssists: getStatValue(player, 'Ast'),
      progressivePasses: parseInt(player.PrgP || '0'),
    }));

  // Sort by goals descending
  const topScorer = [...playersWithStats].sort((a, b) => b.totalGoals - a.totalGoals)[0];
  
  // Sort by assists descending
  const topAssister = [...playersWithStats].sort((a, b) => b.totalAssists - a.totalAssists)[0];
  
  // Sort by progressive passes descending
  const topProgressive = [...playersWithStats].sort((a, b) => b.progressivePasses - a.progressivePasses)[0];

  // Debugging logs (remove in production)
  console.log('Top Scorer:', topScorer);
  console.log('Top Assister:', topAssister);
  console.log('All Players:', playersWithStats.map(p => ({
    player: p.Player,
    goals: p.totalGoals,
    assists: p.totalAssists,
    prgPasses: p.progressivePasses
  })));

  return (
    <div className="mb-8">
      <h2 className="section-title mb-4">Top Performers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title={`Top Scorer: ${topScorer.Player}`}
          value={`${Math.round(topScorer.totalGoals)} Goals`}
          icon={<Award className="w-6 h-6" />}
          className="border-l-4 border-fcb-red"
        />
        <StatsCard
          title={`Top Assister: ${topAssister.Player}`}
          value={`${Math.round(topAssister.totalAssists)} Assists`}
          icon={<Target className="w-6 h-6" />}
          className="border-l-4 border-fcb-blue"
        />
        <StatsCard
          title={`Playmaker: ${topProgressive.Player}`}
          value={`${topProgressive.progressivePasses} Prog. Passes`}
          icon={<Zap className="w-6 h-6" />}
          className="border-l-4 border-yellow-500"
        />
      </div>
    </div>
  );
};

export default TopPlayersStats;