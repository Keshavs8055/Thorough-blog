"use client";

import { searchPostsByTag } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { useInfinitePosts } from "@/hooks/infiniteScroll";
import { PostFeed } from "@/components/Post/Feed";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

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

  const prevTagRef = useRef<string>("");

  const { posts, observerRef, reset } = useInfinitePosts({
    query: tagQuery,
    fetchFn: loadTagResults,
  });

  useEffect(() => {
    if (prevTagRef.current !== tagQuery) {
      prevTagRef.current = tagQuery;
      reset();
    }
  }, [tagQuery, reset]);

  return (
    <motion.div
      className="pt-24 pb-12 px-4 sm:px-8 md:px-16 mx-auto font-serif text-[#3D2C1F] bg-[#FFFBF5]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2
        className="text-2xl md:text-3xl text-center font-bold tracking-wide border-b border-[#6E5D4E] pb-4 italic"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tagged:
      </motion.h2>

      <motion.div
        className="text-center mt-4 text-[#8B735C] text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {tagQuery.split(",").map((tag, i) => (
          <span
            key={i}
            className="mr-4 underline decoration-[#6E5D4E]/30 italic"
          >
            #{tag}
          </span>
        ))}
      </motion.div>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <PostFeed
          posts={posts}
          observerRef={observerRef}
        />
      </motion.div>
    </motion.div>
  );
}
