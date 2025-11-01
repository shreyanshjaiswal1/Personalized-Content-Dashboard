import React from 'react';
import { SearchInput } from './SearchInput';
import { ThemeToggle } from './ThemeToggle';
import { CategoryFilter } from './CategoryFilter';
import type { Category } from '@/types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: Category[];
  onToggleCategory: (category: Category) => void;
  favoritesCount: number;
  onShowFavorites: () => void;
  showingFavorites: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  searchQuery,
  onSearchChange,
  selectedCategories,
  onToggleCategory,
  favoritesCount,
  onShowFavorites,
  showingFavorites,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Personalized Content Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={onShowFavorites}
                className={`relative px-4 py-2 rounded-lg font-medium transition-colors
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    showingFavorites
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                aria-label={`${showingFavorites ? 'Hide' : 'Show'} favorites`}
              >
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill={showingFavorites ? 'currentColor' : 'none'}
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
                  Favorites
                  {favoritesCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
                      {favoritesCount}
                    </span>
                  )}
                </span>
              </button>
              <ThemeToggle />
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <SearchInput
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search news and movies..."
            />
            
            {!showingFavorites && (
              <CategoryFilter
                categories={selectedCategories}
                selectedCategories={selectedCategories}
                onToggleCategory={onToggleCategory}
              />
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2025 Personalized Content Dashboard. Built with Next.js, Redux Toolkit, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};
