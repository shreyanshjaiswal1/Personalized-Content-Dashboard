// Types for the application
export type Category = 'technology' | 'sports' | 'business' | 'entertainment' | 'health' | 'science';

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  type: 'news';
}

export interface MovieItem {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  type: 'movie';
}

export interface SocialPost {
  id: string;
  author: string;
  content: string;
  avatar: string;
  timestamp: string;
  likes: number;
  comments: number;
  type: 'social';
}

export type FeedItem = (NewsItem | MovieItem | SocialPost) & { 
  order?: number;
};

export interface PreferencesState {
  categories: Category[];
  darkMode: boolean;
  searchQuery: string;
}

export interface FavoritesState {
  items: FeedItem[];
}
