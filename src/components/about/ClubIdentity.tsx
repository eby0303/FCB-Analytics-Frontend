
import { Globe } from 'lucide-react';

const ClubIdentity = () => {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 p-6 border-b border-white/10">
        <Globe className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-display font-bold">Club Identity</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="glass-card p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Colors & Crest</h3>
          <p className="text-sm text-gray-300">
            The iconic blaugrana (blue and red) stripes were adopted in 1899. The club crest has evolved over time but maintains the essential elements: the St. George Cross, the Catalan flag, the club initials, and the team colors.
          </p>
        </div>
        
        <div className="glass-card p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Playing Philosophy</h3>
          <p className="text-sm text-gray-300">
            Barcelona is renowned for its distinctive playing style, often referred to as "tiki-taka," characterized by short passing, movement, and maintaining possession. This approach, refined by Johan Cruyff and later Pep Guardiola, has become synonymous with the club.
          </p>
        </div>
        
        <div className="glass-card p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Cultural Significance</h3>
          <p className="text-sm text-gray-300">
            Beyond football, Barcelona represents Catalan identity and pride. During the Franco dictatorship, the club became a symbol of Catalan resistance. Today, it continues to be an ambassador for Catalan culture on the global stage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClubIdentity;
