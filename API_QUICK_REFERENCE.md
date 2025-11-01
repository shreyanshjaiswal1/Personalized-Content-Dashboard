# API Quick Reference - Personalized Content Dashboard

## 🎯 Quick Overview

This application uses **3 APIs** to provide a unified content feed:

1. **NewsAPI** - News articles (External)
2. **TMDB** - Movie data (External)  
3. **Social API** - Social posts (Internal Next.js route)

---

## 📡 API Endpoints at a Glance

### 1. NewsAPI - News Content

**Base URL:** `https://newsapi.org/v2`

```bash
# Get news by category
GET /top-headlines?category={category}&apiKey={key}&pageSize=20&page=1

# Search news
GET /everything?q={query}&apiKey={key}&pageSize=20&page=1&sortBy=publishedAt
```

**Categories:** `technology`, `sports`, `business`, `entertainment`, `health`, `science`

**Rate Limit:** 100 requests/day (free tier)

---

### 2. TMDB - Movie Content

**Base URL:** `https://api.themoviedb.org/3`

```bash
# Get trending movies
GET /trending/movie/week?api_key={key}&page=1

# Search movies
GET /search/movie?api_key={key}&query={query}&page=1
```

**Rate Limit:** 40 requests per 10 seconds

---

### 3. Social Posts API - Social Content

**Base URL:** `/api/social` (Internal)

```bash
# Get social posts
GET /api/social?page=1
```

**Response:**
```json
{
  "posts": [...],
  "hasMore": true,
  "nextPage": 2
}
```

**Rate Limit:** Unlimited (mock data)

---

## 🔑 Required API Keys

Add these to `.env.local`:

```bash
NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

**Get Keys:**
- NewsAPI: https://newsapi.org/register
- TMDB: https://www.themoviedb.org/settings/api

---

## 🎣 React Hooks Usage

```typescript
// News by category
const { data, isLoading } = useGetNewsByCategoryQuery({ 
  category: 'technology', 
  page: 1 
});

// Search news
const { data, isLoading } = useSearchNewsQuery({ 
  query: 'AI', 
  page: 1 
});

// Trending movies
const { data, isLoading } = useGetTrendingMoviesQuery({ 
  page: 1 
});

// Search movies
const { data, isLoading } = useSearchMoviesQuery({ 
  query: 'inception', 
  page: 1 
});

// Social posts
const { data, isLoading } = useGetSocialPostsQuery({ 
  page: 1 
});
```

---

## 📊 Response Data Formats

### News Item
```typescript
{
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { id: string, name: string };
  type: 'news';
}
```

### Movie Item
```typescript
{
  id: number;
  title: string;
  overview: string;
  poster_path: string;  // Full URL
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  type: 'movie';
}
```

### Social Post
```typescript
{
  id: string;
  author: string;
  content: string;
  avatar: string;
  timestamp: string;
  likes: number;
  comments: number;
  type: 'social';
}
```

---

## 🔄 State Management Flow

```
Component → RTK Query Hook → Check Cache → API Call → Transform Data → Update Store → Re-render
```

---

## ⚡ Performance Features

✅ **Automatic Caching** - RTK Query caches all responses  
✅ **Request Deduplication** - Multiple identical requests = 1 API call  
✅ **Debounced Search** - 500ms delay prevents excessive API calls  
✅ **Background Refetching** - Updates data when user returns to tab  
✅ **Optimistic Updates** - UI updates before API confirmation  

---

## 🛡️ Error Handling

```typescript
const { data, error, isLoading } = useGetNewsByCategoryQuery({...});

if (isLoading) return <Spinner />;
if (error) return <ErrorMessage />;
if (!data) return <EmptyState />;
return <FeedCard item={data} />;
```

---

## 📈 Cache Configuration

| API | Cache Duration | Refetch on Focus | Refetch on Mount |
|-----|----------------|------------------|------------------|
| NewsAPI | 60 seconds | No | 30 seconds |
| TMDB | 300 seconds | No | No |
| Social | 60 seconds | No | No |

---

## 🚀 Quick Test Commands

```bash
# Test API calls with curl

# NewsAPI
curl "https://newsapi.org/v2/top-headlines?category=technology&apiKey=YOUR_KEY"

# TMDB
curl "https://api.themoviedb.org/3/trending/movie/week?api_key=YOUR_KEY"

# Social (when app running)
curl "http://localhost:3000/api/social?page=1"
```

---

## 📁 API Service Files

```
/services/newsApi.ts     → NewsAPI integration
/services/tmdbApi.ts     → TMDB integration
/services/socialApi.ts   → Social API client
/app/api/social/route.ts → Social API route handler
```

---

## 🔧 Redux Store Structure

```javascript
{
  newsApi: {
    queries: { /* cached news data */ }
  },
  tmdbApi: {
    queries: { /* cached movie data */ }
  },
  socialApi: {
    queries: { /* cached social data */ }
  }
}
```

---

## 💡 Common Use Cases

### 1. Load news by category
```typescript
useGetNewsByCategoryQuery({ category: 'technology', page: 1 })
```

### 2. Search across content
```typescript
const debouncedQuery = useDebounce(searchQuery, 500);
useSearchNewsQuery({ query: debouncedQuery, page: 1 });
useSearchMoviesQuery({ query: debouncedQuery, page: 1 });
```

### 3. Implement infinite scroll
```typescript
const [page, setPage] = useState(1);
const { data } = useGetTrendingMoviesQuery({ page });
// Increment page when user scrolls to bottom
```

### 4. Combine multiple sources
```typescript
const news = useGetNewsByCategoryQuery({...});
const movies = useGetTrendingMoviesQuery({...});
const social = useGetSocialPostsQuery({...});

const allItems = [
  ...(news.data || []),
  ...(movies.data || []),
  ...(social.data?.posts || [])
];
```

---

## 📞 Support & Resources

- **Full API Docs:** See `API_DOCUMENTATION.md`
- **Architecture:** See `ARCHITECTURE.md`
- **Setup Guide:** See `README.md`

---

**Quick Reference v1.0** | Updated: Nov 1, 2025
