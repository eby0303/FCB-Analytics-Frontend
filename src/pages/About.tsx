
import { Parallax } from 'react-scroll-parallax';
import TeamProfile from '../components/about/TeamProfile';
import LegendaryPlayers from '../components/about/LegendaryPlayers';
import ClubIdentity from '../components/about/ClubIdentity';
import Achievements from '../components/about/Achievements';
import LaMasia from '../components/about/LaMasia';

const About = () => {
  return (
    <div className="page-container page-transition">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          <span className="text-white">About </span>
          <span className="text-fcb-blue">FC </span>
          <span className="text-fcb-red">Barcelona</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          More than a club. A global institution with a rich history, distinctive identity and a commitment to excellence.
        </p>
      </div>
      
      <div className="space-y-12">
        <TeamProfile />
        <LegendaryPlayers />
        <LaMasia />
        <Achievements />
        <ClubIdentity />
      </div>
    </div>
  );
};

export default About;
