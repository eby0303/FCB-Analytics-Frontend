import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PlayerStats } from '../../utils/api';

interface ComparisonChartProps {
  data: PlayerStats[];
  metric: string;
}

const ComparisonChart = ({ data, metric }: ComparisonChartProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    // Sort and get top 5 players by the selected metric (multiplied by 90s)
    const sortedData = [...data]
      .sort((a, b) => {
        const aValue = getMetricValue(a, metric);
        const bValue = getMetricValue(b, metric);
        return bValue - aValue;
      })
      .slice(0, 5);
    
    // Format data for the chart
    const formattedData = sortedData.map(player => ({
      name: player.Player,
      value: getMetricValue(player, metric),
      // Add original per90 value for tooltip
      per90: parseFloat(player[metric as keyof PlayerStats] as string) || 0
    }));
    
    setChartData(formattedData);
  }, [data, metric]);

  // Helper function to get properly formatted metric value
  const getMetricValue = (player: PlayerStats, metric: string): number => {
    const rawValue = parseFloat(player[metric as keyof PlayerStats] as string) * parseFloat(player['90s'] as string || '0');
    
    // Round only specific metrics
    switch (metric) {
      case 'Gls': // Goals
      case 'Ast': // Assists
      case 'G+A': // Goals + Assists
        return Math.round(rawValue);
      default:
        return rawValue; // Keep as float for xG, xAG, etc.
    }
  };
  
  // Get metric display name
  const getMetricName = () => {
    switch (metric) {
      case 'Gls': return 'Goals';
      case 'Ast': return 'Assists';
      case 'xG': return 'Expected Goals';
      case 'xAG': return 'Expected Assists';
      case 'G+A': return 'Goals + Assists';
      default: return metric;
    }
  };

  // Format tooltip value based on metric type
  const formatTooltipValue = (value: number, metric: string) => {
    switch (metric) {
      case 'Gls':
      case 'Ast':
      case 'G+A':
        return Math.round(value);
      default:
        return value.toFixed(2);
    }
  };
  
  if (chartData.length === 0) {
    return (
      <div className="glass-card h-64 flex items-center justify-center rounded-xl">
        <p className="text-gray-400">Loading chart data...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 rounded-xl h-64">
      <h3 className="text-lg font-medium mb-2">Top 5 Players - {getMetricName()}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 10, left: 10, bottom: 30 }}
        >
          <XAxis
            dataKey="name"
            tick={{ fill: '#a3a3a3', fontSize: 12 }}
            axisLine={{ stroke: '#333' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#a3a3a3', fontSize: 12 }}
            axisLine={{ stroke: '#333' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#121212',
              borderColor: '#333',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value, name, props) => [
              // Format based on metric type
              [`Total ${name}:`, formatTooltipValue(value as number, metric)],
              [`Per 90:`, props.payload.per90.toFixed(2)]
            ]}
            labelFormatter={(label) => `Player: ${label}`}
          />
          <Legend />
          <Bar
            dataKey="value"
            name={getMetricName()}
            fill="url(#colorGradient)"
            radius={[4, 4, 0, 0]}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#004D98" />
              <stop offset="100%" stopColor="#A50044" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonChart;