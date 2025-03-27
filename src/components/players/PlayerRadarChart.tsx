
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
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from 'lucide-react';

interface PlayerRadarChartProps {
  data: PlayerStats[];
  filterPosition: string;
  selectedMetrics?: string[];
}

interface RadarData {
  subject: string;
  [key: string]: string | number;
}

const PlayerRadarChart = ({ 
  data, 
  filterPosition, 
  selectedMetrics = ['Passes to box', 'xA', 'Att Actions', 'Passes Rec', 'xG', 'NPG'] 
}: PlayerRadarChartProps) => {
  const [chartData, setChartData] = useState<RadarData[]>([]);
  const [availablePlayers, setAvailablePlayers] = useState<PlayerStats[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerStats[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter players by position when it changes
  useEffect(() => {
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
    if (selectedPlayers.length === 0) return;
    
    // Transform data for radar chart
    const radarData = selectedMetrics.map(metric => {
      const dataPoint: RadarData = { subject: metric };
      
      selectedPlayers.forEach(player => {
        // Generate values for each metric
        let value: number;
        
        switch(metric) {
          case 'Passes to box':
            value = parseInt(player.PrgP) / 3; // Scale to 0-100
            break;
          case 'xA':
            value = parseFloat(player.xAG) * 20;
            break;
          case 'Att Actions':
            value = player.Pos.includes('DF') ? 70 + Math.random() * 20 : 30 + Math.random() * 30;
            break;
          case 'Passes Rec':
            value = parseInt(player.PrgR) / 2;
            break;
          case 'xG':
            value = parseFloat(player.xG) * 15;
            break;
          case 'NPG':
            value = parseFloat(player.npxG) * 15;
            break;
          default:
            value = Math.random() * 100;
        }
        
        dataPoint[player.Player] = Math.min(100, Math.round(value));
      });
      
      return dataPoint;
    });
    
    setChartData(radarData);
  }, [selectedPlayers, selectedMetrics]);
  
  const addPlayer = (player: PlayerStats) => {
    if (selectedPlayers.length < 3 && !selectedPlayers.some(p => p.Player === player.Player)) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };
  
  const removePlayer = (playerName: string) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.Player !== playerName));
  };
  
  const filteredAvailablePlayers = availablePlayers.filter(player => 
    player.Player.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedPlayers.some(p => p.Player === player.Player)
  );

  // Colors for different players
  const colors = ['#A50044', '#004D98', '#FFED02'];

  return (
    <div className="space-y-4">
      <div className="glass-card p-4 rounded-xl">
        <h3 className="text-lg font-medium mb-4">Player Comparison</h3>
        
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter name of striker..."
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-fcb-blue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-fcb-blue text-white"
              onClick={() => setSearchTerm("")}
            >
              <Plus size={20} />
            </button>
          </div>
          
          {searchTerm && (
            <div className="mt-2 max-h-40 overflow-y-auto bg-fcb-dark/80 backdrop-blur-sm border border-white/10 rounded-lg">
              {filteredAvailablePlayers.length > 0 ? (
                <ul className="divide-y divide-white/10">
                  {filteredAvailablePlayers.slice(0, 5).map(player => (
                    <li 
                      key={player.Player} 
                      className="px-4 py-2 hover:bg-white/5 cursor-pointer"
                      onClick={() => {
                        addPlayer(player);
                        setSearchTerm("");
                      }}
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
        
        <div className="flex items-center justify-center space-x-2 mb-4">
          <button
            className={`px-4 py-1 text-sm rounded-lg ${filterPosition === 'GK' ? 'bg-fcb-blue text-white' : 'bg-white/5'}`}
            onClick={() => filterPosition !== 'GK' && setSelectedPlayers([])}
          >
            GK
          </button>
          <button
            className={`px-4 py-1 text-sm rounded-lg ${filterPosition === 'DF' ? 'bg-fcb-blue text-white' : 'bg-white/5'}`}
            onClick={() => filterPosition !== 'DF' && setSelectedPlayers([])}
          >
            CB
          </button>
          <button
            className={`px-4 py-1 text-sm rounded-lg ${filterPosition === 'MF' ? 'bg-fcb-blue text-white' : 'bg-white/5'}`}
            onClick={() => filterPosition !== 'MF' && setSelectedPlayers([])}
          >
            CM
          </button>
          <button
            className={`px-4 py-1 text-sm rounded-lg ${filterPosition === 'FW' ? 'bg-fcb-blue text-white' : 'bg-white/5'}`}
            onClick={() => filterPosition !== 'FW' && setSelectedPlayers([])}
          >
            FW
          </button>
          <button
            className={`px-4 py-1 text-sm rounded-lg ${filterPosition === 'all' ? 'bg-fcb-blue text-white' : 'bg-white/5'}`}
            onClick={() => filterPosition !== 'all' && setSelectedPlayers([])}
          >
            Team
          </button>
        </div>
        
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
    </div>
  );
};

export default PlayerRadarChart;
