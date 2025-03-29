
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
  
  // Process data to convert per 90 stats to total stats
  const processedData = useMemo(() => {
    return filteredData.map(player => {
      const minutes90s = parseFloat(player["90s"]) || 0;  // Ensure it's a valid number
      const totalGoals = Math.round((parseFloat(player.Gls) || 0) * minutes90s);
      const totalAssists = Math.round((parseFloat(player.Ast) || 0) * minutes90s);
  
      return {
        ...player,
        _originalGls: player.Gls || 0,
        _originalAst: player.Ast || 0,
        Gls: totalGoals.toString(),
        Ast: totalAssists.toString(),
        Min: player.Min || 0,
        MP: player.MP || 0,
        xG: player.xG || 0,
        xAG: player.xAG || 0,
        PrgP: player.PrgP || 0,
      };
    });
  }, [filteredData]);
  
  
  // Sort the data
  const sortedData = useMemo(() => {
    return [...processedData].sort((a, b) => {
      let aValue: string | number = a[sortField as keyof PlayerStats] as string;
      let bValue: string | number = b[sortField as keyof PlayerStats] as string;
  
      // Ensure values are converted to numbers where needed
      aValue = isNaN(Number(aValue)) ? aValue : Number(aValue);
      bValue = isNaN(Number(bValue)) ? bValue : Number(bValue);
  
      // Use original per-90 values for sorting goals and assists
      if (sortField === "Gls" && "_originalGls" in a) {
        aValue = parseFloat(a._originalGls as string) * parseFloat(a["90s"] as string);
        bValue = parseFloat(b._originalGls as string) * parseFloat(b["90s"] as string);
      }
  
      if (sortField === "Ast" && "_originalAst" in a) {
        aValue = parseFloat(a._originalAst as string) * parseFloat(a["90s"] as string);
        bValue = parseFloat(b._originalAst as string) * parseFloat(b["90s"] as string);
      }
  
      // Convert non-numeric values to 0
      aValue = typeof aValue === "number" && !isNaN(aValue) ? aValue : 0;
      bValue = typeof bValue === "number" && !isNaN(bValue) ? bValue : 0;
  
      if (aValue === bValue) return 0;
  
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [processedData, sortField, sortDirection]);
  
  
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
