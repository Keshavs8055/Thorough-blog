"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmail } from "@/lib/api";
import { useToast } from "@/utils/toast";
import { useAuth } from "@/utils/authStore";
import { motion } from "framer-motion";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast } = useToast();
  const { login, isLoggedIn } = useAuth();

  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [message, setMessage] = useState<string>("");

  const token = searchParams.get("token");
  const email = searchParams.get("email");
  useEffect(() => {
    const verify = async () => {
      if (!token || !email) {
        setStatus("error");
        setMessage("Invalid or expired verification link.");
        return;
      }

      try {
        const result = await verifyEmail(token, email);

        if (result.success && result.data?.user && result.data?.token) {
          const { user } = result.data;
          login(user);
          showToast("Email verified successfully!", "success");

          setStatus("success");
          setMessage("Redirecting to your dashboard...");

          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          setStatus("error");
          setMessage(result.message || "Verification failed. Try again later.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage("Something went wrong. Please try again later.");
      }
    };

    verify();
  }, [token, email, router, login, showToast, isLoggedIn]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-[#FFFBF5] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full border border-[#6E5D4E] bg-[#FFFBF5] shadow-sm p-8 space-y-4 text-center rounded-md"
      >
        {status === "verifying" && (
          <>
            <motion.h2
              className="text-xl font-bold font-serif text-[#3D2C1F] animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Verifying your email...
            </motion.h2>
            <p className="text-sm font-sans text-[#6E5D4E]">
              Please wait a moment.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <motion.h2
              className="text-xl font-bold font-serif text-[#6B7F6B]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Verification Successful
            </motion.h2>
            <p className="text-sm font-sans text-[#6E5D4E]">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <motion.h2
              className="text-xl font-bold font-serif text-[#C05746]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Verification Failed
            </motion.h2>
            <p className="text-sm font-sans text-[#6E5D4E]">{message}</p>
          </>
        )}
      </motion.div>
    </div>
  );
}
