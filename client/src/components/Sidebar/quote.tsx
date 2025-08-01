"use client";

import { motion } from "framer-motion";

export const Quote = () => {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pl-4 border-l-2 border-[#8B735C] italic text-[#3D2C1F] text-[1rem] leading-relaxed font-[Merriweather]"
    >
      “The pen is mightier than the algorithm.”
      <br />
      <span className="text-[0.85rem] block mt-2 text-right text-[#6E5D4E] font-[Lato] not-italic">
        — Anonymous Reader
      </span>
    </motion.blockquote>
  );
};
