"use client";

import { Post } from "@/utils/types";
import Link from "next/link";

export default function PostCard({ post }: { post: Post }) {
  const { _id, image, title, author, date, summary } = post;

  return (
    <article
      className="border-b pb-8 mb-10 py-5 m-5 lg:m-0 font-serif"
      style={{ fontFamily: "var(--font-serif)" }}
    >
      <Link href={`/posts/${_id}`}>
        <div className="flex flex-col lg:flex-row gap-6 group cursor-pointer">
          {/* Image */}
          {image?.src && (
            <div className="lg:w-1/3">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition duration-300 rounded"
              />
            </div>
          )}

          {/* Text Content */}
          <div className="flex flex-col justify-between lg:w-2/3">
            <h2
              className="text-2xl font-bold leading-tight group-hover:underline"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-ink)",
              }}
            >
              {title}
            </h2>

            {/* Author and Date */}
            <div
              className="text-sm italic mt-2"
              style={{ color: "var(--color-muted)" }}
            >
              By{" "}
              <span
                className="underline"
                style={{ color: "var(--color-primary)" }}
              >
                {author.name}
              </span>{" "}
              • {new Date(date).toLocaleDateString()}
            </div>

            {/* Summary */}
            <p
              className="text-base mt-4 leading-relaxed line-clamp-3"
              style={{ color: "var(--color-ink)" }}
            >
              {summary}
            </p>

            {/* Read More */}
            <div className="mt-4">
              <span
                className="inline-block rounded-full px-3 py-1 text-sm font-semibold cursor-pointer transition duration-200"
                style={{
                  backgroundColor: "var(--color-sepia)",
                  color: "var(--color-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-primary)";
                  e.currentTarget.style.color = "var(--color-over-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-sepia)";
                  e.currentTarget.style.color = "var(--color-primary)";
                }}
              >
                Read More →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
