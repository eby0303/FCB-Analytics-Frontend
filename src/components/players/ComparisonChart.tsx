
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PlayerStats } from '../../utils/api';

interface ComparisonChartProps {
  data: PlayerStats[];
  metric: string;
}

// Top 5 players by a given metric
const ComparisonChart = ({ data, metric }: ComparisonChartProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    // Sort and get top 5 players by the selected metric
    const sortedData = [...data]
      .sort((a, b) => {
        const aValue = parseFloat(a[metric as keyof PlayerStats] as string);
        const bValue = parseFloat(b[metric as keyof PlayerStats] as string);
        return bValue - aValue;
      })
      .slice(0, 5);
    
    // Format data for the chart
    const formattedData = sortedData.map(player => ({
      name: player.Player,
      value: parseFloat(player[metric as keyof PlayerStats] as string),
    }));
    
    setChartData(formattedData);
  }, [data, metric]);
  
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
