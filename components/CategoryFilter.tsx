import React from 'react';
import type { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: Category[];
  onToggleCategory: (category: Category) => void;
}

const AVAILABLE_CATEGORIES: Category[] = [
  'technology',
  'sports',
  'business',
  'entertainment',
  'health',
  'science',
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onToggleCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Category filters">
      {AVAILABLE_CATEGORIES.map((category) => {
        const isSelected = selectedCategories.includes(category);
        return (
          <button
            key={category}
            onClick={() => onToggleCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${
                isSelected
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            aria-pressed={isSelected}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        );
      })}
    </div>
  );
};
