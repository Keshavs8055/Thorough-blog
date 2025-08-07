"use client";

import { stripHtmlAndTrim } from "@/lib/utils";
import { PostLite } from "@/utils/globalTypes";
import Image from "next/image";
import { motion } from "framer-motion";
import { SmartLink } from "../common/smartLink";

export default function PostCard({ post }: { post: PostLite }) {
  const { _id, image, title, author, date, summary, likeCount, tags } = post;

  return (
    <motion.article
      className="bg-[#FFFBF5] px-6 py-8 rounded-md shadow-[0px_2px_5px_rgba(0,0,0,0.05)] font-serif space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image */}
        {image?.src && (
          <div className="lg:w-[30%]">
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={300}
              className="w-full h-48 object-cover grayscale hover:grayscale-0 transition duration-300 border border-[#6E5D4E]"
            />
          </div>
        )}

        {/* Text Content */}
        <div className="flex flex-col justify-between lg:w-[70%]">
          <h2
            className="text-3xl font-extrabold leading-snug tracking-tight hover:underline transition-colors"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#3D2C1F",
            }}
          >
            {title.toUpperCase()}
          </h2>

          {/* Author and Date */}
          <div
            className="text-sm mt-2"
            style={{ color: "#6E5D4E", fontFamily: "'Merriweather', serif" }}
          >
            By{" "}
            <a
              href={`/author/${author.username}`}
              className="font-semibold hover:text-[#8B735C] transition-colors"
            >
              {author.name}
            </a>{" "}
            &nbsp;•&nbsp;{" "}
            <span className="font-mono text-xs tracking-wide">{date}</span>
          </div>

          {/* Summary */}
          <p
            className="mt-4 text-base leading-7"
            style={{
              fontFamily: "'Merriweather', serif",
              color: "#3D2C1F",
              lineHeight: "1.7",
            }}
          >
            {stripHtmlAndTrim(summary, 500)}
          </p>

          {/* Read More */}
          <div className="mt-6">
            <a
              href={`/posts/${_id}`}
              className="text-xs uppercase tracking-widest font-semibold text-[#8B735C] hover:underline"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Read More →
            </a>
          </div>
        </div>
      </div>

      {/* Tags and Likes */}
      {(tags?.length > 0 || likeCount > 0) && (
        <div className="pt-4 mt-4 border-t border-dashed border-[#6E5D4E] flex flex-wrap justify-between items-center text-sm">
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag: string) => (
              <SmartLink
                key={tag}
                href={`/posts/tags?q=${encodeURIComponent(tag)}`}
                className="px-3 py-1 rounded-full text-[#FFFBF5] bg-[#8B735C] text-xs hover:bg-[#6B7F6B] transition"
              >
                #{tag}
              </SmartLink>
            ))}
          </div>
          <div className="text-[#6E5D4E] font-semibold">{likeCount} ❤</div>
        </div>
      )}
    </motion.article>
  );
}
