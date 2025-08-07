"use client";

import { useEffect, useState } from "react";
import { fetchUser, userLogout } from "@/lib/api";
import { useAuth } from "@/utils/authStore";
import { useToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { PlusCircleIcon } from "lucide-react";
import type { IUser, SocialMediaLinks } from "../../../utils/globalTypes"; // if types are in a central file
import { SmartLink } from "@/components/common/smartLink";

function BioSection({ bio }: { bio?: string }) {
  if (!bio) return null;

  return (
    <section className="mt-8">
      <h2 className="section-heading">Biography</h2>
      <p className="section-paragraph">{bio}</p>
    </section>
  );
}

function ExpertiseSection({ expertise }: { expertise?: string[] }) {
  return (
    <section className="mt-6">
      <h2 className="section-heading">Expertise</h2>
      <ul className="list-disc list-inside space-y-1 section-paragraph">
        {expertise && expertise.length > 0 ? (
          expertise.map((skill, i) => <li key={i}>{skill}</li>)
        ) : (
          <li className="italic text-[#8B735C]">No expertise listed</li>
        )}
      </ul>
    </section>
  );
}

function LinksSection({ links }: { links?: SocialMediaLinks }) {
  if (!links) return null;

  const { website, linkedin, twitter } = links;

  if (!website && !linkedin && !twitter) return null;

  return (
    <section className="mt-8">
      <h2 className="section-heading">Links</h2>
      <div className="mt-2 space-y-2 section-paragraph text-sm">
        {website && (
          <LinkField
            label="Website"
            url={website}
          />
        )}
        {linkedin && (
          <LinkField
            label="LinkedIn"
            url={linkedin}
          />
        )}
        {twitter && (
          <LinkField
            label="Twitter"
            url={twitter}
          />
        )}
      </div>
    </section>
  );
}

function LinkField({ label, url }: { label: string; url: string }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span>{" "}
      <SmartLink
        href={url}
        target="_blank"
        className="underline text-[#8B735C] hover:text-[#6E5D4E]"
      >
        {url}
      </SmartLink>
    </p>
  );
}

function ProfileHeader({ user }: { user: IUser }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        {user.avatar && (
          <Image
            src={user.avatar || "/placeholder.png"}
            alt="Profile picture"
            width={80}
            height={80}
            className="rounded-full border border-[#6E5D4E] filter grayscale"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#3D2C1F]">
            {user.name}
          </h1>
          <p className="text-xl font-sans text-[#6E5D4E]">{user.username}</p>
          <p className="text-sm font-sans text-[#6E5D4E]">{user.email}</p>
        </div>
      </div>

      {!user.isAuthor && (
        <SmartLink
          href="/new"
          className="text-[#FFFBF5] bg-[#8B735C] p-2 rounded hover:bg-[#6B7F6B] transition"
        >
          <PlusCircleIcon />
        </SmartLink>
      )}
    </div>
  );
}

function ActionButtons({
  user,
  onLogout,
}: {
  user: IUser;
  onLogout: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-4 items-end justify-between mt-6">
      <div className="gap-5 flex lg:me-5">
        {user.role === "pending-author" ? (
          <p className="text-sm text-[#8B735C] italic">
            You will be able to edit after confirmation.
          </p>
        ) : (
          <button
            onClick={() => router.push("/editProfile")}
            className="primary-button border border-primary px-4 py-2"
          >
            Edit Profile
          </button>
        )}
        <button
          onClick={onLogout}
          className="secondary-button rounded py-2 px-4 border border-red-500 text-red-500"
        >
          Logout
        </button>
      </div>
      {user.role === "user" && (
        <button
          onClick={() => router.push("/becomeAnAuthor")}
          className="text-[#8B735C] font-sans uppercase text-sm rounded transition hover:py-2"
        >
          Become an author?
        </button>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [detailedUser, setDetailedUser] = useState<IUser | null>(null);

  const handleLogout = async () => {
    const res = await userLogout();
    if (!res.success) {
      showToast("Error during logout", "error");
      return;
    }
    logout();
    showToast("Logged out successfully!", "success");
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;
      const res = await fetchUser();
      if (res?.success && res.data?.user) {
        setDetailedUser(res.data.user);
      } else {
        showToast("Failed to load profile.", "error");
      }
    };
    loadUserProfile();
  }, [user, showToast]);

  if (!detailedUser) return null;

  const { authorProfile, isAuthor } = detailedUser;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-[#FFFBF5] py-16 px-4 md:px-12"
    >
      <div className="max-w-3xl mx-auto border border-[#6E5D4E] rounded p-6 bg-white shadow-sm">
        <ProfileHeader user={detailedUser} />
        {isAuthor && (
          <>
            <BioSection bio={authorProfile?.bio} />
            <ExpertiseSection expertise={authorProfile?.expertise} />
            <LinksSection links={authorProfile?.socialMedia} />
          </>
        )}
        <ActionButtons
          user={detailedUser}
          onLogout={handleLogout}
        />
      </div>
    </motion.div>
  );
}
