
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
      
      <div className="space-y-12 animate-fade-in">
        <section>
          <TeamProfile />
        </section>
        
        <section>
          <h2 className="text-3xl font-display font-bold mb-6 text-gradient">Club History Timeline</h2>
          <div className="glass-card p-6 rounded-xl">
            <div className="relative border-l-2 border-fcb-blue pl-8 space-y-12 py-4">
              {/* Timeline events */}
              <div className="relative">
                <div className="absolute -left-10 w-6 h-6 rounded-full bg-fcb-blue flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">1899 - Foundation</h3>
                <p className="text-gray-300">
                  FC Barcelona was founded on November 29, 1899, by Swiss football pioneer Joan Gamper, 
                  who placed an advertisement in Los Deportes declaring his wish to form a football club.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="overflow-hidden rounded-lg">
                    {/* <img 
                      src="https://www.fcbarcelona.com/photo-resources/2020/03/05/3e522f32-b31d-4c20-a596-7ba889ab93a5/joan-gamper.jpg?width=640&height=400" 
                      alt="Joan Gamper"
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    /> */}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-10 w-6 h-6 rounded-full bg-fcb-blue flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">1920s-1930s - First Golden Era</h3>
                <p className="text-gray-300">
                  Barcelona enjoyed its first golden era during the 1920s, led by legendary player Josep Samitier, and 
                  inaugurated Les Corts stadium with an initial capacity of 30,000 spectators.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="overflow-hidden rounded-lg">
                    {/* <img 
                      src="https://www.fcbarcelona.com/photo-resources/2020/03/05/b5ea84d5-8f86-40cd-ac63-c27c5ce20589/les-corts.jpg?width=640&height=400" 
                      alt="Les Corts Stadium"
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    /> */}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-10 w-6 h-6 rounded-full bg-fcb-blue flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">1950s - László Kubala Era</h3>
                <p className="text-gray-300">
                  The arrival of László Kubala in 1950 marked the beginning of a new era. His impressive talent 
                  attracted so many spectators that it prompted the construction of a new stadium.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="overflow-hidden rounded-lg">
                    {/* <img 
                      src="https://www.fcbarcelona.com/photo-resources/2020/03/05/1c8a3ff5-db5c-455e-a398-ec10a325f8c2/kubala.jpg?width=640&height=400" 
                      alt="László Kubala"
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    /> */}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-10 w-6 h-6 rounded-full bg-fcb-blue flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">1957 - Camp Nou</h3>
                <p className="text-gray-300">
                  Camp Nou was inaugurated on September 24, 1957. The new stadium, with an initial 
                  capacity of 93,053, would become iconic in world football.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="overflow-hidden rounded-lg">
                    {/* <img 
                      src="https://www.fcbarcelona.com/photo-resources/2020/03/05/2e8346f7-fad2-4eb6-bcbd-90945d52ae26/camp-nou-1957.jpg?width=640&height=400" 
                      alt="Camp Nou 1957"
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    /> */}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-10 w-6 h-6 rounded-full bg-fcb-blue flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">1974 - Arrival of Johan Cruyff</h3>
                <p className="text-gray-300">
                  In 1974, Johan Cruyff arrived at Barcelona, helping the club win their first league title since 1960 
                  and becoming a club legend both as a player and later as a coach.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="overflow-hidden rounded-lg">
                    {/* <img 
                      src="https://www.fcbarcelona.com/photo-resources/2020/03/05/4e17eb0f-8bce-4c9b-8888-2f25fd36dd21/cruyff-player.jpg?width=640&height=400" 
                      alt="Johan Cruyff"
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    /> */}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-10 w-6 h-6 rounded-full bg-fcb-blue flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">1992 - First European Cup</h3>
                <p className="text-gray-300">
                  The 'Dream Team' coached by Johan Cruyff won the club's first European Cup at Wembley Stadium in 1992, 
                  defeating Sampdoria with a free-kick goal by Ronald Koeman.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="overflow-hidden rounded-lg">
                    {/* <img 
                      src="https://www.fcbarcelona.com/photo-resources/2020/03/05/ba7b5c97-b5d7-4152-8b21-2ae68a5df80b/dream-team.jpg?width=640&height=400" 
                      alt="Dream Team 1992"
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    /> */}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-10 w-6 h-6 rounded-full bg-fcb-blue flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">2000s - Ronaldinho & Messi Era</h3>
                <p className="text-gray-300">
                  Ronaldinho brought joy back to the club, winning the 2006 Champions League, while La Masia 
                  graduate Lionel Messi began his journey to becoming the greatest player in the club's history.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="overflow-hidden rounded-lg">
                    {/* <img 
                      src="https://www.fcbarcelona.com/photo-resources/2020/03/05/74a885af-a773-4caf-b087-10c1f01a1754/ronaldinho.jpg?width=640&height=400" 
                      alt="Ronaldinho"
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    /> */}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-10 w-6 h-6 rounded-full bg-fcb-blue flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">2009-2015 - Pep Guardiola & Luis Enrique Era</h3>
                <p className="text-gray-300">
                  Under Pep Guardiola and later Luis Enrique, Barcelona won two trebles and established 
                  a playing style that revolutionized football, with Messi, Xavi, and Iniesta at its core.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="overflow-hidden rounded-lg">
                    {/* <img 
                      src="https://www.fcbarcelona.com/photo-resources/2020/03/05/caa98425-6a7d-4eb2-bf0a-512f3c00dd91/tiki-taka.jpg?width=640&height=400" 
                      alt="Tiki-Taka Era"
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    /> */}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-10 w-6 h-6 rounded-full bg-fcb-red flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">Present Day - New Era</h3>
                <p className="text-gray-300">
                  After Messi's departure in 2021, Barcelona is rebuilding with exciting young talent like 
                  Pedri, Gavi, and Lamine Yamal, aiming to return to the pinnacle of world football.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="overflow-hidden rounded-lg">
                    {/* <img 
                      src="https://www.fcbarcelona.com/photo-resources/2023/08/27/dd9c83ae-2fdf-4f5a-a9dc-0562ea392fcb/09-lamine_w_35821828.jpg?width=640&height=400" 
                      alt="New Generation"
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <LegendaryPlayers />
        </section>
        
        <section>
          <LaMasia />
        </section>
        
        <section>
          <ClubAchievements />
        </section>
        
        <section>
          <ClubIdentity />
        </section>
      </div>
    </div>
  );
};

export default About;
