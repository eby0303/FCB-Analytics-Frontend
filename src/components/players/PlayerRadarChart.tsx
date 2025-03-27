
import { useState, useEffect } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { PlayerStats } from '../../utils/api';
import { Check, Plus } from 'lucide-react';

interface PlayerRadarChartProps {
  data: PlayerStats[];
  filterPosition: string;
}

interface RadarData {
  subject: string;
  [key: string]: string | number;
}

// Predefined metrics for different positions
const positionMetrics = {
  all: ['Passing', 'Shooting', 'Defense', 'Dribbling', 'Physical', 'Vision'],
  DF: ['Tackles', 'Interceptions', 'Aerial Duels', 'Passing', 'Clearances', 'Blocks'],
  MF: ['Passing', 'Vision', 'Ball Control', 'Long Balls', 'Tackles', 'Shooting'],
  FW: ['Finishing', 'xG', 'Dribbling', 'Aerial Duels', 'Movement', 'Assists'],
  GK: ['Saves', 'Distribution', 'Command of Area', 'Reflexes', '1v1 Situations', 'Positioning']
};

const PlayerRadarChart = ({ data, filterPosition }: PlayerRadarChartProps) => {
  const [chartData, setChartData] = useState<RadarData[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerStats[]>([]);
  const [availablePlayers, setAvailablePlayers] = useState<PlayerStats[]>([]);
  
  // Get metrics based on position
  const getMetricsForPosition = (position: string) => {
    if (position === 'all') return positionMetrics.all;
    if (position === 'DF') return positionMetrics.DF;
    if (position === 'MF') return positionMetrics.MF;
    if (position === 'FW') return positionMetrics.FW;
    if (position === 'GK') return positionMetrics.GK;
    return positionMetrics.all;
  };
  
  // Filter players by position
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    const filteredPlayers = filterPosition === 'all' 
      ? data 
      : data.filter(player => {
          const positions = player.Pos.split(',');
          return positions.some(pos => pos.trim() === filterPosition);
        });
        
    // Sort by minutes played for relevance
    const sortedPlayers = [...filteredPlayers]
      .sort((a, b) => parseInt(b.Min) - parseInt(a.Min))
      .slice(0, 10); // Get top 10 by minutes
      
    setAvailablePlayers(sortedPlayers);
    
    // Auto-select top 3 players for comparison
    if (selectedPlayers.length === 0) {
      setSelectedPlayers(sortedPlayers.slice(0, 3));
    } else {
      // Filter out any previously selected players that are no longer available
      const stillAvailable = selectedPlayers.filter(player => 
        sortedPlayers.some(p => p.Player === player.Player)
      );
      
      // If we lost some players due to position filter, add new ones to maintain 3
      if (stillAvailable.length < 3) {
        const newPlayers = sortedPlayers.filter(player => 
          !stillAvailable.some(p => p.Player === player.Player)
        );
        
        setSelectedPlayers([
          ...stillAvailable,
          ...newPlayers.slice(0, 3 - stillAvailable.length)
        ]);
      } else {
        setSelectedPlayers(stillAvailable);
      }
    }
  }, [data, filterPosition]);
  
  // Update chart data when selected players change
  useEffect(() => {
    if (selectedPlayers.length === 0) return;
    
    const metrics = getMetricsForPosition(filterPosition);
    
    const radarData = metrics.map(metric => {
      const dataPoint: RadarData = { subject: metric };
      
      selectedPlayers.forEach(player => {
        // Generate realistic values based on player stats and position
        let value: number;
        
        switch(metric) {
          case 'Passing':
            value = 40 + parseFloat(player.PrgP) / 2;
            break;
          case 'Shooting':
            value = 30 + parseFloat(player.xG) * 30;
            break;
          case 'xG':
            value = parseFloat(player.xG) * 50;
            break;
          case 'Defense':
            value = player.Pos.includes('DF') ? 70 + Math.random() * 20 : 30 + Math.random() * 30;
            break;
          case 'Finishing':
            value = 40 + parseFloat(player.Gls) * 30;
            break;
          case 'Assists':
            value = 40 + parseFloat(player.Ast) * 30;
            break;
          case 'Vision':
            value = 30 + parseFloat(player.xAG) * 30;
            break;
          case 'Dribbling':
            value = 40 + parseFloat(player.PrgC) / 2;
            break;
          case 'Ball Control':
            value = 50 + parseFloat(player.PrgC) / 3;
            break;
          case 'Tackles':
            value = 40 + (player.Pos.includes('DF') ? 40 : 20);
            break;
          default:
            // Generate semi-random values that make sense for the position
            const baseValue = player.Pos.includes(filterPosition) ? 60 : 40;
            value = baseValue + Math.random() * 30;
        }
        
        dataPoint[player.Player] = Math.min(100, Math.round(value));
      });
      
      return dataPoint;
    });
    
    setChartData(radarData);
  }, [selectedPlayers, filterPosition]);
  
  const togglePlayerSelection = (player: PlayerStats) => {
    if (selectedPlayers.some(p => p.Player === player.Player)) {
      // Remove player if already selected
      setSelectedPlayers(selectedPlayers.filter(p => p.Player !== player.Player));
    } else {
      // Add player if less than 3 are selected
      if (selectedPlayers.length < 3) {
        setSelectedPlayers([...selectedPlayers, player]);
      }
    }
  };
  
  if (availablePlayers.length === 0) {
    return (
      <div className="glass-card h-96 flex items-center justify-center rounded-xl">
        <p className="text-gray-400">Loading player comparison data...</p>
      </div>
    );
  }

  // Colors for different players
  const colors = ['#A50044', '#004D98', '#FFED02'];

  return (
    <div className="glass-card p-4 rounded-xl mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <h3 className="text-lg font-medium">Player Comparison</h3>
        
        <div className="flex items-center gap-2 flex-wrap">
          {availablePlayers.slice(0, 6).map((player, index) => {
            const isSelected = selectedPlayers.some(p => p.Player === player.Player);
            const colorIndex = selectedPlayers.findIndex(p => p.Player === player.Player);
            
            return (
              <button
                key={player.Player}
                onClick={() => togglePlayerSelection(player)}
                className={`px-3 py-1 text-sm rounded-full transition-all flex items-center gap-1
                  ${isSelected 
                    ? `bg-opacity-80 text-white` 
                    : 'bg-white/10 hover:bg-white/20 text-gray-300'
                  }`}
                style={isSelected ? { backgroundColor: colors[colorIndex] } : {}}
              >
                {isSelected ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Plus className="w-3 h-3" />
                )}
                {player.Player.split(' ').slice(-1)[0]}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius="70%" data={chartData}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#a3a3a3', fontSize: 12 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#666' }} />
            
            {selectedPlayers.map((player, index) => (
              <Radar
                key={player.Player}
                name={player.Player.split(' ').pop()}
                dataKey={player.Player}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.2}
              />
            ))}
            
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PlayerRadarChart;
