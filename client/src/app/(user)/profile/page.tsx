"use client";

import { useEffect, useState } from "react";
import { fetchCompleteUserData, userLogout } from "@/lib/api";
import { useAuth } from "@/utils/authStore";
import { useToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { CompleteUser } from "@/utils/types";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [detailedUser, setDetailedUser] = useState<CompleteUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;

      const res = await fetchCompleteUserData(user.id);
      console.log(res);

      if (res?.success && res.user) {
        setDetailedUser(res.user);
      } else {
        showToast("Failed to load profile.", "error");
      }
    };

    loadUserProfile();
  }, [user, setDetailedUser, showToast]);

  const handleLogout = async () => {
    const res = await userLogout();

    if (!res.success) {
      showToast("Error during logout", "error");
      return;
    }

    logout();
    showToast("Logged out successfully!", "success");
  };

  const renderExpertise = () => {
    const skills = detailedUser?.authorProfile?.expertise;
    return (
      <div className="mt-6">
        <h2 className="text-xl font-serif font-semibold text-[#3D2C1F] border-b border-[#6E5D4E] pb-1">
          Expertise
        </h2>
        <ul className="list-disc list-inside space-y-1 text-[#3D2C1F] font-serif leading-relaxed mt-2">
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => <li key={index}>{skill}</li>)
          ) : (
            <li className="italic text-[#8B735C]">No expertise listed</li>
          )}
        </ul>
      </div>
    );
  };

  const renderBio = () => {
    const bio = detailedUser?.authorProfile?.bio;
    if (!bio) return null;
    return (
      <div className="mt-8">
        <h2 className="text-xl font-serif font-semibold text-[#3D2C1F] border-b border-[#6E5D4E] pb-1">
          Biography
        </h2>
        <p className="font-serif text-[#3D2C1F] mt-2 leading-relaxed text-base">
          {bio}
        </p>
      </div>
    );
  };
  const renderLinks = () => {
    const links = detailedUser?.authorProfile?.socialMedia;
    if (!links || (!links.website && !links.twitter && !links.linkedin))
      return null;

    return (
      <div className="mt-8">
        <h2 className="text-xl font-serif font-semibold text-[#3D2C1F] border-b border-[#6E5D4E] pb-1">
          Links
        </h2>
        <div className="mt-2 space-y-2 text-[#3D2C1F] font-serif text-sm">
          {links.website && (
            <p>
              <span className="font-semibold">Website:</span>{" "}
              <Link
                href={links.website}
                target="_blank"
                className="underline text-[#8B735C] hover:text-[#6E5D4E]"
              >
                {links.website}
              </Link>
            </p>
          )}
          {links.linkedin && (
            <p>
              <span className="font-semibold">LinkedIn:</span>{" "}
              <Link
                href={links.linkedin}
                target="_blank"
                className="underline text-[#8B735C] hover:text-[#6E5D4E]"
              >
                {links.linkedin}
              </Link>
            </p>
          )}
          {links.twitter && (
            <p>
              <span className="font-semibold">Twitter:</span>{" "}
              <Link
                href={links.twitter}
                target="_blank"
                className="underline text-[#8B735C] hover:text-[#6E5D4E]"
              >
                {links.twitter}
              </Link>
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderActionButtons = () => (
    <div className="flex flex-wrap gap-4 items-end mt-6">
      {user?.role === "pending-author" ? (
        <p className="text-sm text-[#8B735C] italic">
          You will be able to edit after confirmation.
        </p>
      ) : (
        <button
          onClick={() => router.push("/editProfile")}
          className="px-4 py-2 bg-[#8B735C] text-[#FFFBF5] font-sans uppercase text-sm rounded hover:bg-[#6B7F6B] transition"
        >
          Edit Profile
        </button>
      )}
      <button
        onClick={handleLogout}
        className="px-4 py-2 border border-[#6E5D4E] text-[#3D2C1F] font-sans text-sm rounded hover:bg-[#FFFBF5] transition"
      >
        Logout
      </button>
      {user?.role === "user" && (
        <button
          onClick={() => router.push("/becomeAnAuthor")}
          className="px-0 py-0 text-[#8B735C] font-sans uppercase text-sm rounded transition hover:py-2"
        >
          Become an author?
        </button>
      )}
    </div>
  );
  console.log(detailedUser);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-[#FFFBF5] py-16 px-4 md:px-12"
    >
      <div className="max-w-3xl mx-auto border border-[#6E5D4E] rounded p-6 bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {detailedUser?.avatar && (
              <Image
                src={detailedUser.avatar || "/placeholder.png"}
                alt="Profile picture"
                width={80}
                height={80}
                className="rounded-full border border-[#6E5D4E] filter grayscale"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold font-serif text-[#3D2C1F]">
                {detailedUser?.username}
              </h1>
              <p className="text-sm font-sans text-[#6E5D4E]">
                {detailedUser?.email}
              </p>
            </div>
          </div>
          {detailedUser?.isAuthor ?? (
            <Link
              href="/new"
              className="text-[#FFFBF5] bg-[#8B735C] p-2 rounded hover:bg-[#6B7F6B] transition"
            >
              <PlusCircleIcon />
            </Link>
          )}
        </div>
        {detailedUser?.isAuthor && renderBio()}
        {detailedUser?.isAuthor && renderExpertise()}
        {detailedUser?.isAuthor && renderLinks()}
        {renderActionButtons()}
      </div>
    </motion.div>
  );
}
