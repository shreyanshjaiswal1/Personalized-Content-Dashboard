import React from 'react';
import { motion } from 'framer-motion';
import type { FeedItem, NewsItem, MovieItem, SocialPost } from '@/types';

interface FeedCardProps {
  item: FeedItem;
  isFavorite: boolean;
  onToggleFavorite: (item: FeedItem) => void;
}

export const FeedCard: React.FC<FeedCardProps> = ({ item, isFavorite, onToggleFavorite }) => {
  const renderNewsCard = (news: NewsItem) => (
    <>
      {news.urlToImage && (
        <img
          src={news.urlToImage}
          alt={news.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase">
            {news.source.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(news.publishedAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {news.description}
        </p>
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Read more →
        </a>
      </div>
    </>
  );

  const renderMovieCard = (movie: MovieItem) => (
    <>
      {movie.poster_path && (
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">
            Movie
          </span>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-400 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {movie.overview}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          Release: {new Date(movie.release_date).toLocaleDateString()}
        </p>
      </div>
    </>
  );

  const renderSocialCard = (post: SocialPost) => (
    <div className="p-4">
      <div className="flex items-center mb-3">
        <img
          src={post.avatar}
          alt={post.author}
          className="w-10 h-10 rounded-full mr-3"
          loading="lazy"
        />
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">{post.author}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(post.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{post.content}</p>
      <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="text-sm">{post.likes}</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="text-sm">{post.comments}</span>
        </div>
      </div>
    </div>
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                 hover:shadow-lg transition-shadow relative group"
    >
      <button
        onClick={() => onToggleFavorite(item)}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white dark:bg-gray-800 
                   shadow-md hover:scale-110 transition-transform focus:outline-none 
                   focus:ring-2 focus:ring-blue-500"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <svg
          className={`w-6 h-6 ${
            isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
          }`}
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {item.type === 'news' && renderNewsCard(item as NewsItem)}
      {item.type === 'movie' && renderMovieCard(item as MovieItem)}
      {item.type === 'social' && renderSocialCard(item as SocialPost)}
    </motion.article>
  );
};
