'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Reorder } from 'framer-motion';
import { DashboardLayout } from '@/components/DashboardLayout';
import { FeedCard } from '@/components/FeedCard';
import { Spinner } from '@/components/Spinner';
import { EmptyState } from '@/components/EmptyState';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { setSearchQuery, toggleCategory } from '@/state/preferencesSlice';
import { addFavorite, removeFavorite, reorderFavorites, loadFavorites } from '@/state/favoritesSlice';
import { useDebounce } from '@/hooks/useDebounce';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useGetNewsByCategoryQuery, useSearchNewsQuery } from '@/services/newsApi';
import { useGetTrendingMoviesQuery, useSearchMoviesQuery } from '@/services/tmdbApi';
import { useGetSocialPostsQuery } from '@/services/socialApi';
import type { FeedItem, Category } from '@/types';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { categories, searchQuery: storeSearchQuery } = useAppSelector((state) => state.preferences);
  const favorites = useAppSelector((state) => state.favorites.items);

  const [searchQuery, setSearchQueryLocal] = useState(storeSearchQuery);
  const [showingFavorites, setShowingFavorites] = useState(false);
  const [newsPage, setNewsPage] = useState(1);
  const [moviePage, setMoviePage] = useState(1);
  const [socialPage, setSocialPage] = useState(1);
  const [allFeedItems, setAllFeedItems] = useState<FeedItem[]>([]);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Persist favorites to localStorage
  const [, setStoredFavorites] = useLocalStorage<FeedItem[]>('favorites', []);

  useEffect(() => {
    setStoredFavorites(favorites);
  }, [favorites, setStoredFavorites]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        const parsedFavorites = JSON.parse(stored);
        dispatch(loadFavorites(parsedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, [dispatch]);

  // Fetch news by category
  const { data: techNews, isFetching: techLoading, error: techError } = useGetNewsByCategoryQuery(
    { category: 'technology', page: newsPage },
    { skip: !categories.includes('technology') || !!debouncedSearchQuery }
  );

  const { data: sportsNews, isFetching: sportsLoading, error: sportsError } = useGetNewsByCategoryQuery(
    { category: 'sports', page: newsPage },
    { skip: !categories.includes('sports') || !!debouncedSearchQuery }
  );

  const { data: businessNews, isFetching: businessLoading, error: businessError } = useGetNewsByCategoryQuery(
    { category: 'business', page: newsPage },
    { skip: !categories.includes('business') || !!debouncedSearchQuery }
  );

  const { data: entertainmentNews, isFetching: entertainmentLoading, error: entertainmentError } = useGetNewsByCategoryQuery(
    { category: 'entertainment', page: newsPage },
    { skip: !categories.includes('entertainment') || !!debouncedSearchQuery }
  );

  const { data: healthNews, isFetching: healthLoading, error: healthError } = useGetNewsByCategoryQuery(
    { category: 'health', page: newsPage },
    { skip: !categories.includes('health') || !!debouncedSearchQuery }
  );

  const { data: scienceNews, isFetching: scienceLoading, error: scienceError } = useGetNewsByCategoryQuery(
    { category: 'science', page: newsPage },
    { skip: !categories.includes('science') || !!debouncedSearchQuery }
  );

  // Search news
  const { data: searchedNews, isFetching: searchNewsLoading, error: searchNewsError } = useSearchNewsQuery(
    { query: debouncedSearchQuery, page: newsPage },
    { skip: !debouncedSearchQuery }
  );

  // Fetch movies
  const { data: trendingMovies, isFetching: moviesLoading, error: moviesError } = useGetTrendingMoviesQuery(
    { page: moviePage },
    { skip: !!debouncedSearchQuery }
  );

  const { data: searchedMovies, isFetching: searchMoviesLoading, error: searchMoviesError } = useSearchMoviesQuery(
    { query: debouncedSearchQuery, page: moviePage },
    { skip: !debouncedSearchQuery }
  );

  // Fetch social posts
  const { data: socialData, isFetching: socialLoading } = useGetSocialPostsQuery(
    { page: socialPage },
    { skip: !!debouncedSearchQuery }
  );

  // Combine all feed items
  useEffect(() => {
    const newsItems = debouncedSearchQuery
      ? searchedNews || []
      : [
          ...(techNews || []),
          ...(sportsNews || []),
          ...(businessNews || []),
          ...(entertainmentNews || []),
          ...(healthNews || []),
          ...(scienceNews || []),
        ];

    const movieItems = debouncedSearchQuery
      ? searchedMovies || []
      : trendingMovies || [];

    const socialItems = debouncedSearchQuery ? [] : socialData?.posts || [];

    const combined = [...newsItems, ...movieItems, ...socialItems];
    
    // Shuffle for variety
    const shuffled = combined.sort(() => Math.random() - 0.5);
    
    setAllFeedItems((prev) => {
      if (newsPage === 1 && moviePage === 1 && socialPage === 1) {
        return shuffled;
      }
      return [...prev, ...shuffled];
    });
  }, [
    techNews,
    sportsNews,
    businessNews,
    entertainmentNews,
    healthNews,
    scienceNews,
    searchedNews,
    trendingMovies,
    searchedMovies,
    socialData,
    debouncedSearchQuery,
    newsPage,
    moviePage,
    socialPage,
  ]);

  const isLoading =
    techLoading ||
    sportsLoading ||
    businessLoading ||
    entertainmentLoading ||
    healthLoading ||
    scienceLoading ||
    searchNewsLoading ||
    moviesLoading ||
    searchMoviesLoading ||
    socialLoading;

  const handleSearchChange = (query: string) => {
    setSearchQueryLocal(query);
    dispatch(setSearchQuery(query));
    // Reset pages when search changes
    setNewsPage(1);
    setMoviePage(1);
    setSocialPage(1);
    setAllFeedItems([]);
  };

  const handleToggleCategory = (category: Category) => {
    dispatch(toggleCategory(category));
    // Reset pages when categories change
    setNewsPage(1);
    setMoviePage(1);
    setSocialPage(1);
    setAllFeedItems([]);
  };

  const handleToggleFavorite = (item: FeedItem) => {
    const isFavorite = favorites.some((fav) => {
      if (fav.type === 'news' && item.type === 'news') return fav.id === item.id;
      if (fav.type === 'movie' && item.type === 'movie') return fav.id === item.id;
      if (fav.type === 'social' && item.type === 'social') return fav.id === item.id;
      return false;
    });

    if (isFavorite) {
      const itemId = item.type === 'news' || item.type === 'social' ? item.id : item.id;
      dispatch(removeFavorite(itemId));
    } else {
      dispatch(addFavorite(item));
    }
  };

  const isFavorite = (item: FeedItem) => {
    return favorites.some((fav) => {
      if (fav.type === 'news' && item.type === 'news') return fav.id === item.id;
      if (fav.type === 'movie' && item.type === 'movie') return fav.id === item.id;
      if (fav.type === 'social' && item.type === 'social') return fav.id === item.id;
      return false;
    });
  };

  const handleLoadMore = () => {
    if (!isLoading) {
      setNewsPage((p) => p + 1);
      setMoviePage((p) => p + 1);
      setSocialPage((p) => p + 1);
    }
  };

  const infiniteScrollRef = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    loading: isLoading,
    hasMore: !showingFavorites,
  });

  const displayItems = showingFavorites ? favorites : allFeedItems;

  // Debug: Log state
  if (typeof window !== 'undefined') {
    (window as any).debugDashboard = {
      categories,
      allFeedItems: allFeedItems.length,
      displayItems: displayItems.length,
      isLoading,
      techNews: techNews?.length || 0,
      sportsNews: sportsNews?.length || 0,
      trendingMovies: trendingMovies?.length || 0,
      socialPosts: socialData?.posts?.length || 0,
    };
  }

  return (
    <DashboardLayout
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      selectedCategories={categories}
      onToggleCategory={handleToggleCategory}
      favoritesCount={favorites.length}
      onShowFavorites={() => setShowingFavorites(!showingFavorites)}
      showingFavorites={showingFavorites}
    >
      {showingFavorites ? (
        favorites.length === 0 ? (
          <EmptyState
            message="No favorites yet. Start adding items to your favorites!"
            icon={
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            }
          />
        ) : (
          <Reorder.Group
            axis="y"
            values={favorites}
            onReorder={(newOrder) => dispatch(reorderFavorites(newOrder))}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {favorites.map((item) => (
              <Reorder.Item
                key={item.type === 'news' || item.type === 'social' ? item.id : `movie-${item.id}`}
                value={item}
                className="cursor-move"
              >
                <FeedCard
                  item={item}
                  isFavorite={true}
                  onToggleFavorite={handleToggleFavorite}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )
      ) : (
        <>
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 rounded text-sm">
              <strong>Debug:</strong> Categories: [{categories.join(', ')}] | 
              Items: {allFeedItems.length} | 
              Loading: {isLoading ? 'Yes' : 'No'} |
              Tech: {techNews?.length || 0} (err: {techError ? 'YES' : 'no'}) |
              Sports: {sportsNews?.length || 0} (err: {sportsError ? 'YES' : 'no'}) |
              Movies: {trendingMovies?.length || 0} (err: {moviesError ? 'YES' : 'no'}) |
              Social: {socialData?.posts?.length || 0}
            </div>
          )}
          {displayItems.length === 0 && !isLoading ? (
            <EmptyState
              message={
                debouncedSearchQuery
                  ? 'No results found. Try a different search term.'
                  : categories.length === 0
                  ? 'Please select at least one category to see content.'
                  : 'No content available. Try different categories or search.'
              }
              icon={
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayItems.map((item, index) => (
                  <FeedCard
                    key={
                      item.type === 'news' || item.type === 'social'
                        ? `${item.id}-${index}`
                        : `movie-${item.id}-${index}`
                    }
                    item={item}
                    isFavorite={isFavorite(item)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>

              {isLoading && (
                <div className="flex justify-center py-8">
                  <Spinner size="lg" />
                </div>
              )}

              <div ref={infiniteScrollRef} className="h-20" />
            </>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
