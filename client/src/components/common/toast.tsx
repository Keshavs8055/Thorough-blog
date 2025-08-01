"use client";

import { useToast } from "@/utils/toast";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function Toast() {
  const { visible, message, type, link } = useToast();

  const bgColor =
    type === "success"
      ? "bg-[#6B7F6B]" // desaturated olive green
      : type === "info"
      ? "bg-[#8B735C]" // muted sepia
      : "bg-[#C05746]"; // muted terracotta red

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { ease: "easeOut", duration: 0.3 },
          }}
          exit={{
            opacity: 0,
            y: 15,
            transition: { ease: "easeIn", duration: 0.2 },
          }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 rounded-md shadow-[0px_2px_5px_rgba(0,0,0,0.05)] z-50 ${bgColor}`}
          style={{
            fontFamily: "Lato, sans-serif",
            color: "#FFFBF5",
            border: "1px solid #6E5D4E",
            backgroundImage: "url('/paper-texture.png')", // optional paper texture overlay if you add it
            backgroundSize: "cover",
            backgroundBlendMode: "overlay",
          }}
        >
          <div className="text-sm leading-relaxed">{message}</div>
          {link && (
            <div className="mt-2">
              <Link
                href={`${link.link}`}
                className="text-[#FFFBF5] underline underline-offset-2 hover:text-[#3D2C1F] transition-colors duration-200"
              >
                {link.label}
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
