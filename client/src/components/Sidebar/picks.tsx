"use client";

import { motion } from "framer-motion";

export const EditorsPicks = () => {
  const picks = [
    "How Public Blogs Are Changing Journalism",
    "5 Ways Readers Are Shaping Content",
    "The Return of Authentic Writing",
  ];

  return (
    <section className="bg-[#FFFBF5] p-4 rounded-md border border-[#6E5D4E] shadow-sm">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-lg font-bold uppercase tracking-wider border-b-2 border-[#6E5D4E] pb-2 text-[#3D2C1F] font-['Playfair_Display']"
      >
        {`Editor's Picks`}
      </motion.h2>

      <ul className="mt-3 space-y-2 text-[0.95rem] leading-relaxed font-['Merriweather'] text-[#3D2C1F]">
        {picks.map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ x: 6 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="pl-3 border-l-2 border-[#6E5D4E] hover:text-[#8B735C] hover:underline hover:decoration-dotted hover:underline-offset-4 cursor-pointer transition-all duration-200"
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </section>
  );
};
