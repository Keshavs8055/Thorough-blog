"use client";

import { useEffect, useState } from "react";
import { fetchUser } from "@/lib/api";
import { useAuth } from "@/utils/authStore";
import { Spinner } from "@/components/common/spinner";
import { redirect } from "next/navigation";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { login, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      redirect("/");
    }
    const init = async () => {
      const result = await fetchUser();
      console.log("PROVIDER", result);

      if (result.success && result.user && result.token) {
        login(result.user, result.token);
      } else {
        console.warn(result.message || "User not logged in");
      }
      setLoading(false);
    };

    init();
  }, [login, isLoggedIn]);

  if (loading) return <Spinner />;
  return <>{children}</>;
};

export default AuthProvider;
