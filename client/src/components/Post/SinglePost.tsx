"use client";
import { likePost } from "@/lib/api";
import { useAuth } from "@/utils/authStore";
import { useToast } from "@/utils/toast";
import { Post } from "@/utils/types";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SinglePost({ post }: { post: Post }) {
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [liked, setLiked] = useState(false);
  const user = useAuth((state) => state.user);
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const { showToast } = useToast();

  useEffect(() => {
    if (user && post.likes?.includes(user.id)) {
      setLiked(true);
    }
  }, [user, post.likes]);

  const handleLike = async () => {
    if (!isLoggedIn) {
      showToast("Please login to like this post.", "error", {
        label: "Login?",
        link: "/login",
      });
      return;
    }

    if (!post._id) return;

    try {
      const res = await likePost(post._id);
      if (res.success && res.likes !== undefined) {
        setLikeCount(res.likes);
        setLiked((prev) => !prev);
      }
    } catch (err) {
      console.error("Failed to like the post", err);
    }
  };

  return (
    <article
      className="font-serif max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {/* Title */}
      <div className="mb-8 border-b pb-4">
        <h1
          className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-center"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-ink)",
          }}
        >
          {post.title.toUpperCase()}
        </h1>
      </div>

      {/* Author and Date */}
      <div
        className="text-sm italic text-center mb-6"
        style={{ color: "var(--color-muted)" }}
      >
        By{" "}
        <Link
          href={`/authors/${post.author._id}`}
          className="np-underline hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          {post.author.name}
        </Link>{" "}
        • {new Date(post.date).toLocaleDateString()}
      </div>
      {post.image && (
        <figure className="my-6">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={700}
            height={100}
            className="w-full max-h-screen object-cover rounded-md border"
            style={{ borderColor: "var(--color-muted)" }}
          />
          {post.image.caption && (
            <figcaption
              className="text-sm italic text-center mt-2"
              style={{ color: "var(--color-muted)" }}
            >
              {post.image.caption}{" "}
              {post.image.source && (
                <span className="text-xs">({post.image.source})</span>
              )}
            </figcaption>
          )}
        </figure>
      )}
      {/* Body */}
      {post.body.map((htmlString: string, i: number) => (
        <div
          key={i}
          className={`prose prose-lg max-w-none ${
            i === 0
              ? "first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:pr-2"
              : ""
          }`}
          style={{ color: "var(--color-ink)", lineHeight: "1.6" }}
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      ))}

      {/* Pull Quote */}
      {post.pullQuotes && post.pullQuotes.length > 0 && (
        <blockquote
          className="my-8 px-6 py-4 italic border-l-4 bg-sepia-light"
          style={{
            borderColor: "var(--color-primary)",
            backgroundColor: "#f8f1e0",
          }}
        >
          <p
            className="text-lg"
            style={{ color: "var(--color-ink)" }}
          >
            “{post.pullQuotes[0]}”
          </p>
        </blockquote>
      )}

      {/* Related Articles & Author Info */}
      <div className="border-t pt-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {post.relatedArticles && post.relatedArticles?.length > 0 && (
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-ink)",
              }}
            >
              Related Articles
            </h3>
            <ul className="list-disc list-inside space-y-2">
              {post.relatedArticles.map((rel, i) => (
                <li key={i}>
                  <Link
                    href={rel.href}
                    className="hover:underline no-underline"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {rel.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {post.author.bio && (
          <div className="border-t pt-8 md:border-t-0">
            <h3
              className="text-xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-ink)",
              }}
            >
              About the Author
            </h3>
            <div className="flex items-center space-x-4">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border"
                  style={{ borderColor: "var(--color-muted)" }}
                />
              )}
              <div>
                <p
                  className="font-bold"
                  style={{ color: "var(--color-ink)" }}
                >
                  {post.author.name}
                </p>
                <p
                  className="text-sm italic"
                  style={{ color: "var(--color-muted)" }}
                >
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start flex-wrap border-t border-neutral-400 pt-4 mt-6">
        {/* Tags Section */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-2">
            <h3
              className="text-lg font-semibold mb-2 tracking-wider uppercase"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#1a1a1a",
              }}
            >
              Tags
            </h3>
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <li key={i}>
                  <Link
                    href={`/tags/${tag}`}
                    className="border border-gray-600 text-gray-800 px-3 py-1 rounded-full text-sm transition-all duration-200 ease-in-out hover:bg-gray-100 hover:underline hover:border-black"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <span
            className="text-sm tracking-widest text-gray-700"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Likes: {likeCount}
          </span>
          <button
            className={`flex justify-around items-center border border-gray-700 px-2 py-1 rounded transition-all duration-200 text-gray-800 ${
              liked
                ? "bg-primary text-white hover:text-black hover:border-black"
                : "hover:bg-neutral-100 hover:border-black"
            } `}
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
            onClick={handleLike}
          >
            {liked ? (
              <ThumbsDown className="inline-block mr-1" />
            ) : (
              <ThumbsUp className="inline-block mr-1" />
            )}
            <span>{liked ? `Unlike` : `Like`}</span>
          </button>
        </div>
      </div>

      {/* Call to Action */}
      <div
        className="mt-12 pt-8 border-t text-center text-sm italic"
        style={{ color: "var(--color-muted)" }}
      >
        Share your thoughts below. Join the community and contribute your voice.
      </div>

      {/* Share Buttons */}
      <div className="mt-6 flex justify-center space-x-4 text-sm">
        {["Twitter", "Facebook"].map((platform) => (
          <button
            key={platform}
            className="hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            Share on {platform}
          </button>
        ))}
      </div>
    </article>
  );
}
