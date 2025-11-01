'use client';

import { useEffect, useState } from 'react';
import { API_KEYS } from '@/config/apiKeys';

export default function TestPage() {
  const [newsData, setNewsData] = useState<any>(null);
  const [movieData, setMovieData] = useState<any>(null);
  const [socialData, setSocialData] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // Test News API
    fetch(`https://newsapi.org/v2/top-headlines?category=sports&country=us&apiKey=${API_KEYS.NEWS_API}&pageSize=5`)
      .then(res => res.json())
      .then(data => {
        console.log('News API Response:', data);
        setNewsData(data);
      })
      .catch(err => {
        console.error('News API Error:', err);
        setErrors(prev => [...prev, `News API: ${err.message}`]);
      });

    // Test TMDB API
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEYS.TMDB}&page=1`)
      .then(res => res.json())
      .then(data => {
        console.log('TMDB API Response:', data);
        setMovieData(data);
      })
      .catch(err => {
        console.error('TMDB API Error:', err);
        setErrors(prev => [...prev, `TMDB API: ${err.message}`]);
      });

    // Test Social API
    fetch('/api/social?page=1')
      .then(res => res.json())
      .then(data => {
        console.log('Social API Response:', data);
        setSocialData(data);
      })
      .catch(err => {
        console.error('Social API Error:', err);
        setErrors(prev => [...prev, `Social API: ${err.message}`]);
      });
  }, []);

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">API Test Page</h1>

      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-900 rounded">
          <h2 className="font-bold text-xl mb-2">Errors:</h2>
          {errors.map((err, i) => (
            <div key={i} className="text-red-200">{err}</div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <div className="border border-gray-700 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">News API (Sports)</h2>
          {newsData ? (
            <div>
              <p className="text-green-400">✅ Status: {newsData.status}</p>
              <p>Total Results: {newsData.totalResults}</p>
              <p>Articles Received: {newsData.articles?.length || 0}</p>
              {newsData.articles?.slice(0, 2).map((article: any, i: number) => (
                <div key={i} className="mt-2 p-2 bg-gray-800 rounded">
                  <p className="font-bold">{article.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-yellow-400">Loading...</p>
          )}
        </div>

        <div className="border border-gray-700 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">TMDB API (Movies)</h2>
          {movieData ? (
            <div>
              <p className="text-green-400">✅ Page: {movieData.page}</p>
              <p>Movies Received: {movieData.results?.length || 0}</p>
              {movieData.results?.slice(0, 2).map((movie: any, i: number) => (
                <div key={i} className="mt-2 p-2 bg-gray-800 rounded">
                  <p className="font-bold">{movie.title}</p>
                  <p className="text-sm text-gray-400">Rating: {movie.vote_average}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-yellow-400">Loading...</p>
          )}
        </div>

        <div className="border border-gray-700 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Social API</h2>
          {socialData ? (
            <div>
              <p className="text-green-400">✅ Posts Received: {socialData.posts?.length || 0}</p>
              {socialData.posts?.slice(0, 2).map((post: any, i: number) => (
                <div key={i} className="mt-2 p-2 bg-gray-800 rounded">
                  <p className="font-bold">{post.author}</p>
                  <p className="text-sm">{post.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-yellow-400">Loading...</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <a href="/" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
