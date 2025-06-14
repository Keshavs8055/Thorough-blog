"use client";

import { useEffect, useState } from "react";
import { fetchCompleteUserData, userLogout } from "@/lib/api";
import { useAuth } from "@/utils/authStore";
import { useToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { CompleteUser } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [detailedUser, setDetailedUser] = useState<CompleteUser>();
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      if (!user) return;

      const res = await fetchCompleteUserData(user.id);
      if (res?.success) {
        setDetailedUser(res.user);
      } else {
        showToast("Failed to load profile.", "error");
      }
    };

    getUserData();
  }, [user, showToast]);

  const handleLogout = async () => {
    const res = await userLogout();
    console.log(res);

    if (!res.success) {
      showToast("Error During Logout", "error");
      return;
    }
    showToast("Logged Out Succesfully!", "success");
    logout();
  };

  return (
    <div className="flex justify-center items-center px-4 py-16 bg-[url('/paper-bg.png')] bg-cover font-serif">
      <div className="w-full max-w-4xl bg-white border border-zinc-300 shadow-md rounded-lg p-10">
        <div className="mb-10 flex p-5 border-b justify-between items-center">
          <h1 className="text-2xl font-bold text-center tracking-widest mb-2 text-zinc-800 drop-shadow-md">
            YOUR PROFILE
          </h1>
          <Link
            href="/new"
            className="bg-primary text-white p-2 rounded"
          >
            <PlusCircleIcon />
          </Link>
        </div>
        {detailedUser ? (
          <div className="flex flex-col lg:flex-row gap-8 text-zinc-800">
            <div className="flex-shrink-0 self-center lg:self-start">
              <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-zinc-400 shadow-sm">
                <Image
                  src={detailedUser.avatar || "/avatar-placeholder.png"}
                  alt="Profile Picture"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-zinc-700 border-b pb-1 border-zinc-300">
                  Personal Information
                </h2>
                <p>
                  <span className="text-sm font-semibold text-zinc-600 mr-2">
                    Name:
                  </span>
                  <span className="text-base font-sans text-zinc-900">
                    {detailedUser.name}
                  </span>
                </p>
                <p>
                  <span className="text-sm font-semibold text-zinc-600 mr-2">
                    Username:
                  </span>
                  <span className="text-base font-sans text-zinc-900">
                    {detailedUser.username}
                  </span>
                </p>
                <p>
                  <span className="text-sm font-semibold text-zinc-600 mr-2">
                    Email:
                  </span>
                  <span className="text-base font-sans text-zinc-900">
                    {detailedUser.email}
                  </span>
                </p>
              </div>

              {detailedUser.authorProfile && detailedUser.role !== "user" && (
                <div>
                  <h2 className="text-lg font-semibold text-zinc-700 border-b pb-1 border-zinc-300">
                    Expertise
                  </h2>
                  <ul className="list-disc list-inside space-y-1 text-zinc-800">
                    {detailedUser.authorProfile.expertise.length > 0 ? (
                      detailedUser.authorProfile.expertise.map(
                        (skill, index) => (
                          <li
                            key={index}
                            className="font-sans"
                          >
                            {skill}
                          </li>
                        )
                      )
                    ) : (
                      <li className="italic text-zinc-500">
                        No expertise listed
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {detailedUser.authorProfile && detailedUser.authorProfile.bio && (
                <div>
                  <h2 className="text-xl font-semibold text-zinc-700 border-b pb-1 border-zinc-300">
                    Biography
                  </h2>
                  <p className="font-sans text-zinc-800 leading-relaxed">
                    {detailedUser.authorProfile.bio}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 items-end">
                {user?.role === "pending-author" ? (
                  <p className="text-sm text-zinc-500 italic">
                    You will Be able to edit after confirmation.
                  </p>
                ) : (
                  <button
                    onClick={() => router.push("/editProfile")}
                    className="uppercase px-5 py-2 border border-zinc-700 text-zinc-800 rounded hover:bg-zinc-800 hover:text-white transition-all"
                  >
                    Edit Profile
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="uppercase px-5 py-2 border border-red-700 text-red-700 rounded hover:bg-red-700 hover:text-white transition-all"
                >
                  Logout
                </button>
                {detailedUser.role === "user" && (
                  <span
                    onClick={() => router.push("/becomeAnAuthor")}
                    className="text-primary rounded hover:underline cursor-pointer transition-all"
                  >
                    Become an author?
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-zinc-500 italic">Loading profile...</p>
        )}
      </div>
    </div>
  );
}
