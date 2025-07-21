"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmail } from "@/lib/api";
import { useToast } from "@/utils/toast";
import { useAuth } from "@/utils/authStore";

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
    if (isLoggedIn) {
      router.push("/");
      return;
    }

    const verify = async () => {
      if (!token || !email) {
        setStatus("error");
        setMessage("Invalid or expired verification link.");
        return;
      }

      const result = await verifyEmail(token, email);
      if (result.success && result.user && result.token) {
        login(result.user);
        showToast("Email verified successfully!", "success");
        setStatus("success");
        setMessage("Redirecting to your dashboard...");

        setTimeout(() => router.push("/"), 2000);
      } else {
        setStatus("error");
        setMessage(result.message || "Verification failed. Try again later.");
      }
    };

    verify();
  }, [token, email, router, login, showToast, isLoggedIn]);

  return (
    <div className="flex items-center justify-center h-[80vh] text-center px-4">
      <div className="max-w-md w-full space-y-3">
        {status === "verifying" && (
          <>
            <h2 className="text-xl font-semibold animate-pulse">
              Verifying your email...
            </h2>
            <p className="text-sm text-gray-600">Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-xl font-semibold text-green-600">
              Verification Successful
            </h2>
            <p className="text-sm text-gray-600">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-xl font-semibold text-red-600">
              Verification Failed
            </h2>
            <p className="text-sm text-gray-600">{message}</p>
          </>
        )}
      </div>
    </div>
  );
}
