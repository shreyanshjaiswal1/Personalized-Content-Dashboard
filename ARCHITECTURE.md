# Architecture Diagram

## Application Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Interface                          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Search     │  │  Categories  │  │  Favorites   │        │
│  │   Input      │  │   Filter     │  │   Toggle     │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                    Feed Items                            │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │  │
│  │  │  News   │  │  Movie  │  │ Social  │  │  News   │   │  │
│  │  │  Card   │  │  Card   │  │  Post   │  │  Card   │   │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │  │
│  │         (Infinite Scroll)                               │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    React Components Layer                        │
│                                                                  │
│  Dashboard Page (app/page.tsx)                                  │
│  │                                                               │
│  ├─► DashboardLayout                                            │
│  │   ├─► SearchInput                                            │
│  │   ├─► CategoryFilter                                         │
│  │   └─► ThemeToggle                                            │
│  │                                                               │
│  └─► FeedCard (News/Movie/Social)                              │
│      ├─► EmptyState                                             │
│      └─► Spinner                                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Custom Hooks Layer                          │
│                                                                  │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ useDebounce │  │useInfinite   │  │useLocalStorage│         │
│  │             │  │  Scroll      │  │               │         │
│  └─────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Redux State Management                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Redux Store                            │  │
│  │                                                            │  │
│  │  ┌─────────────────┐         ┌──────────────────┐       │  │
│  │  │  Preferences    │         │   Favorites      │       │  │
│  │  │  Slice          │         │   Slice          │       │  │
│  │  │                 │         │                  │       │  │
│  │  │ • categories    │         │ • items[]        │       │  │
│  │  │ • darkMode      │         │ • reorder()      │       │  │
│  │  │ • searchQuery   │         │ • add/remove     │       │  │
│  │  └─────────────────┘         └──────────────────┘       │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────┐        │  │
│  │  │         RTK Query API Slices                 │        │  │
│  │  │                                                │        │  │
│  │  │  newsApi  │  tmdbApi  │  socialApi          │        │  │
│  │  └──────────────────────────────────────────────┘        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Services Layer                          │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  newsApi.ts  │  │  tmdbApi.ts  │  │socialApi.ts  │         │
│  │              │  │              │  │              │         │
│  │ • getByCategory│ │• getTrending│ │• getSocial   │         │
│  │ • search     │  │• search      │  │  Posts       │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    External APIs / Routes                        │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  NewsAPI.org │  │  TMDB API    │  │ /api/social  │         │
│  │  (External)  │  │  (External)  │  │ (Next.js)    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Persistence Layer                             │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   localStorage                            │  │
│  │                                                            │  │
│  │  • preferences (categories, darkMode, searchQuery)       │  │
│  │  • favorites (saved items)                               │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌──────────┐
│  User    │
│  Action  │
└────┬─────┘
     │
     ▼
┌──────────────────────┐
│   Component          │
│   (Button Click,     │
│    Text Input, etc)  │
└──────────┬───────────┘
           │
           ▼
     ┌─────────────┐
     │  Debounce?  │──Yes──► Wait 500ms
     └─────┬───────┘
           │ No
           ▼
┌──────────────────────┐
│  Redux Action        │
│  (setSearchQuery,    │
│   toggleCategory,    │
│   addFavorite)       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Reducer             │
│  (Update State)      │
└──────────┬───────────┘
           │
           ├────────────────────┐
           │                    │
           ▼                    ▼
┌──────────────────────┐ ┌─────────────┐
│  Redux Store         │ │localStorage │
│  (Global State)      │ │ (Persist)   │
└──────────┬───────────┘ └─────────────┘
           │
           ▼
┌──────────────────────┐
│  RTK Query?          │──Yes──┐
└──────────┬───────────┘       │
           │ No                │
           │                   ▼
           │         ┌──────────────────┐
           │         │  Check Cache     │
           │         └────────┬─────────┘
           │                  │
           │         ┌────────┴─────────┐
           │         │                  │
           │    ┌────▼──────┐    ┌─────▼────┐
           │    │ Hit       │    │  Miss    │
           │    │ Return    │    │  Fetch   │
           │    │ Cached    │    │  from    │
           │    │ Data      │    │  API     │
           │    └────┬──────┘    └─────┬────┘
           │         │                  │
           │         └────────┬─────────┘
           │                  │
           │                  ▼
           │         ┌──────────────────┐
           │         │  Update Cache    │
           │         └────────┬─────────┘
           │                  │
           └──────────────────┘
                     │
                     ▼
           ┌──────────────────┐
           │  Component       │
           │  Re-render       │
           │  (with new data) │
           └──────────────────┘
                     │
                     ▼
           ┌──────────────────┐
           │  UI Update       │
           │  (User sees      │
           │   changes)       │
           └──────────────────┘
```

## Component Hierarchy

```
RootLayout (app/layout.tsx)
│
├─► ThemeProvider (next-themes)
│   │
│   └─► ReduxProvider (react-redux)
│       │
│       └─► DashboardPage (app/page.tsx)
│           │
│           ├─► DashboardLayout
│           │   │
│           │   ├─► Header
│           │   │   ├─► Title
│           │   │   ├─► FavoritesButton
│           │   │   └─► ThemeToggle
│           │   │
│           │   ├─► SearchInput
│           │   │   └─► SearchIcon
│           │   │
│           │   ├─► CategoryFilter
│           │   │   └─► CategoryButton × 6
│           │   │
│           │   └─► Footer
│           │
│           └─► Main Content
│               │
│               ├─► Favorites View (conditional)
│               │   │
│               │   └─► Reorder.Group (Framer Motion)
│               │       └─► Reorder.Item × N
│               │           └─► FeedCard
│               │
│               └─► Feed View (conditional)
│                   │
│                   ├─► EmptyState (conditional)
│                   │
│                   ├─► Grid
│                   │   └─► FeedCard × N
│                   │       ├─► NewsCard (conditional)
│                   │       ├─► MovieCard (conditional)
│                   │       └─► SocialCard (conditional)
│                   │
│                   ├─► Spinner (conditional)
│                   │
│                   └─► InfiniteScrollTrigger
```

## Redux Store Structure

```javascript
{
  preferences: {
    categories: ['technology', 'sports'],
    darkMode: false,
    searchQuery: ''
  },
  
  favorites: {
    items: [
      { id: '1', type: 'news', title: '...', ... },
      { id: 2, type: 'movie', title: '...', ... },
      { id: '3', type: 'social', author: '...', ... }
    ]
  },
  
  newsApi: {
    queries: {
      'getNewsByCategory({"category":"technology"})': {
        status: 'fulfilled',
        data: [...],
        requestId: '...'
      }
    }
  },
  
  tmdbApi: {
    queries: {
      'getTrendingMovies({"page":1})': {
        status: 'fulfilled',
        data: [...],
        requestId: '...'
      }
    }
  },
  
  socialApi: {
    queries: {
      'getSocialPosts({"page":1})': {
        status: 'fulfilled',
        data: { posts: [...], hasMore: true },
        requestId: '...'
      }
    }
  }
}
```

## File Dependencies

```
app/page.tsx (Dashboard)
├── components/DashboardLayout.tsx
│   ├── components/SearchInput.tsx
│   ├── components/CategoryFilter.tsx
│   └── components/ThemeToggle.tsx
├── components/FeedCard.tsx
├── components/Spinner.tsx
├── components/EmptyState.tsx
├── hooks/useDebounce.ts
├── hooks/useInfiniteScroll.ts
├── hooks/useLocalStorage.ts
├── state/hooks.ts
│   └── state/store.ts
│       ├── state/preferencesSlice.ts
│       ├── state/favoritesSlice.ts
│       ├── services/newsApi.ts
│       ├── services/tmdbApi.ts
│       └── services/socialApi.ts
└── types/index.ts
```

## Testing Architecture

```
┌─────────────────────────────────────────┐
│           Testing Pyramid               │
│                                         │
│              ┌─────────┐                │
│              │   E2E   │                │
│              │ Cypress │                │
│              └─────────┘                │
│                   │                     │
│           ┌───────────────┐             │
│           │ Integration   │             │
│           │ React Testing │             │
│           │   Library     │             │
│           └───────────────┘             │
│                   │                     │
│         ┌─────────────────────┐         │
│         │      Unit Tests     │         │
│         │       Vitest        │         │
│         │ • Reducers          │         │
│         │ • Hooks             │         │
│         │ • Utils             │         │
│         └─────────────────────┘         │
└─────────────────────────────────────────┘
```

---

This architecture ensures:
- **Separation of Concerns**: Clear layers
- **Scalability**: Easy to add features
- **Maintainability**: Modular structure
- **Testability**: Comprehensive coverage
- **Performance**: Optimized data flow
