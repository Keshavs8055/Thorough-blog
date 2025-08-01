"use client";

import { useEffect, useState } from "react";
import { getAllTags, searchPostsByTag } from "@/lib/api";
import { Post } from "@/utils/types";
import { stripHtmlAndTrim } from "@/lib/utils";
import { AllTagsComponent } from "@/components/common/displayAllTags";

export default function AllTagsPage() {
  const [tagPosts, setTagPosts] = useState<Record<string, Post[]>>({});
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTagPosts() {
      const allData: Record<string, Post[]> = {};
      for (const tag of tags) {
        if (!tag) continue;
        const response = await searchPostsByTag(tag, 1, 10);
        if (response.success && Array.isArray(response.posts)) {
          allData[tag] = response.posts;
        } else {
          allData[tag] = [];
        }
      }
      setTagPosts(allData);
    }
    async function fetchAllTags() {
      const data = await getAllTags();
      if (data.success && Array.isArray(data.tags)) {
        setTags(data.tags);
      }
    }
    fetchAllTags();
    if (tags.length > 0) fetchTagPosts();
  }, [tags]);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-22 font-serif text-gray-900">
      <div className="flex justify-between border-b items-center mb-10 gap-4 py-5">
        <h1 className="text-4xl font-bold tracking-wider  border-gray-400">
          Extra! Extra! Read All About It!
        </h1>
        <div>
          <AllTagsComponent allTags={tags} />
        </div>
      </div>

      {(selectedTag ? [selectedTag] : tags).map((tag) => (
        <section
          key={tag}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-semibold bg-amber-200  pl-3 mb-6 italic tracking-tight">
            #{tag}
          </h2>
          <div className="gap-6">
            {tagPosts[tag]?.length > 0 ? (
              tagPosts[tag].map((post) => (
                <article
                  key={post._id}
                  className="min-w-2xl border-b border-dashed border-neutral-400 pb-10 mb-12 px-4 sm:px-8 font-serif rounded-sm"
                >
                  <section className="group block no-underline">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Text Content */}
                      <div className="flex flex-col justify-between lg:w-[70%]">
                        <h2
                          className="text-2xl md:text-3xl font-bold tracking-tight leading-tight group-hover:underline"
                          style={{
                            fontFamily: "var(--font-heading)",
                            color: "var(--color-ink)",
                          }}
                        >
                          {post.title?.toUpperCase() || "Untitled"}
                        </h2>
                        {/* Author and Date */}
                        <div className="text-sm italic mt-3 text-neutral-600">
                          By{" "}
                          <span className="text-[var(--color-primary)] font-medium">
                            <a href={`/author/${post.author?.username || ""}`}>
                              {post.author?.name || "Unknown"}
                            </a>
                          </span>
                          &nbsp;•&nbsp;
                          <span className="tracking-wider font-mono text-xs">
                            {post.date
                              ? new Date(post.date).toLocaleDateString()
                              : "Unknown date"}
                          </span>
                        </div>
                        {/* Summary */}
                        <p className="mt-4 text-base leading-relaxed text-neutral-800">
                          {stripHtmlAndTrim(post.summary || "", 500)}
                        </p>
                        {/* Read More */}
                        <div className="mt-6 flex justify-between items-center">
                          <a
                            href={`/posts/${post._id}`}
                            className="text-sm uppercase tracking-widest text-[var(--color-primary)] hover:underline py-2 rounded transition duration-300"
                          >
                            Read More →
                          </a>
                        </div>
                      </div>
                    </div>
                  </section>
                </article>
              ))
            ) : (
              <p className="text-gray-500">No posts yet for this tag.</p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
