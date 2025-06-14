"use client";

import Layout from "@/components/Layout";
import PostCard from "@/components/Post/PostCard";
import { fetchPosts } from "@/lib/api";
import { Post } from "@/utils/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/utils/toast";
import { motion } from "framer-motion";
import { Spinner } from "@/components/common/spinner";

interface FetchPostsSuccessResponse {
  success: boolean;
  posts: Post[];
  currentPage?: number;
  totalPages?: number;
  totalPosts?: number;
}

const loadMorePosts = async (
  page: number,
  limit: number,
  loading: boolean,
  hasMore: boolean,
  setLoading: (loading: boolean) => void,
  setHasMore: (hasMore: boolean) => void,
  setPosts: (updater: (prevPosts: Post[]) => Post[]) => void,
  showToast: (message: string, type: "success" | "error" | "info") => void
) => {
  if (loading || !hasMore) return;

  setLoading(true);
  try {
    const data = await fetchPosts(page, limit);
    if (data && data.success) {
      // Type assertion to FetchPostsSuccessResponse
      const successData = data as FetchPostsSuccessResponse;
      if (successData.posts && successData.posts.length > 0) {
        setPosts((prev) => {
          const existingPostIds = new Set(prev.map((post) => post._id));

          const uniqueNewPosts = successData.posts.filter(
            (post) => !existingPostIds.has(post._id)
          );

          return [...prev, ...uniqueNewPosts];
        });
        return { ...successData, newPage: page + 1 }; // Return data to be used for page increment, include newPage
      } else {
        setHasMore(false);
        showToast("No more posts available", "info");
      }
    } else if (data) {
      showToast(data.message || "Failed to fetch posts", "error");
    } else {
      showToast("Failed to fetch posts", "error");
    }
  } catch (error) {
    console.log(error);
    showToast("Failed to fetch posts", "error");
  } finally {
    setLoading(false);
  }
  return null;
};

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { showToast } = useToast();

  const handleLoadMorePosts = useCallback(async () => {
    const newData = await loadMorePosts(
      page,
      6,
      loading,
      hasMore,
      setLoading,
      setHasMore,
      setPosts,
      showToast
    );
    if (newData && newData.newPage) {
      // Check for newPage
      setPage(newData.newPage);
    }
  }, [page, loading, hasMore, setLoading, setHasMore, setPosts, showToast]);

  // Intersection Observer to trigger loading more posts
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handleLoadMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, handleLoadMorePosts]);

  // Initial load
  useEffect(() => {
    handleLoadMorePosts();
  }, [handleLoadMorePosts]);

  return (
    <Layout>
      <div className="space-y-6 xl:p-20 py-20">
        {posts.map((post, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
        {loading && <Spinner />}
        <div
          ref={observerRef}
          className="flex justify-center items-center py-8"
        ></div>
      </div>
    </Layout>
  );
}
