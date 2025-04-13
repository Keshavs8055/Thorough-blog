"use client";

import { MessageCircle, Share2 } from "lucide-react";

type PostCardProps = {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image?: string;
  slug: string;
  tags?: string[];
};

export default function PostCard({
  title,
  excerpt,
  date,
  author,
  image,
  slug,
  tags = [],
}: PostCardProps) {
  return (
    <article className="p-5 lg:px-0 border-b border-primary py-8 font-serif text-ink max-w-3xl mx-auto">
      {/* Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover mb-6 grayscale border border-black shadow-md"
        />
      )}

      {/* Title */}
      <h2 className="text-2xl tracking-wide font-bold uppercase mb-2 leading-tight hover:underline cursor-pointer">
        {title}
      </h2>

      {/* Meta */}
      <p className="text-xs italic text-gray-600 mb-3">
        {author} — {new Date(date).toLocaleDateString()}
      </p>

      {/* Excerpt with drop cap */}
      <p className="text-base text-ink">{excerpt}</p>

      {/* Read more */}
      <a
        href={`/posts/${slug}`}
        className="text-xs uppercase font-semibold underline tracking-widest hover:text-gray-800"
      >
        Read More →
      </a>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600 uppercase tracking-wide">
          {tags.map((tag) => (
            <span
              key={tag}
              className="border border-black px-2 py-0.5 rounded-sm hover:bg-black hover:text-white transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Icons */}
      <div className="flex space-x-6 mt-6 text-gray-500">
        <button className="hover:text-black flex items-center gap-1">
          <MessageCircle size={18} /> <span className="sr-only">Comment</span>
        </button>
        <button className="hover:text-black flex items-center gap-1">
          <Share2 size={18} /> <span className="sr-only">Share</span>
        </button>
      </div>
    </article>
  );
}
