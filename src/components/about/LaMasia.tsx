
import { Graduation } from 'lucide-react';

const LaMasia = () => {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 p-6 border-b border-white/10">
        <Graduation className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-display font-bold">La Masia: The Youth Academy</h2>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <p className="text-gray-300 mb-4">
            La Masia (The Farmhouse) is Barcelona's legendary youth academy, known for producing world-class talent. Established in 1979, it has trained players like Lionel Messi, Xavi Hernández, Andrés Iniesta, and many other stars.
          </p>
          
          <p className="text-gray-300 mb-4">
            The academy focuses not only on technical skills but also on personal development, education, and instilling the club's values and playing philosophy. La Masia emphasizes intelligent positioning, technical excellence, and understanding of space—elements that define Barcelona's style.
          </p>
          
          <p className="text-gray-300">
            In 2010, La Masia made history when three of its graduates—Messi, Xavi, and Iniesta—were the finalists for the FIFA Ballon d'Or, with Messi winning the award.
          </p>
        </div>
        
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-4xl font-display font-bold text-yellow-500">80+</div>
              <div className="text-sm text-gray-400 mt-2">First team players</div>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-4xl font-display font-bold text-yellow-500">40+</div>
              <div className="text-sm text-gray-400 mt-2">International stars</div>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-4xl font-display font-bold text-yellow-500">7</div>
              <div className="text-sm text-gray-400 mt-2">Ballon d'Or winners</div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-yellow-500 font-medium">"La Masia: Creating the Future"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaMasia;
