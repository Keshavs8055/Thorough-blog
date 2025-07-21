import { Post } from "@/utils/types";
import PostCard from "./PostCard";
import { Spinner } from "../common/spinner";
import { motion } from "framer-motion";

interface Props {
  posts: Post[];
  loading: boolean;
  observerRef: React.RefObject<HTMLDivElement | null>;
}

export const PostFeed = ({ posts, loading, observerRef }: Props) => {
  return (
    <div className="space-y-6 xl:px-10 xl:py-22 py-10">
      {posts.map((post, i) => (
        <motion.div
          key={post._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <PostCard post={post} />
        </motion.div>
      ))}
      {loading && <Spinner />}
      <div
        ref={observerRef}
        className="flex justify-center items-center py-8"
      />
    </div>
  );
};
