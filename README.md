# Personalized Content Dashboard

A full-stack, production-ready web application built with **Next.js 14** (App Router), **TypeScript**, **Redux Toolkit**, **RTK Query**, **Tailwind CSS**, **Framer Motion**, and comprehensive testing with **Vitest** and **Cypress**.

## 🚀 Features

- **Multi-source Content Aggregation**: Fetch news from NewsAPI, movies from TMDB, and social posts from a custom API
- **Category Filtering**: Personalize your feed with categories like technology, sports, business, entertainment, health, and science
- **Advanced Search**: Debounced search functionality across news and movies
- **Infinite Scrolling**: Seamlessly load more content as you scroll
- **Favorites Management**: Save and organize your favorite content items
- **Drag-and-Drop Reordering**: Rearrange favorites with smooth animations using Framer Motion
- **Dark/Light Mode**: Toggle between themes with persistence
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Accessibility**: ARIA attributes, semantic HTML, and keyboard-friendly interactions
- **State Management**: Global state with Redux Toolkit and efficient API caching with RTK Query
- **Local Persistence**: Preferences and favorites saved to localStorage
- **Comprehensive Testing**: Unit, integration, and E2E tests

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- **NewsAPI Key**: Get one at [newsapi.org](https://newsapi.org/)
- **TMDB API Key**: Get one at [themoviedb.org](https://www.themoviedb.org/settings/api)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd assignment
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:

```env
NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## 🧪 Testing

### Unit Tests (Vitest)

Run all unit tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test -- --watch
```

Run tests with UI:

```bash
npm run test:ui
```

Generate coverage report:

```bash
npm run test:coverage
```

### E2E Tests (Cypress)

Open Cypress Test Runner:

```bash
npm run test:e2e
```

Run Cypress tests headlessly:

```bash
npm run test:e2e:headless
```

**Note**: Make sure the development server is running before executing E2E tests.

## 📁 Project Structure

```
assignment/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── social/
│   │       └── route.ts          # Mock social posts API
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Main dashboard page
│   └── globals.css               # Global styles
├── components/                   # Reusable UI components
│   ├── CategoryFilter.tsx        # Category selection component
│   ├── DashboardLayout.tsx       # Main layout wrapper
│   ├── EmptyState.tsx            # Empty state placeholder
│   ├── FeedCard.tsx              # Content card component
│   ├── Providers.tsx             # Redux provider wrapper
│   ├── SearchInput.tsx           # Search input component
│   ├── Spinner.tsx               # Loading spinner
│   └── ThemeToggle.tsx           # Dark/light mode toggle
├── hooks/                        # Custom React hooks
│   ├── useDebounce.ts            # Debounce hook
│   ├── useInfiniteScroll.ts      # Infinite scroll hook
│   └── useLocalStorage.ts        # localStorage hook
├── services/                     # RTK Query API services
│   ├── newsApi.ts                # NewsAPI integration
│   ├── tmdbApi.ts                # TMDB API integration
│   └── socialApi.ts              # Social posts API
├── state/                        # Redux store and slices
│   ├── favoritesSlice.ts         # Favorites state management
│   ├── preferencesSlice.ts       # User preferences state
│   ├── hooks.ts                  # Typed Redux hooks
│   └── store.ts                  # Redux store configuration
├── tests/                        # Test files
│   ├── e2e/                      # Cypress E2E tests
│   │   ├── dashboard.cy.ts       # Dashboard E2E tests
│   │   └── support/              # Cypress support files
│   ├── integration/              # Integration tests
│   │   ├── CategoryFilter.test.tsx
│   │   ├── FeedCard.test.tsx
│   │   └── components.test.tsx
│   ├── unit/                     # Unit tests
│   │   ├── favoritesSlice.test.ts
│   │   ├── preferencesSlice.test.ts
│   │   ├── useDebounce.test.ts
│   │   └── useLocalStorage.test.ts
│   └── setup.ts                  # Test setup and mocks
├── types/                        # TypeScript type definitions
│   └── index.ts                  # Shared types
├── .env.local.example            # Environment variables template
├── .gitignore                    # Git ignore rules
├── cypress.config.ts             # Cypress configuration
├── next.config.js                # Next.js configuration
├── package.json                  # Project dependencies
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── vitest.config.ts              # Vitest configuration
```

## 🎯 Key Features Explained

### State Management

- **Redux Toolkit**: Manages global state with slices for preferences and favorites
- **RTK Query**: Handles API calls with automatic caching, loading states, and refetching
- **Typed Hooks**: `useAppDispatch` and `useAppSelector` for type-safe Redux usage

### API Integration

- **NewsAPI**: Fetches news by category and search query
- **TMDB**: Fetches trending movies and movie search results
- **Social Posts API**: Custom Next.js API route with mock data and pagination

### Performance Optimizations

- **Debounced Search**: Reduces API calls during user typing
- **Infinite Scroll**: Loads content progressively using IntersectionObserver
- **RTK Query Caching**: Automatic caching prevents redundant API calls
- **Code Splitting**: Next.js automatic code splitting for optimal loading

### User Experience

- **Drag-and-Drop**: Reorder favorites with smooth Framer Motion animations
- **Dark Mode**: System-aware theme with manual toggle using next-themes
- **Persistence**: Preferences and favorites saved to localStorage
- **Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## 🧩 Component Architecture

### Smart Components (Container)

- `app/page.tsx`: Main dashboard logic, data fetching, and state management

### Presentational Components

- `DashboardLayout`: Header, search, filters, and favorites toggle
- `FeedCard`: Renders news, movie, or social post cards
- `CategoryFilter`: Category selection buttons
- `SearchInput`: Search input with icon
- `ThemeToggle`: Dark/light mode toggle button
- `Spinner`: Loading indicator
- `EmptyState`: Empty state placeholder

### Custom Hooks

- `useDebounce`: Debounces rapid value changes
- `useInfiniteScroll`: Detects scroll position for infinite loading
- `useLocalStorage`: Syncs state with localStorage

## 🔒 Type Safety

All components, hooks, and state are fully typed with TypeScript for:

- Better developer experience
- Compile-time error detection
- Improved code maintainability
- Autocomplete and IntelliSense support

## 🌐 API Routes

### `/api/social`

**Method**: GET

**Query Parameters**:
- `page` (number): Page number for pagination (default: 1)

**Response**:
```json
{
  "posts": [/* SocialPost[] */],
  "hasMore": true,
  "nextPage": 2
}
```

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Dark Mode**: Class-based dark mode with next-themes
- **Animations**: Framer Motion for smooth transitions and drag-and-drop
- **Responsive**: Mobile-first approach with responsive breakpoints

## 📊 Testing Strategy

### Unit Tests

- Test Redux reducers and actions
- Test custom hooks in isolation
- Test utility functions

### Integration Tests

- Test component rendering
- Test user interactions
- Test component integration with Redux

### E2E Tests

- Test complete user workflows
- Test drag-and-drop functionality
- Test search and filtering
- Test favorites management
- Test responsive design

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Build the application:

```bash
npm run build
```

The output will be in the `.next` folder. Deploy this folder to any Node.js hosting platform.

## 🛡️ Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_NEWS_API_KEY` | NewsAPI API key | Yes |
| `NEXT_PUBLIC_TMDB_API_KEY` | TMDB API key | Yes |

## 📝 Best Practices

- **DRY Principle**: Reusable components and hooks
- **Separation of Concerns**: Clear separation between UI and logic
- **Type Safety**: Full TypeScript coverage
- **Error Handling**: Graceful error states and fallbacks
- **Performance**: Optimized with debouncing, memoization, and caching
- **Accessibility**: WCAG 2.1 compliant
- **Testing**: Comprehensive test coverage

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [NewsAPI](https://newsapi.org/) - News data provider
- [TMDB](https://www.themoviedb.org/) - Movie data provider
- [Vitest](https://vitest.dev/) - Testing framework
- [Cypress](https://www.cypress.io/) - E2E testing

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js 14, TypeScript, and Redux Toolkit**
