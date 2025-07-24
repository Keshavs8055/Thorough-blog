"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchAuthorPageData, ApiResponse } from "@/lib/api";
import { Post } from "@/utils/types"; // adjust path if neede
import PostCard from "@/components/Post/PostCard"; // adjust path if needed

export default function AuthorPage() {
  const { username } = useParams();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function handleData(username: string) {
      const result = await fetchAuthorPageData(username);

      if (result.success && result.author) {
        setData(result);
        setError(null);
      } else {
        setError(result.message || "Failed to fetch author data.");
        setData(null);
      }

      setLoading(false);
    }

    if (username) handleData(username as string);
  }, [username]);

  if (loading) return <p className="p-8">Loading author page...</p>;
  if (error) return <p className="text-red-500 p-8">{error}</p>;
  if (!data || !data.author)
    return <p className="p-8 text-center">No author found.</p>;

  const { author, posts } = data;

  return (
    <main className="max-w-7xl mx-auto py-8">
      {/* Author Profile */}
      <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 border-b pb-6">
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full overflow-hidden border border-neutral-400">
          <Image
            src={author.avatar}
            alt={author.name}
            width={112}
            height={112}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight">{author.name}</h1>
          <p className="text-sm text-neutral-500">@{author.username}</p>

          {/* Bio */}
          {author.authorProfile?.bio && (
            <p className="mt-2 text-neutral-700 max-w-prose">
              {author.authorProfile.bio}
            </p>
          )}

          {/* Social Media */}
          <div className="flex flex-wrap gap-3 mt-4 text-sm">
            {author.authorProfile?.socialMedia?.website && (
              <Link
                href={author.authorProfile.socialMedia.website}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Website
              </Link>
            )}
            {author.authorProfile?.socialMedia?.twitter && (
              <Link
                href={`https://twitter.com/${author.authorProfile.socialMedia.twitter}`}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Twitter
              </Link>
            )}
            {author.authorProfile?.socialMedia?.linkedin && (
              <Link
                href={author.authorProfile.socialMedia.linkedin}
                target="_blank"
                className="text-blue-700 hover:underline"
              >
                LinkedIn
              </Link>
            )}
          </div>

          {/* Expertise */}
          {author.authorProfile?.expertise?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {author.authorProfile.expertise.map((topic: string) => (
                <span
                  key={topic}
                  className="px-2 py-1 text-xs bg-neutral-100 rounded-full border border-neutral-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Posts */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Published Posts</h2>

        {posts && posts.length > 0 ? (
          posts.map((post: Post) => (
            <PostCard
              key={post._id}
              post={post}
            />
          ))
        ) : (
          <p className="text-neutral-600">No posts published yet.</p>
        )}
      </section>
    </main>
  );
}
