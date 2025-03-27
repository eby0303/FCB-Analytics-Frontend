
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
import { Plus, X } from 'lucide-react';

interface PlayerRadarChartProps {
  data: PlayerStats[];
  filterPosition: string;
}

interface RadarData {
  subject: string;
  [key: string]: string | number;
}

const PlayerRadarChart = ({ 
  data, 
  filterPosition
}: PlayerRadarChartProps) => {
  // Metrics to show on the radar chart
  const metrics = [
    { key: 'PrgP', name: 'Passes to box' },
    { key: 'xAG', name: 'xA' },
    { key: 'PrgC', name: 'Att Actions' },
    { key: 'PrgR', name: 'Passes Rec' },
    { key: 'xG', name: 'xG' },
    { key: 'npxG', name: 'NPG' }
  ];
  
  const [chartData, setChartData] = useState<RadarData[]>([]);
  const [availablePlayers, setAvailablePlayers] = useState<PlayerStats[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerStats[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [percentileData, setPercentileData] = useState<Record<string, Record<string, number>>>({});
  
  // Calculate percentiles for all players once when data changes
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    const percentiles: Record<string, Record<string, number>> = {};
    
    // For each metric, calculate percentiles
    metrics.forEach(metric => {
      const metricKey = metric.key;
      
      // Get valid players with numeric values for this metric
      const validPlayers = data.filter(p => {
        const val = parseFloat(p[metricKey as keyof PlayerStats] as string);
        return !isNaN(val);
      });
      
      // Sort players by this metric (descending)
      const sortedPlayers = [...validPlayers].sort((a, b) => {
        const aValue = parseFloat(a[metricKey as keyof PlayerStats] as string);
        const bValue = parseFloat(b[metricKey as keyof PlayerStats] as string);
        return bValue - aValue;
      });
      
      // Calculate percentile for each player
      sortedPlayers.forEach((player, index) => {
        if (!percentiles[player.Player]) {
          percentiles[player.Player] = {};
        }
        
        // Calculate percentile (0-100)
        const pctRank = Math.min(100, Math.round(100 * (1 - index / Math.max(1, sortedPlayers.length - 1))));
        percentiles[player.Player][metricKey] = pctRank;
      });
    });
    
    setPercentileData(percentiles);
  }, [data]);
  
  // Filter available players by position when filterPosition changes
  useEffect(() => {
    if (!data) return;
    
    const filteredPlayers = filterPosition === 'all' 
      ? data 
      : data.filter(player => {
          const positions = player.Pos.split(',');
          return positions.some(pos => pos.trim() === filterPosition);
        });
    
    setAvailablePlayers(filteredPlayers);
    // Reset selected players when position changes
    setSelectedPlayers([]);
  }, [data, filterPosition]);
  
  // Update chart data when selected players change
  useEffect(() => {
    if (selectedPlayers.length === 0 || Object.keys(percentileData).length === 0) {
      setChartData([]);
      return;
    }
    
    // Generate radar chart data points
    const radarData = metrics.map(metric => {
      const dataPoint: RadarData = { subject: metric.name };
      
      selectedPlayers.forEach(player => {
        if (percentileData[player.Player]) {
          dataPoint[player.Player] = percentileData[player.Player][metric.key] || 0;
        } else {
          dataPoint[player.Player] = 0;
        }
      });
      
      return dataPoint;
    });
    
    setChartData(radarData);
  }, [selectedPlayers, percentileData]);
  
  // Handle adding a player to selection
  const addPlayer = (player: PlayerStats) => {
    if (selectedPlayers.length < 3 && !selectedPlayers.some(p => p.Player === player.Player)) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
    setSearchTerm("");
  };
  
  // Handle removing a player from selection
  const removePlayer = (playerName: string) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.Player !== playerName));
  };
  
  // Filter available players by search term
  const filteredAvailablePlayers = availablePlayers.filter(player => 
    player.Player.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedPlayers.some(p => p.Player === player.Player)
  );

  // Colors for different players
  const colors = ['#A50044', '#004D98', '#FFED02'];

  return (
    <div className="glass-card p-4 rounded-xl">
      <h3 className="text-lg font-medium mb-4">Player Comparison</h3>
      
      {/* Player search input */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter player name..."
            className="w-full px-4 py-2 bg-fcb-dark/60 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-fcb-blue"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white/10 text-white"
              onClick={() => setSearchTerm("")}
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        {/* Search results dropdown */}
        {searchTerm && (
          <div className="mt-2 max-h-40 overflow-y-auto bg-fcb-dark/90 backdrop-blur-sm border border-white/10 rounded-lg z-10 absolute w-[calc(100%-2rem)]">
            {filteredAvailablePlayers.length > 0 ? (
              <ul className="divide-y divide-white/10">
                {filteredAvailablePlayers.slice(0, 5).map(player => (
                  <li 
                    key={player.Player} 
                    className="px-4 py-2 hover:bg-white/5 cursor-pointer"
                    onClick={() => addPlayer(player)}
                  >
                    {player.Player} ({player.Pos})
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-gray-400">No players found</div>
            )}
          </div>
        )}
      </div>
      
      {/* Selected players chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedPlayers.map((player, index) => (
          <div 
            key={player.Player}
            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
            style={{ backgroundColor: `${colors[index % colors.length]}30` }}
          >
            <span className="font-medium">{player.Player}</span>
            <button 
              onClick={() => removePlayer(player.Player)}
              className="p-0.5 rounded-full hover:bg-white/10"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        
        {selectedPlayers.length === 0 && (
          <div className="text-gray-400 text-sm">Select up to 3 players to compare</div>
        )}
      </div>
      
      {/* Position filter buttons */}
      <div className="flex items-center flex-wrap justify-center space-x-2 mb-4">
        <button
          className={`px-4 py-1 text-sm rounded-lg ${filterPosition === 'GK' ? 'bg-fcb-blue text-white' : 'bg-fcb-dark/60'}`}
          onClick={() => {}}
        >
          GK
        </button>
        <button
          className={`px-4 py-1 text-sm rounded-lg ${filterPosition === 'DF' ? 'bg-fcb-blue text-white' : 'bg-fcb-dark/60'}`}
          onClick={() => {}}
        >
          DF
        </button>
        <button
          className={`px-4 py-1 text-sm rounded-lg ${filterPosition === 'MF' ? 'bg-fcb-blue text-white' : 'bg-fcb-dark/60'}`}
          onClick={() => {}}
        >
          MF
        </button>
        <button
          className={`px-4 py-1 text-sm rounded-lg ${filterPosition === 'FW' ? 'bg-fcb-blue text-white' : 'bg-fcb-dark/60'}`}
          onClick={() => {}}
        >
          FW
        </button>
        <button
          className={`px-4 py-1 text-sm rounded-lg ${filterPosition === 'all' ? 'bg-fcb-blue text-white' : 'bg-fcb-dark/60'}`}
          onClick={() => {}}
        >
          All
        </button>
      </div>
      
      {/* Radar chart visualization */}
      {selectedPlayers.length > 0 ? (
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="70%" data={chartData}>
              <PolarGrid stroke="#333" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#a3a3a3', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: '#666' }} 
              />
              
              {selectedPlayers.map((player, index) => (
                <Radar
                  key={player.Player}
                  name={player.Player}
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
      ) : (
        <div className="h-[400px] flex items-center justify-center">
          <p className="text-gray-400">Select players to view comparison</p>
        </div>
      )}
    </div>
  );
};

export default PlayerRadarChart;
