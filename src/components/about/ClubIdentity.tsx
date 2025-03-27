
import { Palette, Puzzle, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ClubIdentity = () => {
  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-2xl font-display font-bold mb-6">Club Identity</h2>
      
      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="bg-white/5 w-full grid grid-cols-3 p-1 rounded-lg">
          <TabsTrigger 
            value="colors" 
            className="data-[state=active]:bg-fcb-blue data-[state=active]:text-white"
          >
            <Palette className="w-4 h-4 mr-2" />
            Colors & Crest
          </TabsTrigger>
          <TabsTrigger 
            value="philosophy" 
            className="data-[state=active]:bg-fcb-blue data-[state=active]:text-white"
          >
            <Puzzle className="w-4 h-4 mr-2" />
            Playing Philosophy
          </TabsTrigger>
          <TabsTrigger 
            value="culture" 
            className="data-[state=active]:bg-fcb-blue data-[state=active]:text-white"
          >
            <Globe className="w-4 h-4 mr-2" />
            Cultural Significance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors" className="animate-fade-in space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-medium mb-2">The Blaugrana Colors</h3>
              <p className="text-gray-300">
                The iconic blaugrana (blue and red) stripes were adopted in 1899. The club crest 
                has evolved over time but maintains the essential elements: the St. George Cross, 
                the Catalan flag, the club initials, and the team colors.
              </p>
              
              <div className="flex space-x-3 mt-4">
                <div className="flex-1 h-20 bg-fcb-blue rounded-lg flex items-center justify-center">
                  <span className="font-medium text-white">Blaugrana Blue</span>
                </div>
                <div className="flex-1 h-20 bg-fcb-red rounded-lg flex items-center justify-center">
                  <span className="font-medium text-white">Blaugrana Red</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-64 h-64 p-4 border-4 border-white/10 rounded-full flex items-center justify-center bg-white/5">
                <img 
                  src="https://crests.football-data.org/81.png" 
                  alt="FC Barcelona Crest" 
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-fcb-dark/60 rounded-lg">
            <h4 className="font-medium mb-2">Evolution of the Crest</h4>
            <p className="text-gray-300 text-sm">
              Barcelona's crest has undergone several modifications since the club's founding, 
              but has always maintained its distinctive elements. The current version, adopted 
              in 2002, features a more streamlined design while preserving the traditional symbols.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="philosophy" className="animate-fade-in">
          <div className="space-y-4">
            <h3 className="text-xl font-medium mb-2">Tiki-Taka: The Barcelona Way</h3>
            <p className="text-gray-300">
              Barcelona is renowned for its distinctive playing style, often referred to as "tiki-taka," 
              characterized by short passing, movement, and maintaining possession. This approach, refined 
              by Johan Cruyff and later Pep Guardiola, has become synonymous with the club.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-fcb-dark/50 p-4 rounded-lg border border-white/10">
                <h4 className="font-medium mb-2 text-fcb-blue">Possession</h4>
                <p className="text-sm text-gray-300">
                  Controlling the game through dominating ball possession, often exceeding 65% in matches.
                </p>
              </div>
              <div className="bg-fcb-dark/50 p-4 rounded-lg border border-white/10">
                <h4 className="font-medium mb-2 text-fcb-blue">Positional Play</h4>
                <p className="text-sm text-gray-300">
                  Strategic positioning to create passing triangles and numerical advantages.
                </p>
              </div>
              <div className="bg-fcb-dark/50 p-4 rounded-lg border border-white/10">
                <h4 className="font-medium mb-2 text-fcb-blue">High Press</h4>
                <p className="text-sm text-gray-300">
                  Immediate pressure to recover the ball when possession is lost.
                </p>
              </div>
            </div>
            
            <blockquote className="border-l-4 border-fcb-blue pl-4 ml-2 mt-6 italic text-gray-300">
              "Play football, nothing more, but nothing less. Just play football."
              <footer className="text-sm text-gray-400 mt-1">— Johan Cruyff</footer>
            </blockquote>
          </div>
        </TabsContent>
        
        <TabsContent value="culture" className="animate-fade-in">
          <div className="space-y-4">
            <h3 className="text-xl font-medium mb-2">More Than a Club</h3>
            <p className="text-gray-300">
              Beyond football, Barcelona represents Catalan identity and pride. During the Franco 
              dictatorship, the club became a symbol of Catalan resistance. Today, it continues to 
              be an ambassador for Catalan culture on the global stage.
            </p>
            
            <div className="p-4 bg-fcb-dark/60 rounded-lg mt-6">
              <h4 className="font-medium mb-2">Més que un club (More than a club)</h4>
              <p className="text-gray-300">
                This famous motto encapsulates FC Barcelona's significance beyond the sporting arena.
                It represents the club's deep connection to Catalan identity, culture, and values.
                Barcelona has historically stood for democracy, freedom, and Catalan pride, especially
                during periods of political oppression.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-fcb-dark/50 p-4 rounded-lg border border-white/10">
                <h4 className="font-medium mb-2 text-fcb-blue">Social Commitment</h4>
                <p className="text-sm text-gray-300">
                  The FC Barcelona Foundation works globally to support children and youth through sport and education.
                </p>
              </div>
              <div className="bg-fcb-dark/50 p-4 rounded-lg border border-white/10">
                <h4 className="font-medium mb-2 text-fcb-blue">Global Reach</h4>
                <p className="text-sm text-gray-300">
                  With over 300 million followers worldwide, Barcelona uses its platform to promote positive values.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClubIdentity;
