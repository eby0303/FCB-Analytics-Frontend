
import { useEffect, useState } from 'react';
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
  selectedMetrics = ['Fwd Pass %', 'Prog Passes', 'Duels %', 'Key Passes', 'Def Actions', 'Carrying'] 
}: PlayerRadarChartProps) => {
  const [chartData, setChartData] = useState<RadarData[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerStats[]>([]);
  
  useEffect(() => {
    // Filter players by position
    const availablePlayers = filterPosition === 'all' 
      ? data 
      : data.filter(player => {
          const positions = player.Pos.split(',');
          return positions.some(pos => pos.trim() === filterPosition);
        });
    
    // Just take top performers based on minutes played
    const topPlayers = [...availablePlayers]
      .sort((a, b) => parseInt(b.Min) - parseInt(a.Min))
      .slice(0, 3);
    
    setSelectedPlayers(topPlayers);
    
    // Transform data for radar chart
    const radarData = selectedMetrics.map(metric => {
      const dataPoint: RadarData = { subject: metric };
      
      topPlayers.forEach(player => {
        // Simulate random values for these metrics (in a real app, you'd use actual data)
        let value: number;
        
        switch(metric) {
          case 'Fwd Pass %':
            value = 50 + Math.random() * 30;
            break;
          case 'Prog Passes':
            value = parseInt(player.PrgP) / 5; // Scale to 0-100
            break;
          case 'Duels %':
            value = 40 + Math.random() * 40;
            break;
          case 'Key Passes':
            value = parseFloat(player.xAG) * 20;
            break;
          case 'Def Actions':
            value = player.Pos.includes('DF') ? 70 + Math.random() * 20 : 30 + Math.random() * 30;
            break;
          case 'Carrying':
            value = 40 + Math.random() * 50;
            break;
          default:
            value = Math.random() * 100;
        }
        
        dataPoint[player.Player] = Math.min(100, Math.round(value));
      });
      
      return dataPoint;
    });
    
    setChartData(radarData);
  }, [data, filterPosition, selectedMetrics]);
  
  if (chartData.length === 0 || selectedPlayers.length === 0) {
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
      <h3 className="text-lg font-medium mb-4">Player Comparison</h3>
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
    </div>
  );
};

export default PlayerRadarChart;
