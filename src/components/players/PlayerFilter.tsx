
import { useState } from 'react';
import { Filter } from 'lucide-react';

interface PlayerFilterProps {
  activePosition: string;
  onFilterChange: (position: string) => void;
}

const PlayerFilter = ({ activePosition, onFilterChange }: PlayerFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const positions = [
    { id: 'all', name: 'All Positions' },
    { id: 'DF', name: 'Defenders' },
    { id: 'MF', name: 'Midfielders' },
    { id: 'FW', name: 'Forwards' },
    { id: 'GK', name: 'Goalkeepers' }
  ];
  
  const handlePositionClick = (position: string) => {
    onFilterChange(position);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors duration-300"
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">
          {positions.find(p => p.id === activePosition)?.name || 'Filter'}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-10 w-48 bg-fcb-dark neo-blur rounded-lg shadow-lg overflow-hidden">
          <ul className="py-1">
            {positions.map((position) => (
              <li key={position.id}>
                <button
                  onClick={() => handlePositionClick(position.id)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors duration-300 ${
                    activePosition === position.id
                      ? 'bg-fcb-blue/20 text-white'
                      : 'hover:bg-white/5 text-gray-300'
                  }`}
                >
                  {position.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlayerFilter;
