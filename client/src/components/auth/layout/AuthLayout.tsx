"use client";
import { useAuth } from "@/utils/authStore";
import { useToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth(); // Access the current user
  const router = useRouter();
  const { showToast } = useToast();
  useEffect(() => {
    if (user) {
      showToast("You are already logged in", "info");
      router.push("/");
    }
  }, [user, router, showToast]);
  return (
    <div className="flex flex-col">
      <div className="w-[90%] md:max-w-xl rounded mx-auto p-8 mt-9">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
