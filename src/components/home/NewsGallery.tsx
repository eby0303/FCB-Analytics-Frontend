
import { useState } from 'react';
import { useNewsData, NewsArticle } from "../../hooks/useNewsData";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const NewsGallery = () => {
  const { data, isLoading, error } = useNewsData();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (isLoading) {
    return <NewsLoading />;
  }
  
  if (error || !data || !data.data || !data.data.articles) {
    return <NewsError />;
  }
  
  const articles = data.data.articles;
  const totalArticles = articles.length;
  const itemsPerView = 3;
  const maxIndex = Math.ceil(totalArticles / itemsPerView) - 1;
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };
  
  const visibleArticles = articles.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  );
  
  return (
    <section className="py-8 md:py-12">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-gradient">Latest News</h2>
          
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-transparent"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-transparent"
            >
              <ArrowRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleArticles.map((article: NewsArticle, index: number) => (
            <NewsCard key={`news-${currentIndex * itemsPerView + index}`} article={article} />
          ))}
        </div>
        
        <div className="flex justify-center mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`mx-1 h-2 w-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-[#FFED02] w-6' : 'bg-gray-600'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsCard = ({ article }: { article: NewsArticle }) => {
  return (
    <a 
      href={article.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block glass-card rounded-xl overflow-hidden h-full transition-transform hover:scale-[1.02] hover:shadow-lg"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-[#FFED02] transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          {article.date} {article.isToday && <span className="ml-2 text-xs bg-[#FFED02] text-fcb-dark px-2 py-0.5 rounded-full">Today</span>}
        </p>
        <div className="flex items-center text-sm text-fcb-blue group-hover:text-fcb-red transition-colors">
          Read more
          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </a>
  );
};

const NewsLoading = () => (
  <section className="py-8 md:py-12">
    <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card rounded-xl overflow-hidden">
            <Skeleton className="aspect-[16/9] w-full" />
            <div className="p-5">
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const NewsError = () => (
  <section className="py-8 md:py-12">
    <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4 text-gradient">Latest News</h2>
      <div className="glass-card rounded-xl p-8 text-center">
        <p className="text-lg text-gray-400">
          Unable to load news at the moment. Please try again later.
        </p>
      </div>
    </div>
  </section>
);

export default NewsGallery;
