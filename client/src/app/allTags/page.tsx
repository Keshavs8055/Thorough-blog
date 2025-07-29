"use client";

import { useEffect, useState } from "react";
import { searchPostsByTag } from "@/lib/api";
import { Post } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";

const tagsToShow = [
  "blogging",
  "Machine Learning",
  "JavaScript",
  "React",
  "Python",
];

export default function AllTagsPage() {
  const [tagPosts, setTagPosts] = useState<Record<string, Post[]>>({});

  useEffect(() => {
    async function fetchTagPosts() {
      const allData: Record<string, Post[]> = {};
      for (const tag of tagsToShow) {
        const response = await searchPostsByTag(tag, 1, 3);
        if (response.success && response.posts) {
          allData[tag] = response.posts;
        }
      }
      setTagPosts(allData);
    }

    fetchTagPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-serif text-gray-900">
      <h1 className="text-4xl font-bold mb-10 text-center tracking-wider border-b pb-4 border-gray-400">
        Extra! Extra! Read All About It!
      </h1>

      {tagsToShow.map((tag) => (
        <section
          key={tag}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold border-l-4 border-black pl-2 mb-4">
            #{tag}
          </h2>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {tagPosts[tag]?.map((post) => (
              <article
                key={post._id}
                className="border border-gray-300 shadow-md p-4 bg-white flex flex-col gap-2 hover:shadow-lg transition-all"
              >
                {post.image && (
                  <div className="relative h-40 w-full">
                    <Image
                      src={post.image.src || "/placeholder.png"}
                      alt={post.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}

                <h3 className="text-lg font-bold line-clamp-2">
                  <Link
                    href={`/posts/${post._id}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </h3>

                <p className="text-sm text-gray-700 line-clamp-3">
                  {post.summary}
                </p>

                <div className="mt-auto text-xs text-gray-500">
                  By {post.author?.name || "Anonymous"} on{" "}
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </article>
            )) || <p className="text-gray-500">No posts yet for this tag.</p>}
          </div>
        </section>
      ))}
    </div>
  );
}
