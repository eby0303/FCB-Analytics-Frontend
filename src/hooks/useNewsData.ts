
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/api";

export interface NewsArticle {
  title: string;
  url: string;
  imageUrl: string;
  date: string;
  isToday: boolean;
}

export interface NewsResponse {
  success: boolean;
  data: {
    dateFilter: {
      yesterday: string;
      today: string;
      includeToday: boolean;
    };
    articles: NewsArticle[];
  };
}

const NEWS_API_URL = "http://localhost:5000/api/news";

export const useNewsData = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: () => fetchData<NewsResponse>(NEWS_API_URL),
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
