
import { format } from 'date-fns';
import { Match } from '../../utils/api';
import { useTeamInfo } from '../../hooks/useTeamData';

interface MatchCardProps {
  match: Match;
  isUpcoming?: boolean;
}

const MatchCard = ({ match, isUpcoming = false }: MatchCardProps) => {
  const { data: teamInfo } = useTeamInfo();
  const isFCBHome = match.homeTeam.name === "FC Barcelona";
  const formattedDate = format(new Date(match.utcDate), 'MMM d, yyyy');
  const formattedTime = format(new Date(match.utcDate), 'h:mm a');
  
  // Get team crest URLs
  const getTeamCrestUrl = (teamId: number) => {
    return `https://crests.football-data.org/${teamId}.png`;
  };
  
  // Determine competition badge color
  const getCompetitionColor = () => {
    if (match.competition === "Primera Division") return "border-blue-500 bg-blue-500/10 text-blue-400";
    if (match.competition === "UEFA Champions League") return "border-purple-500 bg-purple-500/10 text-purple-400";
    if (match.competition === "Copa del Rey") return "border-yellow-500 bg-yellow-500/10 text-yellow-400";
    return "border-gray-500 bg-gray-500/10 text-gray-400";
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg group">
      {/* Competition and Date */}
      <div className="flex items-center justify-between p-3 border-b border-white/5">
        <div className={`text-xs px-2 py-1 rounded-full ${getCompetitionColor()}`}>
          {match.competition}
        </div>
        <div className="text-sm text-gray-400">{formattedDate}</div>
      </div>
      
      {/* Teams and Score */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          {/* Home Team */}
          <div className={`flex flex-col items-center text-center transition-all duration-300 ${isFCBHome ? 'scale-110' : ''}`}>
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2 overflow-hidden">
              <img 
                src={getTeamCrestUrl(match.homeTeam.id)} 
                alt={match.homeTeam.name}
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  // Fallback if crest doesn't load
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=' + match.homeTeam.name.substring(0, 3);
                }}
              />
            </div>
            <span className={`text-sm font-medium ${isFCBHome ? 'text-white' : 'text-gray-400'}`}>
              {match.homeTeam.name}
            </span>
          </div>
          
          {/* Score or Time */}
          <div className="flex flex-col items-center">
            {isUpcoming ? (
              <>
                <div className="text-sm text-gray-400 mb-1">Kickoff</div>
                <div className="text-lg font-semibold">{formattedTime}</div>
              </>
            ) : (
              <div className="px-4 py-2 rounded-lg bg-white/5 text-xl font-display font-bold">
                {match.score.fullTime.home} - {match.score.fullTime.away}
              </div>
            )}
          </div>
          
          {/* Away Team */}
          <div className={`flex flex-col items-center text-center transition-all duration-300 ${!isFCBHome ? 'scale-110' : ''}`}>
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2 overflow-hidden">
              <img 
                src={getTeamCrestUrl(match.awayTeam.id)} 
                alt={match.awayTeam.name}
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  // Fallback if crest doesn't load
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=' + match.awayTeam.name.substring(0, 3);
                }}
              />
            </div>
            <span className={`text-sm font-medium ${!isFCBHome ? 'text-white' : 'text-gray-400'}`}>
              {match.awayTeam.name}
            </span>
          </div>
        </div>
        
        {/* Match Status */}
        {!isUpcoming && (
          <div className="flex justify-center">
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">
              {match.status === "FINISHED" ? "Full-Time" : match.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
