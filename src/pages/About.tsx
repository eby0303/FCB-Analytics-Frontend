
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamProfile from '../components/about/TeamProfile';
import LegendaryPlayers from '../components/about/LegendaryPlayers';
import LaMasia from '../components/about/LaMasia';
import ClubAchievements from '../components/about/ClubAchievements';
import ClubIdentity from '../components/about/ClubIdentity';

const About = () => {
  return (
    <div className="page-container page-transition">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gradient">
          About FC Barcelona
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          More than a club. A global institution with a rich history, distinctive identity and a commitment to excellence.
        </p>
      </div>
      
      <Tabs defaultValue="history" className="space-y-6">
        <TabsList className="bg-white/5 w-full flex justify-center p-1 rounded-lg mb-6">
          <TabsTrigger 
            value="history" 
            className="data-[state=active]:bg-fcb-blue data-[state=active]:text-white"
          >
            Club History
          </TabsTrigger>
          <TabsTrigger 
            value="legends" 
            className="data-[state=active]:bg-fcb-blue data-[state=active]:text-white"
          >
            Legendary Players
          </TabsTrigger>
          <TabsTrigger 
            value="lamasia" 
            className="data-[state=active]:bg-fcb-blue data-[state=active]:text-white"
          >
            La Masia
          </TabsTrigger>
          <TabsTrigger 
            value="achievements" 
            className="data-[state=active]:bg-fcb-blue data-[state=active]:text-white"
          >
            Achievements
          </TabsTrigger>
          <TabsTrigger 
            value="identity" 
            className="data-[state=active]:bg-fcb-blue data-[state=active]:text-white"
          >
            Club Identity
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="space-y-6 animate-fade-in mt-0">
          <TeamProfile />
        </TabsContent>
        
        <TabsContent value="legends" className="space-y-6 animate-fade-in mt-0">
          <LegendaryPlayers />
        </TabsContent>
        
        <TabsContent value="lamasia" className="space-y-6 animate-fade-in mt-0">
          <LaMasia />
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-6 animate-fade-in mt-0">
          <ClubAchievements />
        </TabsContent>
        
        <TabsContent value="identity" className="space-y-6 animate-fade-in mt-0">
          <ClubIdentity />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default About;
