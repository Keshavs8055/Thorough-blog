"use client";
import { useAuth } from "@/lib/store";

export const MenuMobile = () => {
  const { isLoggedIn } = useAuth();
  return (
    <nav className="flex bg-paper-bg p-5 flex-col space-y-6 text-sm font-semibold uppercase">
      <a
        href="#"
        className="hover:underline"
      >
        Home
      </a>
      <a
        href="#"
        className="hover:underline"
      >
        Categories
      </a>
      <a
        href="#"
        className="hover:underline"
      >
        Authors
      </a>
      {isLoggedIn ? (
        <a
          href="#"
          className="hover:underline"
        >
          LogOut
        </a>
      ) : (
        <a
          href="#"
          className="hover:underline"
        >
          Login
        </a>
      )}
    </nav>
  );
};
