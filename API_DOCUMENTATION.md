# API Documentation - Personalized Content Dashboard

## Overview

This application integrates with multiple APIs to provide a unified content feed. Below is the complete API architecture, endpoints, and integration details.

---

## 📡 API Architecture

### External APIs (3rd Party)

1. **NewsAPI** - News articles and headlines
2. **TMDB (The Movie Database)** - Movie data and recommendations
3. **Custom Next.js API Route** - Social media posts (mock data)

### Internal API Layer

- **RTK Query Services** - Handles caching, loading states, and data transformation
- **Redux Store** - Centralized state management

---

## 🔌 API Integrations

### 1. NewsAPI Integration

**Base URL**: `https://newsapi.org/v2`

**Authentication**: API Key (Query Parameter)

**Service File**: `/services/newsApi.ts`

#### Endpoints Used:

##### A. Get News by Category
```typescript
GET /top-headlines
```

**Parameters:**
- `category`: string (technology, sports, business, entertainment, health, science)
- `apiKey`: string (from environment variable)
- `pageSize`: number (default: 20)
- `page`: number (for pagination)

**Example Request:**
```
GET https://newsapi.org/v2/top-headlines?category=technology&apiKey=YOUR_KEY&pageSize=20&page=1
```

**Response Structure:**
```json
{
  "status": "ok",
  "totalResults": 100,
  "articles": [
    {
      "source": {
        "id": "techcrunch",
        "name": "TechCrunch"
      },
      "author": "John Doe",
      "title": "Article Title",
      "description": "Article description",
      "url": "https://example.com/article",
      "urlToImage": "https://example.com/image.jpg",
      "publishedAt": "2025-11-01T10:00:00Z",
      "content": "Full article content..."
    }
  ]
}
```

**Transformed Data (App Format):**
```typescript
interface NewsItem {
  id: string;                    // Generated from URL + index
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  type: 'news';                  // Added by transformer
}
```

##### B. Search News
```typescript
GET /everything
```

**Parameters:**
- `q`: string (search query)
- `apiKey`: string
- `pageSize`: number (default: 20)
- `page`: number
- `sortBy`: string (default: 'publishedAt')

**Example Request:**
```
GET https://newsapi.org/v2/everything?q=artificial+intelligence&apiKey=YOUR_KEY&pageSize=20&page=1&sortBy=publishedAt
```

**Rate Limits:**
- Free Tier: 100 requests per day
- Developer: 1,000 requests per day

**Error Handling:**
```typescript
{
  "status": "error",
  "code": "apiKeyInvalid",
  "message": "Your API key is invalid or incorrect."
}
```

---

### 2. TMDB API Integration

**Base URL**: `https://api.themoviedb.org/3`

**Authentication**: API Key (Query Parameter)

**Service File**: `/services/tmdbApi.ts`

#### Endpoints Used:

##### A. Get Trending Movies
```typescript
GET /trending/movie/week
```

**Parameters:**
- `api_key`: string (from environment variable)
- `page`: number (default: 1)

**Example Request:**
```
GET https://api.themoviedb.org/3/trending/movie/week?api_key=YOUR_KEY&page=1
```

**Response Structure:**
```json
{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/path.jpg",
      "genre_ids": [28, 12, 878],
      "id": 12345,
      "original_language": "en",
      "original_title": "Movie Title",
      "overview": "Movie overview...",
      "popularity": 1234.56,
      "poster_path": "/poster.jpg",
      "release_date": "2025-10-15",
      "title": "Movie Title",
      "video": false,
      "vote_average": 8.5,
      "vote_count": 1000
    }
  ],
  "total_pages": 100,
  "total_results": 2000
}
```

**Transformed Data (App Format):**
```typescript
interface MovieItem {
  id: number;
  title: string;
  overview: string;
  poster_path: string;           // Full URL: https://image.tmdb.org/t/p/w500/...
  backdrop_path: string;         // Full URL: https://image.tmdb.org/t/p/w1280/...
  vote_average: number;
  release_date: string;
  type: 'movie';                 // Added by transformer
}
```

##### B. Search Movies
```typescript
GET /search/movie
```

**Parameters:**
- `api_key`: string
- `query`: string (search term)
- `page`: number

**Example Request:**
```
GET https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=inception&page=1
```

**Image URLs:**
- Poster: `https://image.tmdb.org/t/p/w500{poster_path}`
- Backdrop: `https://image.tmdb.org/t/p/w1280{backdrop_path}`

**Rate Limits:**
- 40 requests every 10 seconds per IP

---

### 3. Social Posts API (Custom)

**Base URL**: `/api/social` (Next.js API Route)

**Authentication**: None (Internal API)

**Service File**: `/services/socialApi.ts`

**API Route**: `/app/api/social/route.ts`

#### Endpoint:

##### Get Social Posts
```typescript
GET /api/social
```

**Parameters:**
- `page`: number (query parameter, default: 1)

**Example Request:**
```
GET http://localhost:3000/api/social?page=1
```

**Response Structure:**
```json
{
  "posts": [
    {
      "id": "post-1",
      "author": "John Doe",
      "content": "Post content here...",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "timestamp": "2025-11-01T10:30:00.000Z",
      "likes": 42,
      "comments": 10,
      "type": "social"
    }
  ],
  "hasMore": true,
  "nextPage": 2
}
```

**Data Structure:**
```typescript
interface SocialPost {
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

**Mock Data Details:**
- Page Size: 10 posts per page
- Total Pages: 5 (50 posts total)
- Simulated Delay: 500ms
- Avatar Source: pravatar.cc (random avatars)

**Implementation Details:**
```typescript
// Generates mock posts with:
- 8 different authors
- 10 different content variations
- Random like counts (0-500)
- Random comment counts (0-100)
- Timestamps within last 7 days
```

---

## 🔄 RTK Query Configuration

### Cache Behavior

**News API:**
```typescript
{
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://newsapi.org/v2' 
  }),
  keepUnusedDataFor: 60,        // Cache for 60 seconds
  refetchOnMountOrArgChange: 30 // Refetch if data older than 30s
}
```

**TMDB API:**
```typescript
{
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.themoviedb.org/3' 
  }),
  keepUnusedDataFor: 300,       // Cache for 5 minutes
  refetchOnFocus: false
}
```

**Social API:**
```typescript
{
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api' 
  }),
  keepUnusedDataFor: 60
}
```

---

## 🎣 React Hooks Usage

### News Hooks

```typescript
// Get news by category
const { data, isLoading, isFetching, error } = useGetNewsByCategoryQuery({
  category: 'technology',
  page: 1
});

// Search news
const { data, isLoading } = useSearchNewsQuery({
  query: 'artificial intelligence',
  page: 1
});
```

### Movie Hooks

```typescript
// Get trending movies
const { data, isLoading } = useGetTrendingMoviesQuery({
  page: 1
});

// Search movies
const { data, isLoading } = useSearchMoviesQuery({
  query: 'inception',
  page: 1
});
```

### Social Posts Hook

```typescript
// Get social posts
const { data, isLoading } = useGetSocialPostsQuery({
  page: 1
});
```

---

## 🔐 Environment Variables

Required environment variables in `.env.local`:

```bash
# NewsAPI Configuration
NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key_here

# TMDB Configuration
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

**How to Get Keys:**

1. **NewsAPI:**
   - Visit: https://newsapi.org/register
   - Sign up for free account
   - Copy API key from dashboard
   - Free tier: 100 requests/day

2. **TMDB:**
   - Visit: https://www.themoviedb.org/signup
   - Create account
   - Go to Settings → API
   - Request API key (choose "Developer")
   - Copy API key (v3 auth)
   - Free tier: 40 requests/10 seconds

---

## 📊 Data Flow

```
User Action (Search/Filter)
    ↓
React Component
    ↓
RTK Query Hook
    ↓
Check Cache ──→ Hit? Return Cached Data
    ↓ Miss
API Request (with params)
    ↓
External API / Next.js Route
    ↓
Response
    ↓
Data Transformer (normalize structure)
    ↓
Update Cache
    ↓
Update Redux Store
    ↓
Re-render Component
    ↓
Display to User
```

---

## 🛡️ Error Handling

### Error Types

```typescript
interface APIError {
  status?: number;
  data?: {
    message: string;
    code?: string;
  };
}
```

### Error States in Components

```typescript
const { data, error, isLoading } = useGetNewsByCategoryQuery({...});

if (isLoading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;
if (!data) return <EmptyState />;
```

### Common Error Codes

**NewsAPI:**
- `apiKeyInvalid` - Invalid API key
- `apiKeyMissing` - No API key provided
- `rateLimited` - Too many requests
- `parametersMissing` - Required parameters missing

**TMDB:**
- `401` - Invalid API key
- `404` - Resource not found
- `429` - Rate limit exceeded

**Social API:**
- Custom error messages from Next.js route

---

## 🚀 Performance Optimizations

### 1. Request Deduplication
RTK Query automatically deduplicates identical requests:
```typescript
// Multiple components calling same endpoint
// Only 1 actual API request made
useGetNewsByCategoryQuery({ category: 'tech' }); // Request 1
useGetNewsByCategoryQuery({ category: 'tech' }); // Uses Request 1's result
```

### 2. Automatic Caching
```typescript
// First call - hits API
const result1 = useGetTrendingMoviesQuery({ page: 1 });

// Second call within cache time - uses cache
const result2 = useGetTrendingMoviesQuery({ page: 1 });
```

### 3. Background Refetching
```typescript
// Refetch when user returns to tab
refetchOnFocus: true

// Refetch when component remounts
refetchOnMountOrArgChange: 30 // seconds
```

### 4. Optimistic Updates
```typescript
// Favorites update immediately in UI
// Before API confirmation
dispatch(addFavorite(item));
```

---

## 📝 API Call Examples

### Complete Flow Example

```typescript
// 1. User searches for "react"
<SearchInput value="react" onChange={handleSearch} />

// 2. Debounced (500ms) to avoid excessive API calls
const debouncedQuery = useDebounce("react", 500);

// 3. Trigger API calls when debounced value changes
const { data: newsResults } = useSearchNewsQuery({
  query: debouncedQuery,
  page: 1
}, { skip: !debouncedQuery });

const { data: movieResults } = useSearchMoviesQuery({
  query: debouncedQuery,
  page: 1
}, { skip: !debouncedQuery });

// 4. Combine and display results
const allResults = [...(newsResults || []), ...(movieResults || [])];

// 5. Render cards
{allResults.map(item => <FeedCard key={item.id} item={item} />)}
```

---

## 🧪 Testing API Integration

### Unit Tests (Vitest)
```typescript
// Test API service configuration
describe('newsApi', () => {
  it('should have correct base URL', () => {
    expect(newsApi.reducerPath).toBe('newsApi');
  });
});
```

### Integration Tests
```typescript
// Test component with API hooks
describe('FeedCard', () => {
  it('should display news data', async () => {
    const mockData = { /* ... */ };
    // Mock RTK Query response
    // Render component
    // Assert data displayed
  });
});
```

### E2E Tests (Cypress)
```typescript
// Test complete user flow
cy.visit('/');
cy.get('input[type="text"]').type('technology');
cy.wait(600); // Wait for debounce
cy.get('article').should('have.length.greaterThan', 0);
```

---

## 📚 API Response Formats

### Unified Feed Item Type

All APIs transform their responses to match this unified structure:

```typescript
type FeedItem = (NewsItem | MovieItem | SocialPost) & {
  order?: number;  // For drag-and-drop ordering
};
```

This allows:
- Consistent rendering with single `<FeedCard>` component
- Easy filtering and sorting
- Type-safe operations across different content types

---

## 🔍 API Endpoints Summary Table

| API | Endpoint | Method | Auth | Cache Time | Rate Limit |
|-----|----------|--------|------|------------|------------|
| NewsAPI | `/top-headlines` | GET | API Key | 60s | 100/day |
| NewsAPI | `/everything` | GET | API Key | 60s | 100/day |
| TMDB | `/trending/movie/week` | GET | API Key | 300s | 40/10s |
| TMDB | `/search/movie` | GET | API Key | 300s | 40/10s |
| Social | `/api/social` | GET | None | 60s | Unlimited |

---

## 🎯 Next Steps for Production

1. **API Key Management:**
   - Move to server-side environment variables
   - Implement API key rotation
   - Add request signing

2. **Rate Limiting:**
   - Implement client-side rate limiting
   - Add request queue
   - Handle 429 responses gracefully

3. **Monitoring:**
   - Log API errors
   - Track API usage
   - Monitor response times

4. **Caching Strategy:**
   - Implement Redis for server-side caching
   - Add CDN for static assets
   - Use service workers for offline support

---

**Documentation Version**: 1.0.0  
**Last Updated**: November 1, 2025  
**Maintained By**: Development Team
