
import RecentMatches from '../components/home/RecentMatches';
import SeasonSummary from '../components/home/SeasonSummary';
import UpcomingFixtures from '../components/home/UpcomingFixtures';

const Index = () => {
  return (
    <div className="page-container page-transition">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gradient">
          FC Barcelona Analytics
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Track performance, analyze statistics, and follow Barcelona's journey throughout the season.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentMatches />
        </div>
        <div className="space-y-8">
          <SeasonSummary />
          <UpcomingFixtures />
        </div>
      </div>
    </div>
  );
};

export default Index;
