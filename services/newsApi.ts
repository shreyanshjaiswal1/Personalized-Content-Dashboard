import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NewsItem, Category } from '@/types';
import { API_KEYS } from '@/config/apiKeys';

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Array<{
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }>;
}

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2' }),
  endpoints: (builder) => ({
    getNewsByCategory: builder.query<NewsItem[], { category: Category; page?: number }>({
      query: ({ category, page = 1 }) => ({
        url: '/top-headlines',
        params: {
          category,
          country: 'us',
          apiKey: API_KEYS.NEWS_API,
          pageSize: 20,
          page,
        },
      }),
      transformResponse: (response: NewsResponse) =>
        response.articles.map((article, index) => ({
          id: `${article.url}-${index}`,
          title: article.title,
          description: article.description || '',
          url: article.url,
          urlToImage: article.urlToImage || '/placeholder-news.jpg',
          publishedAt: article.publishedAt,
          source: article.source,
          type: 'news' as const,
        })),
    }),
    searchNews: builder.query<NewsItem[], { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: '/everything',
        params: {
          q: query,
          apiKey: API_KEYS.NEWS_API,
          pageSize: 20,
          page,
          sortBy: 'publishedAt',
        },
      }),
      transformResponse: (response: NewsResponse) =>
        response.articles.map((article, index) => ({
          id: `${article.url}-${index}`,
          title: article.title,
          description: article.description || '',
          url: article.url,
          urlToImage: article.urlToImage || '/placeholder-news.jpg',
          publishedAt: article.publishedAt,
          source: article.source,
          type: 'news' as const,
        })),
    }),
  }),
});

export const { useGetNewsByCategoryQuery, useSearchNewsQuery } = newsApi;
