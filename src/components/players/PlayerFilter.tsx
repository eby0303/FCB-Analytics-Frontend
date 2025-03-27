
import { useState } from 'react';
import { Filter } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface PlayerFilterProps {
  activePosition: string;
  onFilterChange: (position: string) => void;
}

const PlayerFilter = ({ activePosition, onFilterChange }: PlayerFilterProps) => {
  const positions = [
    { id: 'all', name: 'All Positions' },
    { id: 'DF', name: 'Defenders' },
    { id: 'MF', name: 'Midfielders' },
    { id: 'FW', name: 'Forwards' },
    { id: 'GK', name: 'Goalkeepers' }
  ];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2 px-4 py-2 bg-fcb-dark/80 hover:bg-fcb-dark/90 rounded-lg transition-colors border border-white/10">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">
          {positions.find(p => p.id === activePosition)?.name || 'Filter'}
        </span>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="bg-fcb-dark/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl">
        {positions.map((position) => (
          <DropdownMenuItem
            key={position.id}
            onClick={() => onFilterChange(position.id)}
            className={`text-sm py-2 focus:bg-white/5 cursor-pointer ${
              activePosition === position.id ? 'bg-fcb-blue/20 text-white' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            {position.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlayerFilter;
