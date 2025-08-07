"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import { fetchAuthorPageData } from "@/lib/api";
import PostCard from "@/components/Post/PostCard";
import {
  CompleteAuthorResponse,
  PostLite,
  SocialMediaLinks,
} from "@/utils/globalTypes";
import { SmartLink } from "@/components/common/smartLink";

export default function AuthorPage() {
  const { username } = useParams();
  const [data, setData] = useState<CompleteAuthorResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchAuthorData = async () => {
      setLoading(true);
      try {
        const response = await fetchAuthorPageData(username as string);

        if (response.success && response.data?.user) {
          setData(response.data);
          setError(null);
        } else {
          setError(response.message || "Failed to fetch author data.");
        }
      } catch (error) {
        console.error("Error fetching author data:", error);
        setError("Something went wrong fetching author data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [username]);

  if (loading) return <p className="p-8">Loading author page...</p>;
  if (error) return <p className="text-red-500 text-center p-8">{error}</p>;
  if (!data || !data.user)
    return <p className="p-8 text-center">No author found.</p>;

  const { user, posts } = data;
  const authorProfile = user.authorProfile;

  const renderSocialLinks = () => {
    const socials: SocialMediaLinks | undefined = authorProfile?.socialMedia;
    if (!socials) return null;

    return (
      <div className="flex flex-wrap gap-3 mt-4 text-sm">
        {socials.website && (
          <SmartLink
            href={socials.website}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Website
          </SmartLink>
        )}
        {socials.twitter && (
          <SmartLink
            href={`https://twitter.com/${socials.twitter}`}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Twitter
          </SmartLink>
        )}
        {socials.linkedin && (
          <SmartLink
            href={socials.linkedin}
            target="_blank"
            className="text-blue-700 hover:underline"
          >
            LinkedIn
          </SmartLink>
        )}
      </div>
    );
  };

  const renderExpertiseTags = () => {
    const tags: string[] | undefined = authorProfile?.expertise;
    if (!tags?.length) return null;

    return (
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((topic: string) => (
          <span
            key={topic}
            className="px-2 py-1 text-xs bg-neutral-100 rounded-full border border-neutral-300"
          >
            {topic}
          </span>
        ))}
      </div>
    );
  };

  return (
    <main className="max-w-7xl mx-auto py-8">
      {/* Author Profile */}
      <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 border-b pb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden border border-neutral-400">
          <Image
            src={user.avatar || "/default-avatar.png"}
            alt={user.name}
            width={112}
            height={112}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
          <p className="text-sm text-neutral-500">@{user.username}</p>

          {authorProfile?.bio && (
            <p className="mt-2 text-neutral-700 max-w-prose">
              {authorProfile.bio}
            </p>
          )}

          {renderSocialLinks()}
          {renderExpertiseTags()}
        </div>
      </section>

      {/* Published Posts */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Published Posts</h2>

        {posts?.length ? (
          posts.map((post: PostLite) => (
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
