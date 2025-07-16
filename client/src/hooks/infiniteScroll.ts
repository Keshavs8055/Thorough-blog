import { useCallback, useEffect, useRef, useState } from "react";
import { Post } from "@/utils/types";
import { useToast } from "@/utils/toast";

interface UseInfinitePostsProps {
  query?: string;
  fetchFn: (
    query: string,
    page: number,
    limit: number
  ) => Promise<{ posts: Post[]; newPage?: number } | null>;
  limit?: number;
}

export const useInfinitePosts = ({
  query = "",
  fetchFn,
  limit = 6,
}: UseInfinitePostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { showToast } = useToast();

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const result = await fetchFn(query, page, limit);
      if (result && result.posts.length > 0) {
        setPosts((prev) => {
          const existingIds = new Set(prev.map((p) => p._id));
          const uniqueNew = result.posts.filter((p) => !existingIds.has(p._id));
          return [...prev, ...uniqueNew];
        });
        if (result.newPage) setPage(result.newPage);
      } else {
        setHasMore(false);
        showToast("No more posts available", "info");
      }
    } catch (error) {
      console.error(error);
      showToast("Failed to load posts", "error");
    } finally {
      setLoading(false);
    }
  }, [query, page, loading, hasMore]);

  // Observer logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) loadMore();
      },
      { threshold: 1.0 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, loadMore]);

  return {
    posts,
    loading,
    observerRef,
    reset: () => {
      setPage(1);
      setHasMore(true);
      setPosts([]);
    },
  };
};
