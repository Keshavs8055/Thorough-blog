"use client";

import Layout from "@/components/Layout";
import { searchPostsByTag } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { useInfinitePosts } from "@/hooks/infiniteScroll";
import { PostFeed } from "@/components/Post/Feed";
import { useEffect } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tagged Posts",
  description: "Posts filtered by tags",
};

const loadTagResults = async (
  tagQuery: string,
  page: number,
  limit: number
) => {
  const data = await searchPostsByTag(tagQuery, page, limit);
  if (data?.success) {
    return {
      posts: data.posts || [],
      newPage: page + 1,
    };
  }
  return null;
};

export default function TagsPage() {
  const searchParams = useSearchParams();
  const tagQuery = searchParams.get("q") || "";

  const { posts, loading, observerRef, reset } = useInfinitePosts({
    query: tagQuery,
    fetchFn: loadTagResults,
  });

  useEffect(() => {
    reset();
  }, [tagQuery, reset]);

  return (
    <Layout>
      <div className="pt-20 space-y-0 h-full font-serif">
        <h2 className="text-xl italic text-center pb-0">
          Tagged:{" "}
          <span className="underline">
            {tagQuery.split(",").map((tag, i) => (
              <span
                key={i}
                className="mr-2 text-gray-800"
              >
                #{tag}
              </span>
            ))}
          </span>
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
