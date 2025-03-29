
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { PlayerStats } from "../../hooks/usePlayerData";
import { Card } from '@/components/ui/card';

export interface PlayerRadarChartProps {
  data: PlayerStats[];
  filterPosition: string;
}

const PlayerRadarChart: React.FC<PlayerRadarChartProps> = ({ data, filterPosition }) => {
  // Filter players by position
  const filteredPlayers = data.filter(player => 
    player.position === filterPosition || filterPosition === 'All'
  ).slice(0, 3);

  // Get the stats to include in the radar chart based on position
  const getPositionStats = () => {
    switch (filterPosition) {
      case 'Forward':
        return [
          { name: 'Goals', key: 'goals' },
          { name: 'Assists', key: 'assists' },
          { name: 'ShotAccuracy', key: 'shotAccuracy' },
          { name: 'ChancesCreated', key: 'chancesCreated' },
          { name: 'DribblesCompleted', key: 'dribblesCompleted' }
        ];
      case 'Midfielder':
        return [
          { name: 'Assists', key: 'assists' },
          { name: 'PassAccuracy', key: 'passAccuracy' },
          { name: 'ChancesCreated', key: 'chancesCreated' },
          { name: 'Tackles', key: 'tackles' },
          { name: 'Interceptions', key: 'interceptions' }
        ];
      case 'Defender':
        return [
          { name: 'Tackles', key: 'tackles' },
          { name: 'Interceptions', key: 'interceptions' },
          { name: 'Clearances', key: 'clearances' },
          { name: 'DuelsWon', key: 'duelsWon' },
          { name: 'BlockedShots', key: 'blockedShots' }
        ];
      case 'Goalkeeper':
        return [
          { name: 'CleanSheets', key: 'cleanSheets' },
          { name: 'SavePercentage', key: 'savePercentage' },
          { name: 'PenaltiesSaved', key: 'penaltiesSaved' },
          { name: 'PassAccuracy', key: 'passAccuracy' },
          { name: 'Clearances', key: 'clearances' }
        ];
      default:
        return [
          { name: 'Goals', key: 'goals' },
          { name: 'Assists', key: 'assists' },
          { name: 'PassAccuracy', key: 'passAccuracy' },
          { name: 'Tackles', key: 'tackles' },
          { name: 'Interceptions', key: 'interceptions' }
        ];
    }
  };

  const statKeys = getPositionStats();

  // Format data for radar chart
  const radarData = statKeys.map(stat => {
    const dataPoint: any = { name: stat.name };
    
    filteredPlayers.forEach((player, index) => {
      dataPoint[`player${index + 1}`] = player[stat.key as keyof PlayerStats] || 0;
    });
    
    return dataPoint;
  });

  // Colors for each player
  const playerColors = ['#004D98', '#A50044', '#FFED02'];

  if (filteredPlayers.length === 0) {
    return (
      <div className="mt-8">
        <p className="text-center text-gray-400">No players match this position filter.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="overflow-x-auto fcb-scrollbar pb-2">
        <table className="min-w-full bg-fcb-dark/50 backdrop-blur-sm border border-white/10 rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Player
              </th>
              {statKeys.map((stat) => (
                <th key={stat.name} className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {stat.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-fcb-dark/20">
            {filteredPlayers.map((player, playerIndex) => (
              <tr key={player.id} className="border-t border-white/5">
                <td className="py-3 px-4 whitespace-nowrap flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: playerColors[playerIndex] }}></div>
                  <span className="font-medium">{player.name}</span>
                </td>
                {statKeys.map((stat) => (
                  <td key={`${player.id}-${stat.name}`} className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{player[stat.key as keyof PlayerStats]}</span>
                      <div className="h-1.5 w-16 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${player[stat.key as keyof PlayerStats]}%`,
                            backgroundColor: playerColors[playerIndex]
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Card className="p-4 bg-fcb-dark/50 backdrop-blur-sm border border-white/10">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#4A5568" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#CBD5E0', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#4A5568" />
              
              {filteredPlayers.map((player, index) => (
                <Radar
                  key={player.id}
                  name={player.name}
                  dataKey={`player${index + 1}`}
                  stroke={playerColors[index]}
                  fill={playerColors[index]}
                  fillOpacity={0.2}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default PlayerRadarChart;
