
import { useNewsData, NewsArticle } from "../../hooks/useNewsData";
import { Gallery6, GalleryItem } from "../ui/gallery6";
import { Skeleton } from "../ui/skeleton";

const LatestNews = () => {
  const { data, isLoading, error } = useNewsData();
  
  if (isLoading) {
    return <NewsLoading />;
  }
  
  if (error || !data || !data.data || !data.data.articles) {
    return <NewsError />;
  }
  
  const newsItems: GalleryItem[] = data.data.articles.map((article: NewsArticle, index: number) => ({
    id: `news-${index}`,
    title: article.title,
    summary: article.date,
    url: article.url,
    image: article.imageUrl,
  }));
  
  return (
    <Gallery6
      heading="Latest News"
      items={newsItems}
      demoUrl="https://www.fcbarcelona.com/en/news"
    />
  );
};

const NewsLoading = () => (
  <section className="py-12 md:py-16">
    <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <Skeleton className="h-12 w-64 mb-4" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card rounded-xl overflow-hidden">
            <Skeleton className="aspect-[3/2] w-full" />
            <div className="p-6">
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
  <section className="py-12 md:py-16">
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

export default LatestNews;
