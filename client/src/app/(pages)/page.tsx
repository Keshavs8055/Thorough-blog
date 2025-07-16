"use client";

import Layout from "@/components/Layout";
import { fetchPosts } from "@/lib/api";
import { PostFeed } from "@/components/Post/Feed";
import { useInfinitePosts } from "@/hooks/infiniteScroll";

const loadPosts = async (_: string, page: number, limit: number) => {
  const data = await fetchPosts(page, limit);
  if (data?.success) {
    return {
      posts: data.posts || [], // ✅ ensures it's always Post[]
      newPage: page + 1,
    };
  }
  return null;
};

export default function HomePage() {
  const { posts, loading, observerRef } = useInfinitePosts({
    fetchFn: loadPosts,
  });

  return (
    <Layout>
      <PostFeed
        posts={posts}
        loading={loading}
        observerRef={observerRef}
      />
    </Layout>
  );
}
