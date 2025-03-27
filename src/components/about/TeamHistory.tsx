
const timelineEvents = [
  {
    year: 1899,
    title: 'Foundation',
    description: 'FC Barcelona was founded by Joan Gamper and a group of Swiss, Catalan, German, and English footballers.',
  },
  {
    year: 1929,
    title: 'First La Liga Title',
    description: 'Barcelona won the inaugural La Liga championship, establishing themselves as one of Spain\'s elite clubs.',
  },
  {
    year: 1957,
    title: 'Camp Nou Opens',
    description: 'The iconic Camp Nou stadium was inaugurated, replacing the old Les Corts stadium.',
  },
  {
    year: 1974,
    title: 'Johan Cruyff Era Begins',
    description: 'The legendary Dutch player Johan Cruyff joined FC Barcelona, revolutionizing the club\'s playing style.',
  },
  {
    year: 1992,
    title: 'First European Cup',
    description: 'Barcelona won their first European Cup at Wembley Stadium, with manager Johan Cruyff\'s "Dream Team".',
  },
  {
    year: 2008,
    title: 'Pep Guardiola Era',
    description: 'Pep Guardiola was appointed as head coach, beginning one of the most successful periods in club history.',
  },
  {
    year: 2009,
    title: 'Historic Sextuple',
    description: 'Barcelona became the first club to win six trophies in a single year, including the Champions League and La Liga.',
  },
  {
    year: 2015,
    title: 'Second Treble',
    description: 'Under Luis Enrique, Barcelona won their second treble with the MSN trio of Messi, Suárez, and Neymar.',
  },
];

const TeamHistory = () => {
  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in">
      <h2 className="section-title mb-8">Club History</h2>
      
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute top-0 bottom-0 left-0 md:left-1/2 w-0.5 bg-gradient-to-b from-fcb-blue via-gray-600 to-fcb-red transform md:translate-x-[-0.5px]"></div>
        
        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <div 
              key={event.year}
              className={`relative flex flex-col md:flex-row items-start ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-[-8px] md:left-1/2 w-4 h-4 rounded-full bg-fcb-blue border-2 border-white transform md:translate-x-[-8px]"></div>
              
              {/* Year pill */}
              <div className={`flex-none mb-4 md:mb-0 ${
                index % 2 === 0 ? 'md:pl-10' : 'md:pr-10 md:text-right'
              }`}>
                <span className="inline-block font-display font-bold text-lg px-3 py-1 rounded-full bg-gradient-to-r from-fcb-blue to-fcb-red text-white">
                  {event.year}
                </span>
              </div>
              
              {/* Content */}
              <div className={`pl-8 md:pl-0 flex-grow ${
                index % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10'
              }`}>
                <h3 className="text-xl font-display font-medium text-white mb-2">{event.title}</h3>
                <p className="text-gray-300">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamHistory;
