"use client";

// components/Header.tsx
import { Menu, X } from "lucide-react";
import SidebarNav from "../Sidebar/sidebar";
import { useState } from "react";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div>
      <header className=" sticky w-full bg-primary text-over-primary top-0 border-b z-10 flex items-center justify-between px-4 py-3">
        <h1 className="text-2xl md:text-center font-extrabold tracking-wide font-serif uppercase">
          The Public Blog
        </h1>
        <Menu
          onClick={() => setNavOpen(true)}
          className="block md:hidden h-6 w-6 cursor-pointer"
        />
      </header>

      {navOpen && (
        <div className="h-screen w-screen bg-amber-50 z-20 absolute top-0 left-0">
          <SidebarNav />
          <button
            onClick={() => setNavOpen(false)}
            className="absolute h-15 w-15 bg-primary top-2 right-2 text-over-primary rounded-4xl flex items-center justify-center"
          >
            <X />
          </button>
        </div>
      )}
    </div>
  );
}
