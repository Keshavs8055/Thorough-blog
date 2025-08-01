"use client";

import { motion } from "framer-motion";
import { Quote } from "./quote";
import { EditorsPicks } from "./picks";
import { Trending } from "./trending";
import { SearchComponent } from "./searchComponent";

export default function SidebarNav() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col px-6 md:px-8 py-10 space-y-10 font-serif text-[15px] bg-[#FFFBF5]"
    >
      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <SearchComponent />
      </motion.div>

      {/* Trending Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Trending />
      </motion.div>

      {/* Editor's Picks Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <EditorsPicks />
      </motion.div>

      {/* Quote Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Quote />
      </motion.div>
    </motion.aside>
  );
}
