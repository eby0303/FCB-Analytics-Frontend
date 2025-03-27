
import TeamProfile from '../components/about/TeamProfile';
import TeamHistory from '../components/about/TeamHistory';

const About = () => {
  return (
    <div className="page-container page-transition">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gradient">
          About FC Barcelona
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Learn about the history, achievements, and culture of one of the world's most iconic football clubs.
        </p>
      </div>
      
      <div className="space-y-12">
        <TeamProfile />
        <TeamHistory />
      </div>
    </div>
  );
};

export default About;
