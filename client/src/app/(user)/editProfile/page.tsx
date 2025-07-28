"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/utils/toast";
import { useAuth } from "@/utils/authStore";
import { fetchCompleteUserData, updateUserProfile } from "@/lib/api";
import { CompleteUser, presetExpertise } from "@/utils/types";
import { Spinner } from "@/components/common/spinner";

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

  // Load user data
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

  // Handlers
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      if (["name", "email", "username"].includes(name)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      } else if (name === "bio") {
        setFormData((prev) => ({
          ...prev,
          authorProfile: { ...prev.authorProfile, bio: value },
        }));
      }
    },
    []
  );

  const handleSocialChange = useCallback(
    (key: keyof typeof formData.authorProfile.socialMedia) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          authorProfile: {
            ...prev.authorProfile,
            socialMedia: {
              ...prev.authorProfile.socialMedia,
              [key]: e.target.value,
            },
          },
        }));
      },
    [formData]
  );

  const handleTagToggle = useCallback((tag: string) => {
    setFormData((prev) => {
      const exists = prev.authorProfile.expertise.includes(tag);
      const updated = exists
        ? prev.authorProfile.expertise.filter((t) => t !== tag)
        : prev.authorProfile.expertise.length < 3
        ? [...prev.authorProfile.expertise, tag]
        : prev.authorProfile.expertise;

      return {
        ...prev,
        authorProfile: { ...prev.authorProfile, expertise: updated },
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

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Edit Profile</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Avatar */}
        <div className="flex items-center space-x-4">
          {avatar.preview && (
            <Image
              src={avatar.preview}
              alt="Avatar"
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>

        {/* Basic Info */}
        {(
          ["name", "email", "username"] as Array<
            keyof Pick<UpdateForm, "name" | "email" | "username">
          >
        ).map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize">
              {field}
            </label>
            <input
              name={field}
              type="text"
              value={formData[field]}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ))}

        {/* Author-only Fields */}
        {formData.isAuthor && (
          <>
            {/* Bio */}
            <div>
              <label className="block text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                rows={3}
                value={formData.authorProfile.bio}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Socials */}
            <div>
              <p className="text-sm font-medium">Social Links (Optional)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {["website", "github", "linkedin", "twitter"].map((key) => (
                  <input
                    key={key}
                    type="url"
                    placeholder={key}
                    value={
                      formData.authorProfile.socialMedia[
                        key as keyof typeof formData.authorProfile.socialMedia
                      ] ?? ""
                    }
                    onChange={handleSocialChange(
                      key as keyof typeof formData.authorProfile.socialMedia
                    )}
                    className="border p-2 rounded"
                  />
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <p className="text-sm font-medium">Expertise (max 3)</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {presetExpertise.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      formData.authorProfile.expertise.includes(tag)
                        ? "bg-black text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Submit */}
        <button
          className="w-full bg-primary text-white py-2 rounded"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
