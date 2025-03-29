
import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { PlayerStats } from '../../hooks/usePlayerData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

interface PlayerRadarChartProps {
  selectedPlayers: PlayerStats[];
}

// Define stats categories and their labels
const statCategories = {
  attacking: [
    { key: 'goals', label: 'Goals' },
    { key: 'assists', label: 'Assists' },
    { key: 'xG', label: 'xG' },
    { key: 'xA', label: 'xA' },
    { key: 'shots', label: 'Shots' }
  ],
  possession: [
    { key: 'passesCompleted', label: 'Passes Completed' },
    { key: 'passAccuracy', label: 'Pass Accuracy %' },
    { key: 'progressivePasses', label: 'Progressive Passes' },
    { key: 'dribbles', label: 'Dribbles' },
    { key: 'touches', label: 'Touches' }
  ],
  defending: [
    { key: 'tackles', label: 'Tackles' },
    { key: 'interceptions', label: 'Interceptions' },
    { key: 'blocks', label: 'Blocks' },
    { key: 'clearances', label: 'Clearances' },
    { key: 'aerialDuelsWon', label: 'Aerial Duels Won' }
  ]
};

const COLORS = [
  '#004D98', // FCB Blue
  '#A50044', // FCB Red
  '#FFED02', // FCB Yellow
  '#00A3E0', // Light Blue
  '#FF6B00'  // Orange
];

const PlayerPercentileTable = ({ players, category }: { players: PlayerStats[], category: string }) => {
  // Ensure we have the right stats to display
  const stats = statCategories[category as keyof typeof statCategories] || [];
  
  return (
    <div className="overflow-x-auto fcb-scrollbar">
      <table className="min-w-full">
        <thead>
          <tr className="bg-fcb-dark/50 text-white">
            <th className="py-2 px-3 text-left min-w-[100px] sticky left-0 bg-fcb-dark/50 z-10">Player</th>
            {stats.map(stat => (
              <th key={stat.key} className="py-2 px-3 text-left min-w-[120px]">{stat.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player, idx) => (
            <tr key={player.id} className={idx % 2 === 0 ? 'bg-fcb-dark/30' : 'bg-fcb-dark/20'}>
              <td className="py-2 px-3 font-medium sticky left-0 z-10" style={{ backgroundColor: idx % 2 === 0 ? 'rgba(18, 18, 18, 0.3)' : 'rgba(18, 18, 18, 0.2)' }}>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                  {player.name}
                </div>
              </td>
              {stats.map(stat => (
                <td key={stat.key} className="py-2 px-3">
                  <div className="flex items-center">
                    <div className="w-10 text-right mr-2">{player[stat.key as keyof PlayerStats]}</div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{ 
                          width: `${Math.min(player[`${stat.key}Percentile` as keyof PlayerStats] as number || 0, 100)}%`,
                          backgroundColor: COLORS[idx % COLORS.length]
                        }}>
                      </div>
                    </div>
                    <div className="ml-2 text-xs">
                      {player[`${stat.key}Percentile` as keyof PlayerStats] || 0}%
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PlayerRadarChart: React.FC<PlayerRadarChartProps> = ({ selectedPlayers }) => {
  const [activeCategory, setActiveCategory] = useState<string>('attacking');
  
  if (!selectedPlayers || selectedPlayers.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>Select players to view comparison data</p>
      </div>
    );
  }

  // Filter out players without stats
  const playersWithStats = selectedPlayers.filter(player => player.goals !== undefined);
  
  if (playersWithStats.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>No stats available for selected players</p>
      </div>
    );
  }

  // Prepare the data for the radar chart based on the active category
  const stats = statCategories[activeCategory as keyof typeof statCategories] || [];
  
  const radarData = stats.map(stat => {
    const dataPoint: any = { stat: stat.label };
    
    playersWithStats.forEach((player, index) => {
      // Use percentile values if available, otherwise use raw values
      const value = player[`${stat.key}Percentile` as keyof PlayerStats] as number || 0;
      dataPoint[player.name] = Math.min(value, 100); // Cap at 100%
    });
    
    return dataPoint;
  });

  return (
    <Card className="p-4 glass-card">
      <Tabs defaultValue="attacking" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-4">
          <TabsTrigger value="attacking">Attacking</TabsTrigger>
          <TabsTrigger value="possession">Possession</TabsTrigger>
          <TabsTrigger value="defending">Defending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attacking" className="mt-0">
          <PlayerPercentileTable players={playersWithStats} category="attacking" />
        </TabsContent>
        <TabsContent value="possession" className="mt-0">
          <PlayerPercentileTable players={playersWithStats} category="possession" />
        </TabsContent>
        <TabsContent value="defending" className="mt-0">
          <PlayerPercentileTable players={playersWithStats} category="defending" />
        </TabsContent>
        
        <div className="mt-8 h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="stat" tick={{ fill: 'white', fontSize: 12 }} />
              
              {playersWithStats.map((player, index) => (
                <Radar
                  key={player.id}
                  name={player.name}
                  dataKey={player.name}
                  stroke={COLORS[index % COLORS.length]}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={0.2}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Tabs>
    </Card>
  );
};

export default PlayerRadarChart;
