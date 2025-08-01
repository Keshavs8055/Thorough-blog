"use client";

import { motion } from "framer-motion";

export const Trending = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#FFFBF5] p-4 rounded-md border border-[#6E5D4E] shadow-sm"
    >
      <h2 className="text-[1rem] font-bold uppercase tracking-wider mb-3 pb-1 border-b border-[#6E5D4E] font-['Playfair_Display'] text-[#3D2C1F]">
        Trending
      </h2>

      <ul className="space-y-2 text-[0.95rem] leading-relaxed font-['Merriweather'] text-[#3D2C1F] pl-3">
        {[
          "How Public Blogs Are Changing Journalism",
          "5 Ways Readers Are Shaping Content",
          "The Return of Authentic Writing",
        ].map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ x: 4 }}
            className="pl-3 border-l-2 border-[#6E5D4E] hover:text-[#8B735C] hover:underline hover:decoration-dotted transition-colors duration-200 cursor-pointer"
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
};
