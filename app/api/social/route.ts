import { NextRequest, NextResponse } from 'next/server';
import type { SocialPost } from '@/types';

// Mock data for social posts
const MOCK_AUTHORS = [
  'John Doe',
  'Jane Smith',
  'Mike Johnson',
  'Sarah Williams',
  'Alex Brown',
  'Emily Davis',
  'Chris Wilson',
  'Lisa Anderson',
];

const MOCK_CONTENT = [
  'Just finished an amazing project! Feeling proud of what we accomplished. 🚀',
  'Learning something new every day. The journey never stops! 📚',
  'Beautiful sunset today. Sometimes you need to pause and appreciate the moment. 🌅',
  'Tech conference was incredible! Met so many inspiring people. 💡',
  'Coffee and code - the perfect combination for a productive morning. ☕',
  'Excited to share my latest creation with you all. Stay tuned! ✨',
  'Reminder: Take breaks, stay hydrated, and be kind to yourself. 💙',
  'Just deployed to production. That feeling never gets old! 🎉',
  'Working on something special. Can\'t wait to reveal it! 🔥',
  'Grateful for this amazing community. You all inspire me daily! 🙏',
];

const generateMockPosts = (page: number, pageSize: number): SocialPost[] => {
  const startIndex = (page - 1) * pageSize;
  const posts: SocialPost[] = [];

  for (let i = 0; i < pageSize; i++) {
    const index = startIndex + i;
    const authorIndex = index % MOCK_AUTHORS.length;
    const contentIndex = index % MOCK_CONTENT.length;

    posts.push({
      id: `post-${index}`,
      author: MOCK_AUTHORS[authorIndex],
      content: MOCK_CONTENT[contentIndex],
      avatar: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      likes: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 100),
      type: 'social',
    });
  }

  return posts;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 10;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const posts = generateMockPosts(page, pageSize);
  const hasMore = page < 5; // Limit to 5 pages for demo

  return NextResponse.json({
    posts,
    hasMore,
    nextPage: hasMore ? page + 1 : page,
  });
}
