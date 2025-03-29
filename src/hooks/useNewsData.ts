
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

// Default fallback images
const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1550513027-e20dca68e664?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555685812-4b8f59597d26?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554728696-88a82997e7b1?q=80&w=1470&auto=format&fit=crop"
];

// Function to check if image URL is valid or a placeholder
const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  
  // Check for placeholder/invalid images
  const invalidPatterns = [
    "data:image/gif;base64,R0lGODlh",
    "data:image/gif;base64,R0lGOD",
    "data:image/png;base64",
    "data:image/jpeg;base64"
  ];
  
  return !invalidPatterns.some(pattern => url.includes(pattern));
};

// Function to get a random default image
const getRandomDefaultImage = (): string => {
  const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGES.length);
  return DEFAULT_IMAGES[randomIndex];
};

export const useNewsData = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await fetchData<NewsResponse>(NEWS_API_URL);
      
      // Process articles to replace invalid image URLs with default images
      if (response.data && response.data.articles) {
        response.data.articles = response.data.articles.map(article => ({
          ...article,
          imageUrl: isValidImageUrl(article.imageUrl) 
            ? article.imageUrl 
            : getRandomDefaultImage()
        }));
      }
      
      return response;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
