"use client";
import { useState, useEffect, JSX } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  PenTool,
  User,
  LogIn,
  Grid,
  Mail,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/utils/authStore";
import { Logo, MenuButton, NavItem, SearchButton } from "./navUtils";
import { MobileMenu } from "./mobileMenu";

interface IDesktopNav {
  navItems: {
    name: string;
    href: string;
    icon: JSX.Element;
  }[];
  authNavItem: {
    name: string;
    href: string;
    icon: JSX.Element;
  };
  pathname: string;
}

// Desktop navigation component
const DesktopNav = ({ navItems, authNavItem, pathname }: IDesktopNav) => (
  <div className="hidden lg:flex items-center space-x-2 max-w-3xl ">
    {navItems.map((item) => (
      <NavItem
        key={item.name}
        item={item}
        pathname={pathname}
      />
    ))}
    <NavItem
      item={authNavItem}
      pathname={pathname}
    />
    <SearchButton />
  </div>
);

// Main Navbar component
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Categories", href: "/categories", icon: <Grid size={20} /> },
    { name: "Authors", href: "/authors", icon: <PenTool size={20} /> },
    { name: "Featured", href: "/featured", icon: <TrendingUp size={20} /> },
    { name: "Contact", href: "/contact", icon: <Mail size={20} /> },
  ];

  const authNavItem = isLoggedIn
    ? { name: "Profile", href: "/profile", icon: <User size={20} /> }
    : { name: "Login", href: "/login", icon: <LogIn size={20} /> };

  // Track scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        className={`sticky max-w-screen top-0 left-0 w-full z-50 font-serif border-b border-gray-300 ${
          scrolled ? "bg-[#f9f6f1] shadow-md" : "bg-[#f9f6f1]"
        } transition-all duration-300`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
          <div className="flex justify-between items-center h-20">
            <Logo />

            <DesktopNav
              navItems={navItems}
              authNavItem={authNavItem}
              pathname={pathname}
            />
            <div className="lg:hidden flex items-center">
              <MenuButton setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>

        <MobileMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          navItems={navItems}
          authNavItem={authNavItem}
          pathname={pathname}
        />
      </motion.nav>
    </>
  );
}
