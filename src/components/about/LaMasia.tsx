
import { GraduationCap, BarChart, Award } from 'lucide-react';

const LaMasia = () => {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="text-yellow-400 w-6 h-6" />
        <h2 className="text-2xl font-display font-bold">La Masia: The Youth Academy</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <p className="text-gray-300">
            La Masia (The Farmhouse) is Barcelona's legendary youth academy, known 
            for producing world-class talent. Established in 1979, it has trained players like
            Lionel Messi, Xavi Hernández, Andrés Iniesta, and many other stars.
          </p>
          
          <p className="text-gray-300">
            The academy focuses not only on technical skills but also on personal
            development, education, and instilling the club's values and playing
            philosophy. La Masia emphasizes intelligent positioning, technical excellence,
            and understanding of space—elements that define Barcelona's style.
          </p>
          
          <p className="text-gray-300">
            In 2010, La Masia made history when three of its graduates—Messi, Xavi, and
            Iniesta—were the three finalists for the FIFA Ballon d'Or, the first time 
            players from the same academy had swept the podium.
          </p>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2 text-center text-fcb-blue">Notable La Masia Graduates</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Lionel Messi", "Andrés Iniesta", "Xavi Hernández", "Carles Puyol", 
                "Pep Guardiola", "Sergio Busquets", "Gerard Piqué", "Jordi Alba"].map(player => (
                <div key={player} className="bg-fcb-dark/50 p-3 text-center rounded-lg border border-white/5">
                  {player}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-fcb-dark/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-2xl font-display text-yellow-400 text-center mb-2">80+</h3>
            <p className="text-center text-gray-300">First team players produced</p>
          </div>
          
          <div className="bg-fcb-dark/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-2xl font-display text-yellow-400 text-center mb-2">40+</h3>
            <p className="text-center text-gray-300">International stars</p>
          </div>
          
          <div className="bg-fcb-dark/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-2xl font-display text-yellow-400 text-center mb-2">7</h3>
            <p className="text-center text-gray-300">Ballon d'Or winners</p>
          </div>
          
          <div className="text-center mt-4">
            <h3 className="text-lg font-semibold text-yellow-400 mb-1">"La Masia: Creating the Future"</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaMasia;
