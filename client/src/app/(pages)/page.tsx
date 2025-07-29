"use client";

import { fetchPosts } from "@/lib/api";
import { PostFeed } from "@/components/Post/Feed";
import { useInfinitePosts } from "@/hooks/infiniteScroll";
import { useEffect } from "react";
import { useLoading } from "@/utils/loading";

const loadPosts = async (_: string, page: number, limit: number) => {
  const data = await fetchPosts(page, limit);
  if (data?.success) {
    return {
      posts: data.posts || [],
      newPage: page + 1,
    };
  }
  return null;
};

export default function HomePage() {
  const { posts, loading, observerRef } = useInfinitePosts({
    fetchFn: loadPosts,
  });

  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(loading);
    return () => setLoading(false); // Reset on unmount
  }, [loading, setLoading]);

  return (
    <PostFeed
      posts={posts}
      observerRef={observerRef}
    />
  );
}
