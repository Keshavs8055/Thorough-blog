"use client";

import { fetchPosts } from "@/lib/api";
import { PostFeed } from "@/components/Post/Feed";
import { useInfinitePosts } from "@/hooks/infiniteScroll";
import { useEffect } from "react";
import { useLoading } from "@/utils/loading";

const loadPosts = async (_: string, page: number, limit: number) => {
  try {
    const response = await fetchPosts(page, limit);

    if (response.success && response.data?.posts) {
      return {
        posts: response.data.posts,
        newPage: page + 1,
      };
    }

    return {
      posts: [],
      newPage: page, // don’t increment if fetch failed
    };
  } catch (error) {
    console.log(error);

    return {
      posts: [],
      newPage: page,
    };
  }
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
