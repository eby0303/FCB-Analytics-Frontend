
import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PlayerStats } from '../../utils/api';

interface PlayerTableProps {
  data: PlayerStats[];
  filterPosition: string;
}

const PlayerTable = ({ data, filterPosition }: PlayerTableProps) => {
  const [sortField, setSortField] = useState<string>('Player');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Filter players by position
  const filteredData = useMemo(() => {
    if (!filterPosition || filterPosition === 'all') return data;
    
    return data.filter(player => {
      // Handle multiple positions (e.g. "FW,MF")
      const positions = player.Pos.split(',');
      return positions.some(pos => pos.trim() === filterPosition);
    });
  }, [data, filterPosition]);
  
  // Sort the data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortField as keyof PlayerStats];
      let bValue = b[sortField as keyof PlayerStats];
      
      // Convert to numbers if they are numeric
      if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      
      if (aValue === bValue) return 0;
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredData, sortField, sortDirection]);
  
  const columns = [
    { id: 'Player', name: 'Player' },
    { id: 'Pos', name: 'Position' },
    { id: 'MP', name: 'Matches' },
    { id: 'Min', name: 'Minutes' },
    { id: 'Gls', name: 'Goals' },
    { id: 'Ast', name: 'Assists' },
    { id: 'xG', name: 'xG' },
    { id: 'xAG', name: 'xAG' },
    { id: 'PrgP', name: 'Prog. Passes' },
  ];

  return (
    <div className="overflow-x-auto glass-card rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((column) => (
              <th
                key={column.id}
                className="px-4 py-3 text-left font-medium text-gray-300"
              >
                <button
                  className="flex items-center space-x-1 hover:text-white transition-colors"
                  onClick={() => handleSort(column.id)}
                >
                  <span>{column.name}</span>
                  {sortField === column.id && (
                    sortDirection === 'asc' ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-400">
                No players found matching the selected filter.
              </td>
            </tr>
          ) : (
            sortedData.map((player, index) => (
              <tr 
                key={`${player.Player}-${index}`}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-white">{player.Player}</td>
                <td className="px-4 py-3 text-gray-300">{player.Pos}</td>
                <td className="px-4 py-3 text-gray-300">{player.MP}</td>
                <td className="px-4 py-3 text-gray-300">{player.Min}</td>
                <td className="px-4 py-3 text-gray-300">{player.Gls}</td>
                <td className="px-4 py-3 text-gray-300">{player.Ast}</td>
                <td className="px-4 py-3 text-gray-300">{player.xG}</td>
                <td className="px-4 py-3 text-gray-300">{player.xAG}</td>
                <td className="px-4 py-3 text-gray-300">{player.PrgP}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;
