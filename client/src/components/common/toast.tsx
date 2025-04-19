// components/ui/Toast.tsx
"use client";

import { useToast } from "@/utils/toast";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function Toast() {
  const { visible, message, type, link } = useToast();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-5 py-3 rounded-md text-white shadow-lg z-50 ${
            type === "success"
              ? "bg-green-600"
              : type === "info"
              ? "bg-blue-500"
              : "bg-red-500"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div>{message}</div>
          {link ? (
            <div>
              <Link
                href={`${link.link}`}
                className="underline"
              >
                {link.label}
              </Link>
            </div>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
