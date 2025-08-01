// Updated EditProfilePage component using vintage newspaper design principles and Framer Motion

"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/utils/toast";
import { useAuth } from "@/utils/authStore";
import { fetchCompleteUserData, updateUserProfile } from "@/lib/api";
import { CompleteUser, presetExpertise } from "@/utils/types";
import { Spinner } from "@/components/common/spinner";
import { motion } from "framer-motion";

export interface UpdateForm extends CompleteUser {
  newImage?: string | File | null;
}

const defaultUser: UpdateForm = {
  id: "",
  name: "",
  email: "",
  username: "",
  isAuthor: false,
  role: "user",
  authorProfile: {
    bio: "",
    expertise: [],
    socialMedia: {
      website: "",
      twitter: "",
      linkedin: "",
      github: "",
    },
  },
};

const EditProfilePage = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const userId = useAuth((s) => s.user?.id);
  const [formData, setFormData] = useState<UpdateForm>(defaultUser);
  const [avatar, setAvatar] = useState<{ data: File | null; preview: string }>({
    data: null,
    preview: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const loadUserData = async () => {
      const res = await fetchCompleteUserData(userId);
      if (res?.success && res.user) {
        setFormData(res.user);
        const ava = res.user.avatar || "";
        setAvatar((prev) => ({ ...prev, preview: ava }));
      } else {
        showToast("Failed to load profile.", "error");
      }
    };

    loadUserData();
  }, [userId, showToast]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      if (name === "name" || name === "email" || name === "username") {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else if (name === "bio") {
        setFormData((prev) => ({
          ...prev,
          authorProfile: {
            ...prev.authorProfile,
            bio: value,
          },
        }));
      }
    },
    []
  );

  const handleSocialChange = useCallback(
    (key: keyof UpdateForm["authorProfile"]["socialMedia"]) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          authorProfile: {
            ...prev.authorProfile,
            socialMedia: {
              ...prev.authorProfile.socialMedia,
              [key]: value,
            },
          },
        }));
      },
    []
  );

  const handleTagToggle = useCallback((tag: string) => {
    setFormData((prev) => {
      const expertise = prev.authorProfile.expertise;
      const exists = expertise.includes(tag);
      const updated = exists
        ? expertise.filter((t) => t !== tag)
        : expertise.length < 3
        ? [...expertise, tag]
        : expertise;

      return {
        ...prev,
        authorProfile: {
          ...prev.authorProfile,
          expertise: updated,
        },
      };
    });
  }, []);

  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setAvatar({ data: file, preview: URL.createObjectURL(file) });
      setFormData((prev) => ({ ...prev, newImage: file }));
    },
    []
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await updateUserProfile(formData);
      if (res?.success) {
        showToast("Profile updated successfully!", "success");
        router.push("/profile");
      } else {
        showToast("Failed to update profile.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("An error occurred.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData.id) return <Spinner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto my-20 p-6 bg-[#FFFBF5] text-[#3D2C1F] border border-[#6E5D4E] shadow-sm rounded"
    >
      <h2 className="text-3xl font-bold font-playfair border-b-2 border-[#6E5D4E] pb-2">
        Edit Profile
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 mt-4"
      >
        <div className="flex items-center space-x-4">
          {avatar.preview && (
            <Image
              src={avatar.preview}
              alt="Avatar"
              width={60}
              height={60}
              className="rounded-full border border-[#6E5D4E] grayscale"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="text-sm text-[#3D2C1F]"
          />
        </div>

        {(["name", "email", "username"] as const).map((field) => (
          <div key={field}>
            <label className="block font-semibold mb-1 capitalize text-[#3D2C1F]">
              {field}
            </label>
            <input
              name={field}
              type="text"
              value={formData[field]}
              onChange={handleInputChange}
              className="w-full border border-[#6E5D4E] p-2 rounded bg-white text-[#3D2C1F] focus:border-[#8B735C]"
              required
            />
          </div>
        ))}

        {formData.isAuthor && (
          <>
            <div>
              <label className="block font-semibold mb-1">Bio</label>
              <textarea
                name="bio"
                rows={3}
                value={formData.authorProfile.bio}
                onChange={handleInputChange}
                className="w-full border border-[#6E5D4E] p-2 rounded bg-white focus:border-[#8B735C]"
              />
            </div>

            <div>
              <p className="font-semibold">Social Links</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {(
                  [
                    "website",
                    "github",
                    "linkedin",
                    "twitter",
                  ] as (keyof UpdateForm["authorProfile"]["socialMedia"])[]
                ).map((key) => (
                  <input
                    key={key}
                    type="url"
                    placeholder={key}
                    value={formData.authorProfile.socialMedia[key] ?? ""}
                    onChange={handleSocialChange(key)}
                    className="border border-[#6E5D4E] p-2 rounded bg-white focus:border-[#8B735C]"
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold">Expertise (max 3)</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {presetExpertise.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all duration-150 font-sans ${
                      formData.authorProfile.expertise.includes(tag)
                        ? "bg-[#8B735C] text-[#FFFBF5]"
                        : "border-[#6E5D4E] text-[#3D2C1F] hover:bg-[#f3eee7]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#8B735C] hover:bg-[#6B7F6B] text-[#FFFBF5] py-2 rounded transition-colors"
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </motion.div>
  );
};

export default EditProfilePage;
