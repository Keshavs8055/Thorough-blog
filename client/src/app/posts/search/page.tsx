"use client";
import { PostFeed } from "@/components/Post/Feed";
import { useInfinitePosts } from "@/hooks/infiniteScroll";
import { searchPosts } from "@/lib/api";
import { GetPostsResponseAny, PostLite } from "@/utils/globalTypes";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const prevQuery = useRef<string>("");

  const loadSearchResults = async (
    query: string,
    page: number,
    limit: number
  ): Promise<{ posts: PostLite[]; newPage: number } | null> => {
    const response: GetPostsResponseAny = await searchPosts(query, page, limit);

    if (response?.success && Array.isArray(response.data?.posts)) {
      return {
        posts: response.data.posts,
        newPage: page + 1,
      };
    }

    return null;
  };
  const { posts, observerRef, reset } = useInfinitePosts({
    query,
    fetchFn: loadSearchResults,
  });

  useEffect(() => {
    if (prevQuery.current !== query) {
      prevQuery.current = query;
      reset();
    }
  }, [query, reset]);

  return (
    <div className="pt-20 space-y-0 h-full font-serif w-full ">
      <h2 className="text-xl italic text-center pb-0">
        Search Results for: <span className="underline">{query}</span>
      </h2>
      <PostFeed
        posts={posts}
        observerRef={observerRef}
      />
    </div>
  );
}
