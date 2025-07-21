"use client";

import Layout from "@/components/Layout";
import { searchPosts } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { useInfinitePosts } from "@/hooks/infiniteScroll";
import { PostFeed } from "@/components/Post/Feed";
import { useEffect } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Results",
  description: "Search Results for posts",
};

const loadSearchResults = async (
  query: string,
  page: number,
  limit: number
) => {
  const data = await searchPosts(query, page, limit);
  if (data?.success) {
    return {
      posts: data.posts || [],
      newPage: page + 1,
    };
  }
  return null;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { posts, loading, observerRef, reset } = useInfinitePosts({
    query,
    fetchFn: loadSearchResults,
  });

  useEffect(() => {
    reset();
  }, [query, reset]);

  return (
    <Layout>
      <div className="pt-20 space-y-0 h-full font-serif">
        <h2 className="text-xl italic text-center pb-0">
          Search Results for: <span className="underline">{query}</span>
        </h2>
        <PostFeed
          posts={posts}
          loading={loading}
          observerRef={observerRef}
        />
      </div>
    </Layout>
  );
}
