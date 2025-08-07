"use client";
import { likePost } from "@/lib/api";
import { useAuth } from "@/utils/authStore";
import { useToast } from "@/utils/toast";
import { IPost } from "@/utils/globalTypes";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SmartLink } from "../common/smartLink";

export default function SinglePost({ post }: { post: IPost }) {
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [liked, setLiked] = useState(false);
  const user = useAuth((state) => state.user);
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const { showToast } = useToast();

  useEffect(() => {
    if (user && post.likes?.includes(user._id)) {
      setLiked(true);
    }
  }, [user, post.likes]);

  const handleLike = async () => {
    if (!isLoggedIn) {
      showToast("Please login to like this post.", "error", {
        label: "Login?",
        link: "/login",
      });
      return;
    }

    if (!post._id) return;

    try {
      const res = await likePost(post._id);
      if (res.success && res.data.likes !== undefined) {
        setLikeCount(res.data.likes);
        setLiked((prev) => !prev);
      }
    } catch (err) {
      console.error("Failed to like the post", err);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto py-12 px-6 bg-[#FFFBF5]"
      style={{ fontFamily: "Merriweather, serif" }}
    >
      <header className="border-b-2 border-[#6E5D4E] pb-4 mb-8">
        <h1
          className="text-4xl font-extrabold text-center text-[#3D2C1F] tracking-tight uppercase"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {post.title}
        </h1>
        <div className="text-sm text-center text-[#6E5D4E] italic mt-2">
          By{" "}
          <SmartLink
            href={`/author/${post.author.username}`}
            className="hover:underline text-[#8B735C]"
          >
            {post.author.name}
          </SmartLink>{" "}
          • {new Date(post.date).toLocaleDateString()}
        </div>
      </header>

      {post.image?.src && (
        <div className="m-auto h-auto">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={800}
            height={600}
            className=" grayscale hover:grayscale-0 transition duration-300 border border-[#6E5D4E]"
          />
        </div>
      )}

      {post.body.map((htmlString: string, i: number) => (
        <div
          key={i}
          className={`prose prose-lg max-w-none ${
            i === 0
              ? "first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:pr-2"
              : ""
          }`}
          style={{ color: "#3D2C1F", lineHeight: "1.75" }}
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      ))}

      {post.pullQuotes?.[0] && (
        <blockquote
          className="border-l-4 pl-6 my-8 italic text-lg"
          style={{
            borderColor: "#8B735C",
            backgroundColor: "#f8f1e0",
            color: "#3D2C1F",
          }}
        >
          “{post.pullQuotes[0]}”
        </blockquote>
      )}

      <div className="mt-12 grid md:grid-cols-2 gap-10 border-t border-[#6E5D4E] pt-10">
        {/* {post.relatedArticles?.length > 0 && (
          <div>
            <h3
              className="text-xl font-bold mb-4 text-[#3D2C1F]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Related Articles
            </h3>
            <ul className="space-y-2">
              {post.relatedArticles.map((rel, i) => (
                <li key={i}>
                  <SmartLink
                    href={rel.href}
                    className="text-[#8B735C] hover:underline"
                  >
                    {rel.title}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        )} */}
        <div>
          <h3
            className="text-xl font-bold text-[#3D2C1F] mb-2"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Author
          </h3>
          <SmartLink
            href={`/author/${post.author.username}`}
            className="text-[#8B735C] hover:underline"
          >
            @{post.author.name}
          </SmartLink>
        </div>
      </div>

      <div className="flex justify-between items-start flex-wrap border-t border-[#6E5D4E] pt-6 mt-10">
        {post.tags?.length > 0 && (
          <div>
            <h4
              className="text-lg font-semibold mb-2 text-[#3D2C1F] uppercase tracking-wide"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Tags
            </h4>
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag: string, i: number) => (
                <li key={i}>
                  <SmartLink
                    href={`/tags/${tag}`}
                    className="bg-[#8B735C] text-[#FFFBF5] px-3 py-1 rounded-full text-sm hover:bg-[#6B7F6B] transition-all duration-150"
                  >
                    {tag}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm tracking-wider text-[#3D2C1F]">
            Likes: {likeCount}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className={`flex items-center gap-1 px-3 py-1 border rounded text-sm transition-colors duration-200 ${
              liked
                ? "bg-[#8B735C] text-[#FFFBF5] border-[#6E5D4E]"
                : "border-[#6E5D4E] text-[#3D2C1F] hover:bg-[#f2e8da]"
            }`}
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            {liked ? <ThumbsDown size={16} /> : <ThumbsUp size={16} />}
            {liked ? "Unlike" : "Like"}
          </motion.button>
        </div>
      </div>

      <footer className="mt-16 border-t border-[#6E5D4E] pt-6 text-center text-sm italic text-[#6E5D4E]">
        Share your thoughts below. Join the community and contribute your voice.
        <div className="mt-4 flex justify-center gap-4">
          {["Twitter", "Facebook"].map((platform) => (
            <button
              key={platform}
              className="text-[#8B735C] hover:underline"
            >
              Share on {platform}
            </button>
          ))}
        </div>
      </footer>
    </motion.article>
  );
}
