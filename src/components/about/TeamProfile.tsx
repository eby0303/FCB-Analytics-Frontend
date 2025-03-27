
import { useTeamInfo } from '../../hooks/useTeamData';

const TeamProfile = () => {
  const { data, isLoading, error } = useTeamInfo();

  return (
    <div className="glass-card rounded-xl overflow-hidden animate-fade-in">
      {isLoading ? (
        <div className="p-8 flex flex-col items-center justify-center animate-pulse">
          <div className="w-32 h-32 bg-white/10 rounded-full mb-6"></div>
          <div className="h-8 w-48 bg-white/10 rounded mb-4"></div>
          <div className="h-4 w-32 bg-white/10 rounded"></div>
        </div>
      ) : error ? (
        <div className="p-8 text-center">
          <p className="text-red-400">Failed to load team information</p>
          <p className="text-sm text-gray-400 mt-2">Please try again later</p>
        </div>
      ) : data ? (
        <>
          <div className="relative h-40 bg-gradient-to-r from-fcb-blue to-fcb-red overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-[url('https://www.fcbarcelona.com/photo-resources/2021/08/09/276ad270-e5c6-453d-8c30-f880e6d2095c/Camp-Nou-min.jpg?width=1200&height=750')] bg-cover bg-center opacity-30"></div>
            </div>
          </div>
          
          <div className="p-8 flex flex-col items-center -mt-16 relative">
            <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg mb-4 transform hover:scale-105 transition-transform duration-300">
              <img
                src={data.crest}
                alt={data.name}
                className="w-full h-full object-contain animate-pulse-subtle"
              />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              {data.name}
            </h2>
            
            <div className="flex items-center space-x-2 mb-6">
              <span className="inline-block w-3 h-3 rounded-full bg-fcb-blue"></span>
              <span className="inline-block w-3 h-3 rounded-full bg-fcb-red"></span>
              <span className="text-gray-400">Est. 1899</span>
            </div>
            
            <div className="glass-card p-4 rounded-lg text-center mb-6">
              <h3 className="text-lg font-medium mb-2">Home Stadium</h3>
              <p className="text-xl font-display text-white">{data.venue}</p>
            </div>
            
            <div className="glass-card p-4 rounded-lg w-full max-w-lg">
              <h3 className="text-lg font-medium mb-2">Club Information</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex justify-between">
                  <span>Full Name:</span>
                  <span className="text-white">Futbol Club Barcelona</span>
                </li>
                <li className="flex justify-between">
                  <span>Nickname:</span>
                  <span className="text-white">Barça, Blaugrana</span>
                </li>
                <li className="flex justify-between">
                  <span>Location:</span>
                  <span className="text-white">Barcelona, Catalonia, Spain</span>
                </li>
                <li className="flex justify-between">
                  <span>Current League:</span>
                  <span className="text-white">La Liga</span>
                </li>
                <li className="flex justify-between">
                  <span>Motto:</span>
                  <span className="text-white">Més que un club (More than a club)</span>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TeamProfile;
