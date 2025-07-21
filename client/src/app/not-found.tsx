"use client";

import Link from "next/link";
import { Newspaper } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f6f1e7] text-gray-900 flex flex-col items-center justify-center px-4 py-12 font-serif">
      <div className="w-full max-w-2xl border border-gray-800 border-dashed p-6 sm:p-10 bg-[#fffef8] shadow-xl rounded-xl">
        <div className="flex flex-col items-center space-y-4">
          <Newspaper className="h-12 w-12 text-gray-700" />
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-center uppercase underline decoration-gray-600 decoration-2 underline-offset-4">
            Page Not Found!
          </h1>
          <p className="text-center text-gray-700 text-lg sm:text-xl italic max-w-md">
            {`The page you’re looking for has either vanished into history or was
            never published.`}
          </p>

          <div className="text-sm sm:text-base text-center text-gray-600 pt-2">
            <p>{`Perhaps you'd enjoy something else from our archives.`}</p>
            <p className="mt-1">
              Try a fresh{" "}
              <span className="text-black font-semibold">search</span> or return
              to the homepage.
            </p>
          </div>

          <Link
            href="/"
            className="mt-6 inline-block px-5 py-2 border border-gray-800 hover:bg-gray-800 hover:text-white transition rounded uppercase text-sm tracking-wider"
          >
            Return to Home 🏠
          </Link>
        </div>

        <div className="pt-10 mt-10 border-t border-gray-300 text-xs text-gray-500 text-center italic">
          🕵️‍♂️ Issue No. 404 | Published: Never | All rights lost
        </div>
      </div>
    </div>
  );
}
