"use client";

import { useEffect, useState } from "react";
import { fetchUser } from "@/lib/api";
import { useAuth } from "@/utils/authStore";
import { Spinner } from "@/components/common/spinner";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const result = await fetchUser();

        if (result.success && result.user) {
          login(result.user); // token is optional
        }
      } catch (e) {
        console.log(e);

        console.warn("User not logged in or token expired");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [login]);

  if (loading) return <Spinner />;
  return <>{children}</>;
};

export default AuthProvider;
