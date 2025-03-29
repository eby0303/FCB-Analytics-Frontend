
import React from 'react';
import HomeSlideshow from '../components/home/HomeSlideshow';
import TopPlayersStats from '../components/home/TopPlayersStats';
import NewsGallery from '../components/home/NewsGallery';
import RecentMatches from '../components/home/RecentMatches';
import UpcomingFixtures from '../components/home/UpcomingFixtures';
import SeasonSummary from '../components/home/SeasonSummary';

const Index = () => {
  return (
    <div className="page-transition">
      <HomeSlideshow />
      <SeasonSummary />
      <NewsGallery />
      <TopPlayersStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
        <RecentMatches />
        <UpcomingFixtures />
      </div>
    </div>
  );
};

export default Index;
