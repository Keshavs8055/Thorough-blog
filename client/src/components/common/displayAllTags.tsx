"use client";
import { getAllTags } from "@/lib/api";
import { useEffect, useState } from "react";

export const AllTags = () =>
  getAllTags().then((data) => {
    if (data.success && Array.isArray(data.tags)) {
      const uniqueTags = Array.from(
        new Set(data.tags.filter((t: string) => t && t.trim()))
      );
      return uniqueTags;
    }
  });

export const AllTagsComponent = () => {
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    AllTags().then((fetchedTags) => {
      if (fetchedTags) {
        setTags(fetchedTags);
      }
    });
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {tags.length > 0 &&
        tags.map((tag) => (
          <a
            key={tag}
            href={`/all-tags?tag=${encodeURIComponent(tag)}`}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
          >
            #{tag}
          </a>
        ))}
    </div>
  );
};
