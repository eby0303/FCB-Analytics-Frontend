
import RecentMatches from '../components/home/RecentMatches';
import SeasonSummary from '../components/home/SeasonSummary';
import UpcomingFixtures from '../components/home/UpcomingFixtures';
import HomeSlideshow from '../components/home/HomeSlideshow';
import TopPlayersStats from '../components/home/TopPlayersStats';
import ClubAchievements from '../components/home/ClubAchievements';

const Index = () => {
  return (
    <div className="page-container page-transition">
      <HomeSlideshow />
      
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gradient">
          FC Barcelona Analytics
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Track performance, analyze statistics, and follow Barcelona's journey throughout the season.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <div className="lg:col-span-8">
          <TopPlayersStats />
        </div>
        <div className="lg:col-span-4">
          <ClubAchievements />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <RecentMatches />
        </div>
        <div className="lg:col-span-4 space-y-8">
          <SeasonSummary />
          <UpcomingFixtures />
        </div>
      </div>
    </div>
  );
};

export default Index;
