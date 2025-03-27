
import { Award, Target, Zap } from 'lucide-react';
import { useTeamStats } from '../../hooks/usePlayerData';
import StatsCard from '../ui/StatsCard';
import { PlayerStats } from '../../utils/api';

const TopPlayersStats = () => {
  const { data, isLoading, error } = useTeamStats();
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-white/5 animate-pulse rounded-xl"></div>
        ))}
      </div>
    );
  }
  
  if (error || !data) {
    return null;
  }
  
  // Get top goal scorer
  const topScorer = [...data.stats_standard_combined]
    .sort((a, b) => {
      // Calculate total goals (not per 90)
      const aGoals = Math.round(parseFloat(a["90s"]) * parseFloat(a.Gls));
      const bGoals = Math.round(parseFloat(b["90s"]) * parseFloat(b.Gls));
      return bGoals - aGoals;
    })[0];
  
  // Get top assist provider
  const topAssister = [...data.stats_standard_combined]
    .sort((a, b) => {
      // Calculate total assists (not per 90)
      const aAssists = Math.round(parseFloat(a["90s"]) * parseFloat(a.Ast));
      const bAssists = Math.round(parseFloat(b["90s"]) * parseFloat(b.Ast));
      return bAssists - aAssists;
    })[0];
  
  // Most progressive passes
  const topProgressive = [...data.stats_standard_combined]
    .sort((a, b) => {
      return parseInt(b.PrgP) - parseInt(a.PrgP);
    })[0];
  
  const calculateTotalGoals = (player: PlayerStats) => {
    return Math.round(parseFloat(player["90s"]) * parseFloat(player.Gls));
  };
  
  const calculateTotalAssists = (player: PlayerStats) => {
    return Math.round(parseFloat(player["90s"]) * parseFloat(player.Ast));
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="border-b border-white/10 px-6 py-4">
        <h2 className="text-xl font-display font-medium text-gradient">Top Performers</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        <StatsCard
          title={`Top Scorer: ${topScorer.Player.split(' ').pop()}`}
          value={`${calculateTotalGoals(topScorer)} Goals`}
          icon={<Award className="w-6 h-6" />}
          className="border-l-4 border-fcb-red"
        />
        <StatsCard
          title={`Top Assister: ${topAssister.Player.split(' ').pop()}`}
          value={`${calculateTotalAssists(topAssister)} Assists`}
          icon={<Target className="w-6 h-6" />}
          className="border-l-4 border-fcb-blue"
        />
        <StatsCard
          title={`Playmaker: ${topProgressive.Player.split(' ').pop()}`}
          value={`${topProgressive.PrgP} Prog. Passes`}
          icon={<Zap className="w-6 h-6" />}
          className="border-l-4 border-yellow-500"
        />
      </div>
    </div>
  );
};

export default TopPlayersStats;
