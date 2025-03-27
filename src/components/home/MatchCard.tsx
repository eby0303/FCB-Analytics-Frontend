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
  
  const getTeamCrestUrl = (teamId: number) => {
    return `https://crests.football-data.org/${teamId}.png`;
  };
  
  const getCompetitionColor = () => {
    if (match.competition === "Primera Division") return "border-blue-500 bg-blue-500/10 text-blue-400";
    if (match.competition === "UEFA Champions League") return "border-purple-500 bg-purple-500/10 text-purple-400";
    if (match.competition === "Copa del Rey") return "border-yellow-500 bg-yellow-500/10 text-yellow-400";
    return "border-gray-500 bg-gray-500/10 text-gray-400";
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg group">
      {/* Competition Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5">
        <div className={`text-xs px-2 py-1 rounded-full ${getCompetitionColor()}`}>
          {match.competition}
        </div>
        <div className="text-sm text-gray-400">{formattedDate}</div>
      </div>
      
      {/* Match Content */}
      <div className="p-4">
        {/* Teams and Score */}
        <div className="flex items-center justify-between mb-1">
          {/* Home Team */}
          <div className="flex items-center space-x-3 w-1/3">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center overflow-hidden">
              <img 
                src={getTeamCrestUrl(match.homeTeam.id)} 
                alt={match.homeTeam.name}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32?text=' + match.homeTeam.name.substring(0, 3);
                }}
              />
            </div>
            <span className={`text-sm font-medium truncate ${isFCBHome ? 'text-white' : 'text-gray-400'}`}>
              {match.homeTeam.name}
            </span>
          </div>
          
          {/* Score/Time */}
          <div className="flex flex-col items-center flex-1">
            {isUpcoming ? (
              <div className="text-sm font-medium text-gray-300">{formattedTime}</div>
            ) : (
              <>
                <div className="text-xl font-bold">
                  {match.score.fullTime.home} - {match.score.fullTime.away}
                </div>
                {!isUpcoming && (
                  <div className="text-xs text-gray-400 mt-1">
                    {match.status === "FINISHED" ? "Full-Time" : match.status}
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Away Team */}
          <div className="flex items-center justify-end space-x-3 w-1/3">
            <span className={`text-sm font-medium truncate ${!isFCBHome ? 'text-white' : 'text-gray-400'}`}>
              {match.awayTeam.name}
            </span>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center overflow-hidden">
              <img 
                src={getTeamCrestUrl(match.awayTeam.id)} 
                alt={match.awayTeam.name}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32?text=' + match.awayTeam.name.substring(0, 3);
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Venue Indicator */}
        <div className="flex justify-start mt-2">
          <span className="text-xs text-gray-400">
            {isFCBHome ? "Home" : "Away"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;