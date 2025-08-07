import { PostLite } from "@/utils/globalTypes";
import PostCard from "./PostCard";
import { motion } from "framer-motion";

interface Props {
  posts: PostLite[];
  observerRef: React.RefObject<HTMLDivElement | null>;
}

export const PostFeed = ({ posts, observerRef }: Props) => {
  return (
    <motion.div
      className="bg-[#FFFBF5] xl:px-10 px-4 py-12 space-y-10"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.07,
          },
        },
      }}
    >
      {posts.map((post, i) => (
        <motion.div
          key={post._id}
          className="border border-[#6E5D4E] p-6 rounded-md shadow-sm "
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
        >
          <PostCard post={post} />
        </motion.div>
      ))}

      <div
        ref={observerRef}
        className="flex justify-center items-center py-12"
      />
    </motion.div>
  );
};
