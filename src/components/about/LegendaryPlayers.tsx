
import { Star } from 'lucide-react';

const legendaryPlayers = [
  {
    name: 'Lionel Messi',
    period: '2004-2021',
    goals: 672,
    description: 'The greatest player in club history and widely considered the best footballer of all time.'
  },
  {
    name: 'Xavi Hernández',
    period: '1998-2015',
    goals: 85,
    description: 'Midfield maestro who defined an era of possession-based football.'
  },
  {
    name: 'Andrés Iniesta',
    period: '2002-2018',
    goals: 57,
    description: 'Elegant playmaker known for his technical brilliance and decisive goals.'
  },
  {
    name: 'Johan Cruyff',
    period: '1973-1978',
    goals: 60,
    description: 'Revolutionary player who later became the architect of Barcelona\'s playing philosophy.'
  },
  {
    name: 'Ronaldinho',
    period: '2003-2008',
    goals: 94,
    description: 'Magical Brazilian who brought joy and creativity to the Camp Nou.'
  },
  {
    name: 'Carles Puyol',
    period: '1999-2014',
    goals: 18,
    description: 'Iconic captain and defender who embodied the club\'s values.'
  }
];

const LegendaryPlayers = () => {
  return (
    <div className="glass-card rounded-xl p-6 neo-blur">
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-display font-bold">Legendary Players</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {legendaryPlayers.map((player) => (
          <div 
            key={player.name}
            className="glass-card p-4 rounded-lg hover:translate-y-[-4px] transition-all duration-300"
          >
            <h3 className="text-xl font-display font-medium text-white mb-1">{player.name}</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">{player.period}</span>
              <span className="text-right text-yellow-500">{player.goals} goals</span>
            </div>
            <p className="text-sm text-gray-300">{player.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegendaryPlayers;
