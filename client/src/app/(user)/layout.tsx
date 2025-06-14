"use client";
import { useAuth } from "@/utils/authStore";
import { useToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  useEffect(() => {
    if (!isLoggedIn) {
      showToast("Please LogIn to Visit this route", "info");
      router.push("/");
    }
  }, [isLoggedIn, showToast, router]);

  return <>{children}</>;
}
