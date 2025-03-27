
import { useState } from 'react';
import { useTeamStats } from '../../hooks/usePlayerData';
import PlayerTable from './PlayerTable';
import PlayerFilter from './PlayerFilter';
import ComparisonChart from './ComparisonChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PlayerStats = () => {
  const { data, isLoading, error } = useTeamStats();
  const [activeTab, setActiveTab] = useState('all');
  const [filterPosition, setFilterPosition] = useState('all');
  const [comparisonMetric, setComparisonMetric] = useState('Gls');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleFilterChange = (position: string) => {
    setFilterPosition(position);
  };
  
  const handleMetricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setComparisonMetric(e.target.value);
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-72 bg-white/5 animate-pulse rounded"></div>
        <div className="h-96 bg-white/5 animate-pulse rounded-xl"></div>
      </div>
    );
  }
  
  if (error || !data) {
    return (
      <div className="glass-card p-6 text-center">
        <p className="text-red-400">Failed to load player statistics</p>
        <p className="text-sm text-gray-400 mt-2">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="all" onValueChange={handleTabChange} className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <TabsList className="bg-white/5 p-1 rounded-lg">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-fcb-blue data-[state=active]:text-white"
            >
              All Competitions
            </TabsTrigger>
            <TabsTrigger 
              value="laliga" 
              className="data-[state=active]:bg-fcb-blue data-[state=active]:text-white"
            >
              La Liga
            </TabsTrigger>
            <TabsTrigger 
              value="ucl" 
              className="data-[state=active]:bg-fcb-blue data-[state=active]:text-white"
            >
              Champions League
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-3">
            <PlayerFilter
              activePosition={filterPosition}
              onFilterChange={handleFilterChange}
            />
            
            <div className="flex items-center space-x-2">
              <label htmlFor="metric" className="text-sm text-gray-400">
                Comparison:
              </label>
              <select
                id="metric"
                value={comparisonMetric}
                onChange={handleMetricChange}
                className="bg-white/5 text-sm border border-white/10 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-fcb-blue"
              >
                <option value="Gls">Goals</option>
                <option value="Ast">Assists</option>
                <option value="xG">Expected Goals</option>
                <option value="xAG">Expected Assists</option>
                <option value="G+A">Goals + Assists</option>
              </select>
            </div>
          </div>
        </div>
        
        <TabsContent value="all" className="space-y-6 mt-0">
          <ComparisonChart
            data={data.stats_standard_combined}
            metric={comparisonMetric}
          />
          <PlayerTable
            data={data.stats_standard_combined}
            filterPosition={filterPosition}
          />
        </TabsContent>
        
        <TabsContent value="laliga" className="space-y-6 mt-0">
          <ComparisonChart
            data={data.stats_standard_12}
            metric={comparisonMetric}
          />
          <PlayerTable
            data={data.stats_standard_12}
            filterPosition={filterPosition}
          />
        </TabsContent>
        
        <TabsContent value="ucl" className="space-y-6 mt-0">
          <ComparisonChart
            data={data.stats_standard_8}
            metric={comparisonMetric}
          />
          <PlayerTable
            data={data.stats_standard_8}
            filterPosition={filterPosition}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlayerStats;
