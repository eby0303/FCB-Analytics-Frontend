
import { Trophy } from 'lucide-react';

const ClubAchievements = () => {
  const achievements = [
    { title: 'UEFA Champions League', count: 5 },
    { title: 'La Liga Titles', count: 26 },
    { title: 'Copa del Rey', count: 31 },
    { title: 'FIFA Club World Cup', count: 3 }
  ];

  return (
    <div className="glass-card rounded-xl overflow-hidden h-full">
      <div className="flex items-center gap-2 p-4 border-b border-white/10">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h2 className="text-xl font-display font-medium text-gradient">Club Achievements</h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.title} 
              className="flex flex-col items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <span className="text-3xl font-display font-bold text-yellow-500">{achievement.count}</span>
              <span className="text-sm text-center text-gray-300 mt-2">{achievement.title}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            One of the most decorated clubs in world football history
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClubAchievements;
