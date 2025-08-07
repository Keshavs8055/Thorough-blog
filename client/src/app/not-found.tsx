"use client";
import { Newspaper } from "lucide-react";
import { motion } from "framer-motion";
import { SmartLink } from "@/components/common/smartLink";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] text-[#3D2C1F] flex flex-col items-center justify-center px-4 py-12 font-serif">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl border border-[#6E5D4E] border-dashed p-6 sm:p-10 bg-[#FFFBF5] shadow-md rounded-xl"
        style={{
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.05)",
          backgroundImage: "url('/texture/paper-faint.png')", // optional texture layer
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col items-center space-y-4">
          <Newspaper className="h-12 w-12 text-[#6E5D4E]" />

          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-center uppercase underline decoration-[#6E5D4E] decoration-[2px] underline-offset-4 font-display">
            Page Not Found!
          </h1>

          <p className="text-center text-lg sm:text-xl italic max-w-md font-body text-[#3D2C1F]">
            The page you’re looking for has either vanished into history or was
            never published.
          </p>

          <div className="text-sm sm:text-base text-center pt-2 font-sans text-[#6E5D4E]">
            <p>{`Perhaps you'd enjoy something else from our archives.`}</p>
            <p className="mt-1">
              Try a fresh{" "}
              <span className="text-[#8B735C] font-semibold">search</span> or
              return to the homepage.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <SmartLink
              href="/"
              className="mt-6 inline-block px-5 py-2 border border-[#6E5D4E] text-[#FFFBF5] bg-[#8B735C] hover:bg-[#6B7F6B] transition-colors duration-200 rounded text-sm tracking-wider font-sans uppercase"
            >
              Return to Home 🏠
            </SmartLink>
          </motion.div>
        </div>

        <div className="pt-10 mt-10 border-t border-[#6E5D4E] text-xs text-[#6E5D4E] text-center italic font-sans">
          🕵️‍♂️ Issue No. 404 | Published: Never | All rights lost
        </div>
      </motion.div>
    </div>
  );
}
