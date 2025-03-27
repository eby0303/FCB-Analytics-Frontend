
import { Trophy } from 'lucide-react';

const achievements = [
  { title: 'UEFA Champions League', count: 5 },
  { title: 'La Liga Titles', count: 26 },
  { title: 'Copa del Rey', count: 31 },
  { title: 'FIFA Club World Cup', count: 3 },
  { title: 'UEFA Super Cup', count: 5 },
  { title: 'Spanish Super Cup', count: 14 }
];

const Achievements = () => {
  return (
    <div className="glass-card rounded-xl p-6 neo-blur">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-display font-bold">Achievements</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {achievements.map(achievement => (
          <div 
            key={achievement.title} 
            className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="text-4xl font-display font-bold text-yellow-500">{achievement.count}</div>
            <div className="text-sm text-gray-300 mt-2">{achievement.title}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-400">
          FC Barcelona continues to be one of the most successful and decorated clubs in football history.
        </p>
      </div>
    </div>
  );
};

export default Achievements;
