import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    // title: "FC Barcelona",
    // subtitle: "More Than A Club",
    image: "https://res.cloudinary.com/dijx4ril7/image/upload/v1743103386/Camp-Nou_n1pxmj.jpg",
    // gradient: "from-fcb-blue/80 to-fcb-red/80"
  },
  {
    // title: "Championship Pursuit",
    // subtitle: "Chasing Glory in La Liga",
    image: "https://res.cloudinary.com/dijx4ril7/image/upload/v1743103387/fcb-just-do-it-3840x2160-14150_jtqgrj.jpg",
    // gradient: "from-fcb-red/80 to-fcb-blue/80"
  },
  {
    // title: "European Dreams",
    // subtitle: "Champions League Campaign",
    image: "https://res.cloudinary.com/dijx4ril7/image/upload/v1743104535/fpd30ezKyeZF_dxlplz.jpg",
    // gradient: "from-blue-600/80 to-purple-600/80"
  }
];

const HomeSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[560px] overflow-hidden rounded-xl mb-8 animate-fade-in">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-200 ease-in-out
            ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${slide.image})` }} 
          />
          {/* <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} /> */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
            {/* <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{slide.title}</h2> */}
            {/* <p className="text-xl md:text-2xl">{slide.subtitle}</p> */}
          </div>
        </div>
      ))}
      
      {/* Navigation buttons */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Dots navigation */}
      {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div> */}
    </div>
  );
};

export default HomeSlideshow;