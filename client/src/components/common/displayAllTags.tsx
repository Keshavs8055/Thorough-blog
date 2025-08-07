"use client";

import { getAllTags } from "@/lib/api";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, X } from "lucide-react";

export const AllTagsComponent = ({ allTags }: { allTags: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(allTags || []);

  useEffect(() => {
    if (tags.length > 0) return;
    getAllTags().then((data) => {
      if (data.success && Array.isArray(data.data.tags)) {
        const uniqueTags = Array.from(
          new Set(data.data.tags.filter((t: string) => t && t.trim()))
        );
        setTags(uniqueTags);
      }
    });
  }, [tags]);

  return (
    <div className="relative max-w-md mx-auto">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-md text-sm sm:text-base font-semibold text-[#FFFBF5] bg-[#8B735C] hover:bg-[#6B7F6B] transition-colors border border-[#6E5D4E] shadow-sm"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
      </button>

      {/* Animated Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute mt-3 z-50 w-full min-w-md bg-[#FFFBF5] border border-[#6E5D4E] rounded-md shadow-md p-4 max-h-[300px] overflow-y-auto"
          >
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <a
                  key={tag}
                  href={`/all-tags?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 rounded-full text-sm font-medium font-sans text-[#FFFBF5] bg-[#8B735C] hover:bg-[#6B7F6B] transition-colors"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
