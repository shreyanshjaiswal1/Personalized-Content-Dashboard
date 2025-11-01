import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MovieItem } from '@/types';
import { API_KEYS } from '@/config/apiKeys';

interface TMDBResponse {
  page: number;
  results: Array<{
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }>;
  total_pages: number;
  total_results: number;
}

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<MovieItem[], { page?: number }>({
      query: ({ page = 1 }) => ({
        url: '/trending/movie/week',
        params: {
          api_key: API_KEYS.TMDB,
          page,
        },
      }),
      transformResponse: (response: TMDBResponse) =>
        response.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster_path: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder-movie.jpg',
          backdrop_path: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
            : '/placeholder-movie.jpg',
          vote_average: movie.vote_average,
          release_date: movie.release_date,
          type: 'movie' as const,
        })),
    }),
    searchMovies: builder.query<MovieItem[], { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: '/search/movie',
        params: {
          api_key: API_KEYS.TMDB,
          query,
          page,
        },
      }),
      transformResponse: (response: TMDBResponse) =>
        response.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster_path: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder-movie.jpg',
          backdrop_path: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
            : '/placeholder-movie.jpg',
          vote_average: movie.vote_average,
          release_date: movie.release_date,
          type: 'movie' as const,
        })),
    }),
  }),
});

export const { useGetTrendingMoviesQuery, useSearchMoviesQuery } = tmdbApi;
