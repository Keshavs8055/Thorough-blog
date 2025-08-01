// "use client";

// import { Search } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export const SearchComponent = () => {
//   const router = useRouter();
//   const [query, setQuery] = useState("");
//   const [isFocused, setIsFocused] = useState(false);

//   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const trimmed = query.trim();

//     if (!trimmed) return;

//     const words = trimmed.split(" ");
//     const allTags = words.every(
//       (word) => word.startsWith("#") && word.length > 1
//     );

//     if (allTags) {
//       const tags = words.map((tag) => tag.slice(1)).join(",");
//       router.push(`/posts/tags?q=${encodeURIComponent(tags)}`);
//     } else {
//       router.push(`/posts/search?q=${encodeURIComponent(trimmed)}`);
//     }
//   };

//   return (
//     <div className="relative w-full max-w-3xl mx-auto">
//       <form
//         onSubmit={handleSearch}
//         className="flex items-center justify-between border rounded-xl p-2 my-2 border-black"
//       >
//         <input
//           type="text"
//           placeholder="Search articles..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           className="flex-1 bg-transparent focus:outline-none  italic font-serif text-gray-800 placeholder:text-gray-500"
//         />
//         <button
//           type="submit"
//           className="ml-4 text-sm uppercase tracking-wide font-semibold font-serif text-gray-700 hover:underline"
//         >
//           <Search size={20} />
//         </button>
//       </form>

//       <AnimatePresence>
//         {isFocused && (
//           <motion.div
//             initial={{ opacity: 0, y: 4 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 4 }}
//             transition={{ duration: 0.2 }}
//             className="absolute top-full left-0 mt-2 text-sm font-serif bg-white text-gray-600 border border-gray-200 rounded px-4 py-2 shadow-md"
//           >
//             💡 Tip: Use <span className="font-mono text-gray-800">#</span> to
//             search by tag. Example: <span className="font-mono">#ai</span> or{" "}
//             <span className="font-mono">#react #mongodb</span>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };
"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SearchComponent = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) return;

    const words = trimmed.split(" ");
    const allTags = words.every(
      (word) => word.startsWith("#") && word.length > 1
    );

    if (allTags) {
      const tags = words.map((tag) => tag.slice(1)).join(",");
      router.push(`/posts/tags?q=${encodeURIComponent(tags)}`);
    } else {
      router.push(`/posts/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-between border border-[#6E5D4E] rounded-xl p-3 bg-[#FFFBF5] shadow-sm"
      >
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent focus:outline-none italic font-[Merriweather] text-[#3D2C1F] placeholder:text-[#6E5D4E] text-base"
        />
        <button
          type="submit"
          className="ml-4 text-sm uppercase tracking-wide font-[Lato] font-semibold text-[#8B735C] hover:text-[#6B7F6B] transition-colors"
        >
          <Search size={20} />
        </button>
      </form>

      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 mt-2 text-sm font-[Merriweather] bg-[#FFFBF5] text-[#3D2C1F] border border-[#6E5D4E] rounded px-4 py-2 shadow-md"
          >
            💡 Tip: Use <span className="font-mono text-[#3D2C1F]">#</span> to
            search by tag. Example: <span className="font-mono">#ai</span> or{" "}
            <span className="font-mono">#react #mongodb</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
