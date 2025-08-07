"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, ReactNode, useState } from "react";

interface SmartLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
  target?: "_self" | "_blank";
  onClick?: () => void;
}

export const SmartLink = ({
  href,
  children,
  className,
  replace,
  scroll,
  prefetch = true,
  target,
  onClick,
}: SmartLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, toggleLoading] = useState(false);
  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    toggleLoading(!loading);
    if (onClick) {
      onClick();

      toggleLoading(false);
      return;
    }

    if (pathname === href) return; // already on target

    try {
      if (replace) {
        router.replace(href, { scroll });
      } else {
        router.push(href, { scroll });
      }
    } catch (err) {
      console.error("Navigation failed", err);
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <>
      <div
        className={`absolute inset-0 z-10 w-full h-1 ${
          loading ? "" : "hidden"
        }`}
      >
        <div className="h-full w-1/2 bg-radial from-orange-950 to-transparent animate-[globalLoading_1s_ease-in-out_infinite]"></div>
      </div>
      <Link
        href={href}
        prefetch={prefetch}
        onClick={handleClick}
        className={className}
        target={target}
      >
        {children}
      </Link>
    </>
  );
};
