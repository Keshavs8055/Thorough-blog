"use client";
import { useAuth } from "@/utils/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "../common/spinner";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || !user) {
      router.push("/auth/login");
    } else if (!allowedRoles.includes(user.role)) {
      router.push("/unauthorized"); // or redirect to home
    }
  }, [isLoggedIn, user, allowedRoles, router]);

  if (!user) return <Spinner />;

  return <>{children}</>;
}
