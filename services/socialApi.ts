import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SocialPost } from '@/types';

interface SocialResponse {
  posts: SocialPost[];
  hasMore: boolean;
  nextPage: number;
}

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getSocialPosts: builder.query<SocialResponse, { page?: number }>({
      query: ({ page = 1 }) => ({
        url: '/social',
        params: { page },
      }),
    }),
  }),
});

export const { useGetSocialPostsQuery } = socialApi;
