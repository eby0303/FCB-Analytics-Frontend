
import PlayerStats from '../components/players/PlayerStats';

const Players = () => {
  return (
    <div className="page-container page-transition">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gradient">
          Player Statistics
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl">
          Analyze individual player performances across all competitions with detailed statistics and visualizations.
        </p>
      </div>
      
      <PlayerStats />
    </div>
  );
};

export default Players;
