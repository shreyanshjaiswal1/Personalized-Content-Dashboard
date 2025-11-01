import React from 'react';

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, icon }) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-4"
      role="status"
      aria-live="polite"
    >
      {icon && <div className="mb-4 text-gray-400 dark:text-gray-600">{icon}</div>}
      <p className="text-lg text-gray-600 dark:text-gray-400 text-center">{message}</p>
    </div>
  );
};
