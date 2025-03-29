
import { Trophy } from 'lucide-react';

const achievements = [
  {
    title: "5",
    subtitle: "UEFA Champions League",
    color: "text-blue-400",
    years: "1992, 2006, 2009, 2011, 2015"
  },
  {
    title: "26",
    subtitle: "La Liga Titles",
    color: "text-fcb-blue",
    years: "Multiple years including recent titles in 2018, 2019"
  },
  {
    title: "31",
    subtitle: "Copa del Rey",
    color: "text-fcb-red",
    years: "Most recent in 2021"
  },
  {
    title: "3",
    subtitle: "FIFA Club World Cup",
    color: "text-green-400",
    years: "2009, 2011, 2015"
  },
  {
    title: "5",
    subtitle: "UEFA Super Cup",
    color: "text-purple-400",
    years: "1992, 1997, 2009, 2011, 2015"
  },
  {
    title: "14",
    subtitle: "Spanish Super Cup",
    color: "text-amber-400",
    years: "Multiple years including 2023"
  }
];

const ClubAchievements = () => {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="text-yellow-400 w-6 h-6" />
        <h2 className="text-2xl font-display font-bold">Club Achievements</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div 
            key={achievement.subtitle}
            className="bg-fcb-dark border border-white/10 rounded-lg p-5 text-center hover:border-fcb-blue transition-colors"
          >
            <h3 className={`text-4xl font-display font-bold mb-2 ${achievement.color}`}>
              {achievement.title}
            </h3>
            <p className="text-gray-300 font-medium mb-2">{achievement.subtitle}</p>
            <p className="text-xs text-gray-400">{achievement.years}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 border-t border-white/10">
        <h3 className="text-lg font-medium mb-2 text-center">Notable Achievement Periods</h3>
        <div className="space-y-3">
          <div className="bg-fcb-dark/60 p-3 rounded-lg">
            <span className="font-semibold text-fcb-yellow">Guardiola Era (2008-2012):</span> 
            <span className="text-gray-300 ml-2">14 trophies in 4 years, including 2 Champions League titles</span>
          </div>
          <div className="bg-fcb-dark/60 p-3 rounded-lg">
            <span className="font-semibold text-fcb-yellow">2014-2015 Season:</span> 
            <span className="text-gray-300 ml-2">Historic treble under Luis Enrique with MSN trio</span>
          </div>
          <div className="bg-fcb-dark/60 p-3 rounded-lg">
            <span className="font-semibold text-fcb-yellow">2009 Season:</span> 
            <span className="text-gray-300 ml-2">First club to win six trophies in a calendar year</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubAchievements;
