
import { useState, useEffect } from 'react';
import { useNewsData, NewsArticle } from "../../hooks/useNewsData";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const NewsCarousel = () => {
  const { data, isLoading, error } = useNewsData();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      if (!data?.data?.articles) return 0;
      const maxIndex = Math.ceil(data.data.articles.length / 3) - 1;
      return prev === 0 ? maxIndex : prev - 1;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prev) => {
      if (!data?.data?.articles) return 0;
      const maxIndex = Math.ceil(data.data.articles.length / 3) - 1;
      return prev === maxIndex ? 0 : prev + 1;
    });
  };
  
  if (isLoading) {
    return <NewsLoading />;
  }
  
  if (error || !data || !data.data || !data.data.articles) {
    return <NewsError />;
  }
  
  const articles = data.data.articles;
  const maxIndex = Math.ceil(articles.length / 3) - 1;
  const visibleArticles = articles.slice(currentIndex * 3, currentIndex * 3 + 3);
  
  return (
    <section className="py-8 md:py-12">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl text-gradient">
            Latest News
          </h2>
        </div>
        
        <div className="relative">
          {/* Carousel navigation buttons */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={goToPrevious} 
              className="h-9 w-9 rounded-full bg-black/30 hover:bg-black/50 text-white"
              disabled={maxIndex === 0}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
          </div>
          
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={goToNext} 
              className="h-9 w-9 rounded-full bg-black/30 hover:bg-black/50 text-white"
              disabled={maxIndex === 0}
            >
              <ArrowRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
          
          {/* News cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleArticles.map((article: NewsArticle, index: number) => (
              <NewsCard key={`news-${currentIndex * 3 + index}`} article={article} />
            ))}
          </div>
          
          {/* Pagination dots */}
          {maxIndex > 0 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentIndex 
                      ? "bg-fcb-yellow scale-125" 
                      : "bg-gray-500/50 hover:bg-gray-400/50"
                  }`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center">
          <a
            href="https://www.fcbarcelona.com/en/news"
            className="group flex items-center gap-1 text-sm font-medium md:text-base text-fcb-blue hover:text-fcb-red transition-colors justify-center"
          >
            View all news
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
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
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-fcb-yellow transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          {article.date}
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

export default NewsCarousel;
