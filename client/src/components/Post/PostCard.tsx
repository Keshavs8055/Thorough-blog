"use client";

import { stripHtmlAndTrim } from "@/lib/utils";
import { Post } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function PostCard({ post }: { post: Post }) {
  const { _id, image, title, author, date, summary, likeCount, tags } = post;

  return (
    <article className="border-b border-dashed border-neutral-400 pb-10 mb-12 px-4 sm:px-8 font-serif  rounded-sm">
      <div
        // href={`/posts/${_id}`}
        className="group block no-underline"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image */}
          {image?.src && (
            <div className="lg:w-[30%]">
              <Image
                src={image.src}
                alt={image.alt}
                width={200}
                height={150}
                className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition duration-300 border border-neutral-400"
              />
            </div>
          )}

          {/* Text Content */}
          <div className="flex flex-col justify-between lg:w-[70%]">
            <h2
              className="text-2xl md:text-3xl font-bold tracking-tight leading-tight group-hover:underline"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-ink)",
              }}
            >
              {title.toUpperCase()}
            </h2>

            {/* Author and Date */}
            <div className="text-sm italic mt-3 text-neutral-600">
              By{" "}
              <span className=" text-[var(--color-primary)] font-medium">
                <a href={`/author/${author.username}`}>{author.name}</a>
              </span>{" "}
              &nbsp;•&nbsp;{" "}
              <span className="tracking-wider font-mono text-xs">
                {new Date(date).toLocaleDateString()}
              </span>
            </div>

            {/* Summary */}
            <p className="mt-4 text-base leading-relaxed text-neutral-800">
              {stripHtmlAndTrim(summary, 500)}
            </p>

            {/* Read More */}
            <div className="mt-6 flex justify-between items-center">
              <a
                href={`/posts/${_id}`}
                className="text-sm uppercase tracking-widest text-[var(--color-primary)] hover:underline  py-2 rounded transition duration-300"
              >
                Read More →
              </a>
            </div>
          </div>
        </div>
        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 items-center justify-between text-neutral-600">
            <div>
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/posts/tags?q=${encodeURIComponent(tag)}`}
                  className="px-2 py-1 text-xs bg-neutral-100 rounded-full text-neutral-700 hover:bg-[var(--color-primary)] hover:text-white transition duration-200 no-underline hover:underline"
                >
                  #{tag}
                </Link>
              ))}
            </div>
            <span className="">{likeCount}</span>
          </div>
        )}
      </div>
    </article>
  );
}
